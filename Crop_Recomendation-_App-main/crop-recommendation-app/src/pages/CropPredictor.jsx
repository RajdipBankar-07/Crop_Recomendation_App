
// import React, { useState, useEffect } from "react";
// import "./CropPrediction.css"; // ✅ same styling file reused

// function CropPredictor() {
//   const [form, setForm] = useState({
//     N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
//   });

//   const [iotData, setIotData] = useState({
//     N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
//   });

//   const [result, setResult] = useState(null);
//   const [iotResult, setIotResult] = useState(null);

//   // -----------------------------
//   // 🧮 Manual Prediction Handling
//   // -----------------------------
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await response.json();
//       setResult(data);
//     } catch (err) {
//       console.error("Manual prediction error:", err);
//     }
//   };

//   // -----------------------------
//   // 🌾 IoT Data Fetch Every 5 Sec
//   // -----------------------------
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/latest_iot");
//         if (!response.ok) return;
//         const data = await response.json();

//         setIotData({
//           N: data.N,
//           P: data.P,
//           K: data.K,
//           temperature: data.temperature,
//           humidity: data.humidity,
//           ph: data.ph,
//           rainfall: data.rainfall,
//         });

//         setIotResult({
//           crop: data.predicted_crop,
//           trueCrop: data.true_crop,
//           season: data.season,
//           crop_image: data.crop_image,
//         });
//       } catch (err) {
//         console.error("IoT fetch error:", err);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const fieldLabels = {
//     N: "Nitrogen (N)",
//     P: "Phosphorus (P)",
//     K: "Potassium (K)",
//     temperature: "Temperature (°C)",
//     humidity: "Humidity (%)",
//     ph: "Soil pH",
//     rainfall: "Rainfall (mm)",
//   };

//   // -----------------------------
//   // 🌿 UI
//   // -----------------------------
//   return (
//     <div className="prediction-container">
//       <h2 className="title">🌱 Crop Recommendation System</h2>
//       <p className="subtitle">
//         Powered by <b>Remora Optimization Algorithm (ROA)</b>
//       </p>

//       <div className="section-wrapper">
//         {/* Manual Prediction Card */}
//         <div className="form-card wide">
//           <h4>🧾 Manual Crop Prediction</h4>
//           <form onSubmit={handleSubmit} className="input-form">
//             <div className="input-grid three-cols">
//               {Object.keys(fieldLabels).map((key) => (
//                 <div key={key} className="input-group">
//                   <label className="input-label">{fieldLabels[key]}</label>
//                   <input
//                     name={key}
//                     placeholder={key.toUpperCase()}
//                     value={form[key]}
//                     onChange={handleChange}
//                     type="number"
//                     required
//                     className="input-field"
//                   />
//                 </div>
//               ))}
//             </div>
//             <button type="submit" className="predict-btn">Predict Crop</button>
//           </form>

//           {result && (
//             <div className="result-box">
//               <p className="iot-text">🌾 Predicted Crop: {result.crop}</p>
//               <p>Season: {result.season}</p>
//               <p>{result.message}</p>
//               <img
//                 src={`http://127.0.0.1:5000${result.crop_image}`}
//                 alt={result.crop}
//                 className="crop-image"
//               />
//             </div>
//           )}
//         </div>

//         {/* IoT Data Display Card */}
//         <div className="form-card wide">
//           <h4>🌐 IoT Sensor Data (Live from Python Simulator)</h4>
//           <div className="iot-inputs three-cols">
//             {Object.keys(fieldLabels).map((key) => (
//               <div key={key} className="input-group">
//                 <label className="input-label">{fieldLabels[key]}</label>
//                 <input
//                   name={key}
//                   value={iotData[key] ?? ""}
//                   readOnly
//                   className="input-field readonly"
//                 />
//               </div>
//             ))}
//           </div>

//           {iotResult && (
//             <div className="result-box">
//               <p className="iot-text">
//                 🌾 IoT Predicted Crop: {iotResult.crop}
//                 {iotResult.trueCrop && (
//                   <>
//                     {" | "}
//                     ✅ True Crop: {iotResult.trueCrop}
//                   </>
//                 )}
//               </p>
//               <p>Season: {iotResult.season}</p>
//               {iotResult.crop_image && (
//                 <img
//                   src={`http://127.0.0.1:5000${iotResult.crop_image}`}
//                   alt={iotResult.crop}
//                   className="crop-image"
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <footer className="footer">
//         Developed for research on <b>Crop Recommendation Optimization using Remora Algorithm</b> 🌾
//       </footer>
//     </div>
//   );
// }

// export default CropPredictor;





import React, { useState, useEffect } from "react";
import "./CropPrediction.css"; // ✅ same styling file reused

function CropPredictor() {
  const [form, setForm] = useState({
    N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
  });

  const [iotData, setIotData] = useState({
    N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
  });

  const [result, setResult] = useState(null);
  const [iotResult, setIotResult] = useState(null);

  // -----------------------------
  // 🧮 Manual Prediction Handling
  // -----------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Manual prediction error:", err);
    }
  };

  // -----------------------------
  // 🌾 IoT Data Fetch Every 5 Sec
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/latest_iot");
        if (!response.ok) return;
        const data = await response.json();

        setIotData({
          N: data.N,
          P: data.P,
          K: data.K,
          temperature: data.temperature,
          humidity: data.humidity,
          ph: data.ph,
          rainfall: data.rainfall,
        });

        setIotResult({
          crop: data.predicted_crop,
          trueCrop: data.true_crop,
          season: data.season,
          crop_image: data.crop_image,
        });
      } catch (err) {
        console.error("IoT fetch error:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fieldLabels = {
    N: "Nitrogen (N)",
    P: "Phosphorus (P)",
    K: "Potassium (K)",
    temperature: "Temperature (°C)",
    humidity: "Humidity (%)",
    ph: "Soil pH",
    rainfall: "Rainfall (mm)",
  };

  // -----------------------------
  // 🌿 UI
  // -----------------------------
  return (
    <div className="prediction-container">
      <h2 className="title">🌱 Crop Recommendation System</h2>
      <p className="subtitle">
        Powered by <b>Remora Optimization Algorithm (ROA)</b>
      </p>

      <div className="section-wrapper">
        {/* Manual Prediction Card */}
        <div className="form-card wide">
          <h4>🧾 Manual Crop Prediction</h4>
          <form onSubmit={handleSubmit} className="input-form">
            <div className="input-grid three-cols">
              {Object.keys(fieldLabels).map((key) => (
                <div key={key} className="input-group">
                  <label className="input-label">{fieldLabels[key]}</label>
                  <input
                    name={key}
                    placeholder={key.toUpperCase()}
                    value={form[key]}
                    onChange={handleChange}
                    type="number"
                    required
                    className="input-field"
                  />
                </div>
              ))}

              {/* ✅ Button inside grid, after last input */}
              <div className="input-group" style={{ gridColumn: "span 1" }}>
                <button type="submit" className="predict-btn">
                  Predict Crop
                </button>
              </div>
            </div>
          </form>

          {result && (
            <div className="result-box">
              <p className="iot-text">🌾 Predicted Crop: {result.crop}</p>
              <p>Season: {result.season}</p>
              <p>{result.message}</p>
              <img
                src={`http://127.0.0.1:5000${result.crop_image}`}
                alt={result.crop}
                className="crop-image"
              />
            </div>
          )}
        </div>

        {/* IoT Data Display Card */}
        <div className="form-card wide">
          <h4>🌐 IoT Sensor Data (Live from Python Simulator)</h4>
          <div className="iot-inputs three-cols">
            {Object.keys(fieldLabels).map((key) => (
              <div key={key} className="input-group">
                <label className="input-label">{fieldLabels[key]}</label>
                <input
                  name={key}
                  value={iotData[key] ?? ""}
                  readOnly
                  className="input-field readonly"
                />
              </div>
            ))}
          </div>

          {iotResult && (
            <div className="result-box">
              <p className="iot-text">
                🌾 IoT Predicted Crop: {iotResult.crop}
                {iotResult.trueCrop && (
                  <>
                    {" | "}✅ True Crop: {iotResult.trueCrop}
                  </>
                )}
              </p>
              <p>Season: {iotResult.season}</p>
              {iotResult.crop_image && (
                <img
                  src={`http://127.0.0.1:5000${iotResult.crop_image}`}
                  alt={iotResult.crop}
                  className="crop-image"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        Developed for research on <b>Crop Recommendation Optimization using Remora Algorithm</b> 🌾
      </footer>
    </div>
  );
}

export default CropPredictor;
