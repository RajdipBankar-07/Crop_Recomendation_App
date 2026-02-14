
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE
import joblib
import random

#  Load Dataset
print("📥 Loading dataset...")
data = pd.read_csv("Crop_recommendation.csv")
data['label'] = data['label'].str.strip().str.title()

print("\nClass distribution before balancing:")
print(data['label'].value_counts())


# Split Data BEFORE Balancing
X = data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = data['label']

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.3,
    stratify=y,
    random_state=42,
    shuffle=True
)


#  Apply SMOTE to Training Data
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

print("\n✅ Class distribution after SMOTE (training only):")
print(pd.Series(y_train_res).value_counts())


# Define Fitness Function for ROA
def fitness_function(params):
    n_estimators = int(params[0])
    max_depth = int(params[1])

    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth,
        min_samples_leaf=2,   
        random_state=42
    )

    cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)
    scores = cross_val_score(model, X_train_res, y_train_res, cv=cv, scoring='accuracy')
    return np.mean(scores)


#Remora Optimization Algorithm
def remora_optimization(fitness_func, population_size=10, iterations=10, param_bounds=[(50, 300), (5, 25)], patience=3):
    population = [
        [random.uniform(bounds[0], bounds[1]) for bounds in param_bounds]
        for _ in range(population_size)
    ]
    best_solution = None
    best_score = -float("inf")
    no_improve_count = 0

    print("\n🐟 Starting Remora Optimization...\n")
    for iteration in range(iterations):
        scores = [fitness_func(ind) for ind in population]
        max_score = max(scores)
        leader = population[scores.index(max_score)]

        if max_score > best_score:
            best_score = max_score
            best_solution = leader
            no_improve_count = 0
        else:
            no_improve_count += 1

        print(f"Iteration {iteration+1}/{iterations} | Best CV Accuracy: {best_score:.4f}")

        if no_improve_count >= patience:
            print(f"\n Early stopping triggered (no improvement in {patience} iterations).")
            break

        # Update population
        new_population = []
        for individual in population:
            new_individual = []
            for i, (low, high) in enumerate(param_bounds):
                new_value = individual[i] + random.uniform(-1, 1) * (leader[i] - individual[i])
                new_value = max(min(new_value, high), low)
                new_individual.append(new_value)
            new_population.append(new_individual)
        population = new_population

    print(f"\n🏁 Optimization finished at iteration {iteration+1}")
    print(f"🏆 Best CV Accuracy: {best_score*100:.2f}%")
    print(f"🔧 Best Parameters: n_estimators={int(best_solution[0])}, max_depth={int(best_solution[1])}\n")
    return best_solution, best_score


#  Run ROA Optimization
best_params, best_score = remora_optimization(
    fitness_function,
    population_size=12,
    iterations=7,
    param_bounds=[(50, 300), (5, 25)]  # safer max_depth
)

best_n_estimators = int(best_params[0])
best_max_depth = int(best_params[1])


#  Train Final Model
final_model = RandomForestClassifier(
    n_estimators=best_n_estimators,
    max_depth=best_max_depth,
    min_samples_leaf=2,
    random_state=42
)
final_model.fit(X_train_res, y_train_res)

# Evaluate on training and test sets
train_acc = accuracy_score(y_train_res, final_model.predict(X_train_res))
test_acc = accuracy_score(y_test, final_model.predict(X_test))

print("✅ Final Results:")
print(f"Training Accuracy: {train_acc*100:.2f}%")
print(f"Test Accuracy: {test_acc*100:.2f}%")

joblib.dump(final_model, "crop_model_roa_balanced_v2.pkl")
metrics = {
    'train_acc': train_acc,
    'test_acc': test_acc,
    'optimized_n_estimators': best_n_estimators,
    'optimized_max_depth': best_max_depth,
    'best_cv_accuracy': best_score
}
joblib.dump(metrics, "metrics_roa_v2.pkl")

print("\n💾 Optimized model and metrics saved successfully!")