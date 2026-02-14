// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const bcrypt = require('bcrypt');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // =======================
// // MySQL connection pool
// // =======================
// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'root123',
//   database: 'agriculture',
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// // =======================
// // Crop endpoints
// // =======================
// app.get('/api/seasons', async (req, res) => {
//   try {
//     const [seasons] = await db.query('SELECT * FROM seasons');
//     res.json(seasons);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.get('/api/crops', async (req, res) => {
//   try {
//     const { season } = req.query;
//     let crops;
//     if (season) {
//       [crops] = await db.query('SELECT * FROM crops WHERE season = ?', [season]);
//     } else {
//       [crops] = await db.query('SELECT * FROM crops');
//     }
//     res.json(crops);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.get('/api/crops/:id', async (req, res) => {
//   try {
//     const cropId = req.params.id;
//     const [rows] = await db.query('SELECT * FROM crops WHERE id = ?', [cropId]);
//     if (rows.length === 0) return res.status(404).json({ message: 'Crop not found' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // =======================
// // Registration Endpoint
// // =======================
// app.post('/api/register', async (req, res) => {
//   try {
//     const { fullname, email, password, address } = req.body;

//     if (!fullname || !email || !password || !address) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const emailRegex = /\S+@\S+\.\S+/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: 'Invalid email format' });
//     }

//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{6,}$/;
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         message:
//           'Password must be at least 6 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 symbol',
//       });
//     }

//     const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
//     if (existing.length > 0) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const sql = 'INSERT INTO users (fullname, email, password, address) VALUES (?, ?, ?, ?)';
//     await db.execute(sql, [fullname, email, hashedPassword, address]);

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error('Registration Error:', err);
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// });

// // =======================
// // Login Endpoint
// // =======================
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Both fields are required' });
//     }

//     const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
//     if (rows.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

//     const user = rows[0];
//     const match = await bcrypt.compare(password, user.password);

//     if (!match) return res.status(401).json({ message: 'Invalid email or password' });

//     res.json({
//       message: 'Login successful',
//       user: { id: user.id, fullname: user.fullname, email: user.email, address: user.address },
//     });
//   } catch (err) {
//     console.error('Login Error:', err);
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// });

// // =======================
// // Start server
// // =======================
// app.listen(5000, () => console.log('✅ Server running on port 5000'));












import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bcrypt from "bcrypt";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// MySQL connection pool
// =======================
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'agriculture',
  waitForConnections: true,
  connectionLimit: 10,
});

// =======================
// Crop endpoints
// =======================
app.get('/api/seasons', async (req, res) => {
  try {
    const [seasons] = await db.query('SELECT * FROM seasons');
    res.json(seasons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/crops', async (req, res) => {
  try {
    const { season } = req.query;
    let crops;
    if (season) {
      [crops] = await db.query('SELECT * FROM crops WHERE season = ?', [season]);
    } else {
      [crops] = await db.query('SELECT * FROM crops');
    }
    res.json(crops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/crops/:id', async (req, res) => {
  try {
    const cropId = req.params.id;
    const [rows] = await db.query('SELECT * FROM crops WHERE id = ?', [cropId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Crop not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// Registration Endpoint
// =======================
app.post('/api/register', async (req, res) => {
  try {
    const { fullname, email, password, address } = req.body;

    if (!fullname || !email || !password || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 6 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 symbol',
      });
    }

    const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (fullname, email, password, address) VALUES (?, ?, ?, ?)';
    await db.execute(sql, [fullname, email, hashedPassword, address]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// =======================
// Login Endpoint
// =======================
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Both fields are required' });
    }

    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      message: 'Login successful',
      user: { id: user.id, fullname: user.fullname, email: user.email, address: user.address },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});







function offlineReply(prompt) {
  const lower = String(prompt || "").toLowerCase();
  
  // Orchard irrigation optimization (specific before generic watering)
  if ((lower.includes("orchard") || lower.includes("orchards")) && (lower.includes("irrigation") || lower.includes("optimize") || lower.includes("optimization") || lower.includes("optimum"))) {
    return "Orchard Irrigation: Use drip with 2–4 emitters per tree (4–8 L/hr each), irrigate at the canopy dripline, mulch 5–8 cm to cut evaporation, schedule via soil moisture sensors or ET (allow 10–20% regulated deficit after fruit set), split into 2–3 short pulses to reduce runoff, and adjust by growth stage (flowering/fruit set highest demand). Maintain basins, weed-free strips, and check uniformity quarterly.";
  }

  // Water and irrigation
  if (lower.includes("water") || lower.includes("irrigation") || lower.includes("moisture")) {
    return "Watering Tips: Aim for consistent moisture; early mornings are best for watering. Water deeply but less frequently to encourage strong root growth. Check soil moisture 2-3 inches deep before watering.";
  }
  
  // Soil related
  if (lower.includes("soil") || lower.includes("dirt") || lower.includes("ground")) {
    return "Soil Advice: Use well-draining loam enriched with 3–5% organic matter. Test pH levels (6.0-7.0 for most crops). Add compost annually to improve soil structure and fertility.";
  }
  
  // Comprehensive soil and fertilizer information (check these first)
  if (lower.includes("sugarcane fertilizer") || lower.includes("sugarcane npk")) {
    return "Sugarcane Fertilizer: Use NPK in 10:5:5 ratio (120:60:60 kg/ha). Apply nitrogen in 3 splits, phosphorus at planting, and potassium in 2 splits. Add micronutrients like zinc and iron for better yield.";
  }
  
  if (lower.includes("maize npk") || lower.includes("maize fertilizer ratio")) {
    return "Maize NPK Ratio: 120:60:60 kg/ha of N:P:K is generally recommended. Apply nitrogen in 3 splits (sowing, 25 days, 45 days), phosphorus at sowing, and potassium in 2 splits for optimal growth and yield.";
  }
  
  if (lower.includes("improve soil fertility") || lower.includes("natural fertility")) {
    return "Natural Soil Fertility: Use compost, green manure, crop rotation, and biofertilizers. Add organic matter, practice conservation tillage, and use leguminous crops to fix nitrogen naturally.";
  }
  
  if (lower.includes("organic farming fertilizer") || lower.includes("organic fertilizers")) {
    return "Organic Fertilizers: Use compost, vermicompost, farmyard manure, green manure, and biofertilizers. Avoid chemical fertilizers and synthetic inputs. Focus on soil health and natural nutrient cycling.";
  }
  
  if (lower.includes("cotton soil type") || lower.includes("cotton soil requirements")) {
    return "Cotton Soil: Well-drained black and loamy soils are ideal for cotton. Soil should have good water-holding capacity and be free from waterlogging. pH should be 6.0-8.0 for optimal growth.";
  }
  
  if (lower.includes("fertilizer application") || lower.includes("when to fertilize")) {
    return "Fertilizer Application: Apply at sowing, vegetative stage (25-30 days), and flowering stage. Follow crop-specific recommendations and soil test results. Use split application for nitrogen and complete application for phosphorus.";
  }
  
  if (lower.includes("lime acidic soil") || lower.includes("soil ph lime")) {
    return "Lime for Acidic Soil: Yes, lime neutralizes acidic soil and improves fertility. Apply 2-4 tons/ha of agricultural lime based on soil test. Mix well with soil and apply 2-3 months before planting.";
  }
  
  if (lower.includes("micronutrients") || lower.includes("trace elements")) {
    return "Micronutrients: Zinc, iron, manganese, copper, boron, and molybdenum are essential. Apply based on soil test results. Use chelated forms for better absorption. Deficiency affects growth and yield significantly.";
  }
  
  if (lower.includes("nitrogen fertilizer") || lower.includes("high nitrogen")) {
    return "Nitrogen Fertilizers: Urea (46% N) and ammonium sulfate (21% N) are high in nitrogen. Apply based on crop requirements and soil test. Use split application to prevent losses and improve efficiency.";
  }
  
  if (lower.includes("compost replace fertilizer") || lower.includes("compost vs fertilizer")) {
    return "Compost vs Fertilizers: Compost improves soil structure and provides nutrients slowly. For high-yield crops, additional chemical fertilizers may be needed. Use compost as base and supplement with specific nutrients as needed.";
  }
  
  if (lower.includes("vermicompost") || lower.includes("worm compost")) {
    return "Vermicompost: Use organic waste, earthworms, proper moisture, and aeration in a bin. Mix kitchen scraps with dry leaves, maintain 60-70% moisture, and turn regularly. Ready in 2-3 months.";
  }
  
  if (lower.includes("potassium crops") || lower.includes("high potassium")) {
    return "High Potassium Crops: Banana, sugarcane, tomato, potato, and cotton require high potassium. Apply potassium sulfate or muriate of potash based on soil test. Potassium improves fruit quality and disease resistance.";
  }
  
  if (lower.includes("nutrient deficiency") || lower.includes("prevent deficiency")) {
    return "Prevent Nutrient Deficiency: Apply balanced fertilizers based on soil test, use organic matter, practice crop rotation, and monitor plant health. Early detection and correction prevent yield losses.";
  }
  
  if (lower.includes("biofertilizers") || lower.includes("biological fertilizers")) {
    return "Biofertilizers: Improve soil health and nutrient availability but may not fully replace chemical fertilizers for high yield. Use Rhizobium for legumes, Azotobacter for cereals, and phosphate-solubilizing bacteria.";
  }
  
  if (lower.includes("clay soil") || lower.includes("water retention")) {
    return "Clay Soil: Holds water effectively but may cause drainage problems. Improve with organic matter, sand, and proper tillage. Use raised beds and avoid over-watering to prevent waterlogging.";
  }
  
  if (lower.includes("green manure") || lower.includes("cover crops")) {
    return "Green Manure: Crops grown to enrich soil fertility by plowing back into soil. Examples: Dhaincha, Sunhemp, and legumes. Improves soil structure, adds organic matter, and fixes nitrogen naturally.";
  }
  
  if (lower.includes("phosphorus fertilizer") || lower.includes("high phosphorus")) {
    return "Phosphorus Fertilizers: Single super phosphate (SSP) contains 16% P2O5, DAP has 46% P2O5. Apply at planting as phosphorus is immobile in soil. Use based on soil test and crop requirements.";
  }
  
  if (lower.includes("sandy soil") || lower.includes("improve sandy soil")) {
    return "Sandy Soil Improvement: Add organic matter, compost, and mulching to retain nutrients and water. Use drip irrigation, grow cover crops, and apply fertilizers in small frequent doses for better efficiency.";
  }
  
  if (lower.includes("fertigation") || lower.includes("fertilizer irrigation")) {
    return "Fertigation: Yes, apply fertilizers through irrigation water. Use water-soluble fertilizers, maintain proper pH, and follow recommended dosages. More efficient than soil application and reduces labor costs.";
  }
  
  if (lower.includes("over fertilization") || lower.includes("fertilizer burn")) {
    return "Over-Fertilization Effects: Can burn plants, reduce yield, and contaminate soil and water. Symptoms include leaf burn, stunted growth, and nutrient imbalance. Use soil test and follow recommended rates.";
  }
  
  if (lower.includes("high nitrogen crops") || lower.includes("nitrogen requirement")) {
    return "High Nitrogen Crops: Wheat, maize, rice, and leafy vegetables need high nitrogen. Apply 120-150 kg N/ha for cereals and 80-120 kg N/ha for vegetables. Use split application for better efficiency.";
  }
  
  if (lower.includes("manure soil structure") || lower.includes("organic matter")) {
    return "Manure Benefits: Enhances soil aeration, water retention, and microbial activity. Improves soil structure, increases nutrient availability, and promotes root development. Apply 10-15 tons/ha annually.";
  }
  
  if (lower.includes("crop residue") || lower.includes("residue management")) {
    return "Crop Residue Management: Return leftover plant parts to soil to improve fertility. Use mulching, composting, or incorporation. Reduces need for fertilizers and improves soil health and structure.";
  }
  
  if (lower.includes("fruit crop fertilizer") || lower.includes("fruit npk")) {
    return "Fruit Crop Fertilizers: Use balanced NPK with micronutrients like magnesium and boron. Apply 100:50:100 kg/ha NPK for most fruits. Add organic matter and use split application during growth stages.";
  }
  
  if (lower.includes("soil erosion") || lower.includes("prevent erosion")) {
    return "Prevent Soil Erosion: Use cover crops, contour farming, mulching, and terraces. Plant windbreaks, practice conservation tillage, and maintain soil cover. Reduces nutrient loss and improves soil health.";
  }
  
  if (lower.includes("fertilizer water quality") || lower.includes("water pollution")) {
    return "Fertilizer Water Impact: Excess use can leach into water bodies, causing pollution and eutrophication. Use proper application rates, avoid over-fertilization, and maintain buffer zones around water sources.";
  }
  
  // General fertilizer and nutrients (check after specific ones)
  if (lower.includes("fertilizer") || lower.includes("nutrient") || lower.includes("npk") || lower.includes("feed")) {
    return "Fertilizer Guide: Apply balanced NPK (e.g., 10-10-10) according to crop stage and soil test. Use organic options like compost, manure, or fish emulsion. Avoid over-fertilizing which can burn plants.";
  }
  
  // Specific disease management (check these first)
  if (lower.includes("banana disease") || lower.includes("banana pest") || lower.includes("banana diseases") || lower.includes("names of banana") || lower.includes("banana disease names") || lower.includes("banana diseases names")) {
    return "Banana Disease Names: 1) Panama Disease (Fusarium Wilt) - yellowing leaves, wilting, plant death. 2) Black Sigatoka - dark spots on leaves, leaf death. 3) Banana Bunchy Top - stunted growth, bunchy appearance. 4) Anthracnose - dark spots on fruit. 5) Moko Disease - bacterial wilt, yellowing leaves. 6) Banana Streak Virus - yellow streaks on leaves. 7) Rhizome Rot - rotting of underground stem.";
  }
  
  if (lower.includes("grape disease") || lower.includes("grape pest") || lower.includes("grape diseases") || lower.includes("names of grape") || lower.includes("grape disease names") || lower.includes("grape diseases names")) {
    return "Grape Disease Names: 1) Powdery Mildew - white powder coating on leaves and fruit. 2) Downy Mildew - yellow spots on top, white fuzz underneath leaves. 3) Black Rot - dark spots on fruit that spread. 4) Botrytis (Gray Mold) - gray fuzzy mold on fruit. 5) Anthracnose - dark spots on leaves and stems. 6) Phomopsis - brown spots on leaves and canes. 7) Crown Gall - tumor-like growths on roots and trunk.";
  }
  
  if (lower.includes("tomato disease") || lower.includes("tomato pest")) {
    return "Tomato Diseases: Early Blight (dark spots with rings) - remove infected leaves, apply fungicides. Late Blight (water-soaked spots) - improve drainage, apply copper fungicides. Blossom End Rot (black bottom) - maintain consistent soil moisture, add calcium. Fusarium Wilt (yellowing, wilting) - use resistant varieties, rotate crops.";
  }
  
  if (lower.includes("plant disease") || lower.includes("crop disease") || lower.includes("disease control")) {
    return "Disease Prevention: Choose disease-resistant varieties, practice crop rotation, maintain proper spacing for air circulation, avoid overhead watering, remove infected plant material, use clean tools, and apply appropriate fungicides when needed. Early detection and treatment are key to successful disease management.";
  }
  
  if (lower.includes("disease names") || lower.includes("names of disease") || lower.includes("common diseases")) {
    return "Common Plant Diseases: Fungal - Powdery Mildew, Downy Mildew, Black Rot, Anthracnose, Rust, Blight. Bacterial - Bacterial Wilt, Crown Gall, Fire Blight. Viral - Mosaic Virus, Streak Virus, Bunchy Top. Nematode - Root Knot, Cyst Nematodes. Each crop has specific diseases - ask about your particular crop for detailed information.";
  }
  
  // Agricultural techniques and methods
  if (lower.includes("crop rotation") || lower.includes("rotation")) {
    return "Crop Rotation: Practice rotating crops in different families each year to prevent disease buildup and improve soil health. Example: Legumes (beans, peas) → Leafy greens → Root crops → Fruiting crops. This helps break pest and disease cycles while maintaining soil fertility.";
  }
  
  if (lower.includes("mulch") || lower.includes("mulching")) {
    return "Mulching: Apply organic mulch (straw, leaves, compost) around plants to retain moisture, suppress weeds, and regulate soil temperature. Use 2-4 inches of mulch, keeping it away from plant stems. Mulch also improves soil structure as it decomposes.";
  }
  
  if (lower.includes("compost") || lower.includes("composting")) {
    return "Composting: Create nutrient-rich compost by mixing green materials (kitchen scraps, grass clippings) with brown materials (leaves, straw) in a 1:3 ratio. Turn regularly, keep moist, and use when dark and crumbly. Compost improves soil structure and provides nutrients.";
  }
  
  if (lower.includes("pruning") || lower.includes("prune")) {
    return "Pruning: Remove dead, diseased, or damaged branches to improve plant health and productivity. Prune fruit trees in late winter, remove suckers from tomatoes, and deadhead flowers to encourage continued blooming. Use clean, sharp tools and make cuts at 45-degree angles.";
  }
  
  if (lower.includes("harvest") || lower.includes("harvesting") || lower.includes("when to harvest")) {
    return "Harvesting: Pick vegetables at peak ripeness for best flavor and nutrition. Harvest in early morning when plants are hydrated. Use sharp tools to avoid damage. Store properly - cool, dry conditions for most crops. Some crops like tomatoes continue ripening after picking.";
  }
  
  if (lower.includes("storage") || lower.includes("storing")) {
    return "Storage: Store crops in cool, dry, well-ventilated conditions. Root vegetables keep best in cool, humid conditions. Fruits need good air circulation. Check regularly for spoilage. Some crops like potatoes need darkness to prevent greening.";
  }
  
  // Indian farming seasons and crops
  if (lower.includes("rabi") || lower.includes("rabi season") || lower.includes("rabi crops")) {
    return "Rabi Season Crops (Oct-Mar): Wheat, barley, mustard, peas, chickpeas, gram, linseed, safflower. These are winter crops sown in October-November and harvested in March-April. They require cool weather and moderate rainfall.";
  }
  
  if (lower.includes("kharif") || lower.includes("kharif season") || lower.includes("kharif crops")) {
    return "Kharif Season Crops (Jun-Oct): Rice, maize, cotton, sugarcane, jowar, bajra, groundnut, soybean, pigeon pea. These are monsoon crops sown in June-July and harvested in September-October. They require warm weather and good rainfall.";
  }
  
  if (lower.includes("zaid") || lower.includes("zaid season") || lower.includes("zaid crops")) {
    return "Zaid Season Crops (Mar-Jun): Cucumber, watermelon, muskmelon, bitter gourd, bottle gourd, okra, tomato, chilli. These are summer crops grown between March and June. They require irrigation and warm weather.";
  }
  
  // Indian crop varieties
  if (lower.includes("wheat varieties") || lower.includes("high yield wheat")) {
    return "High-Yield Wheat Varieties: HD 2967, PBW 343, Kalyan Sona, HD 3086, DBW 17, HD 2851. These varieties are suitable for different regions and provide good yield with proper management. Choose based on your local climate and soil conditions.";
  }
  
  if (lower.includes("rice varieties") || lower.includes("paddy varieties")) {
    return "High-Yield Rice Varieties: IR 64, Swarna, Samba Mahsuri, BPT 5204, Pusa Basmati, HMT. These varieties are suitable for different seasons and regions. Choose based on your local conditions and market demand.";
  }
  
  // Soil and pH testing
  if (lower.includes("soil ph") || lower.includes("ph testing") || lower.includes("soil testing")) {
    return "Soil pH Testing: Use a soil testing kit or mix soil with water and test with pH strips. Most crops prefer pH 6.0-7.5. Add lime to increase pH or sulfur to decrease pH. Test soil every 2-3 years for best results.";
  }
  
  if (lower.includes("paddy soil") || lower.includes("rice soil")) {
    return "Paddy Soil Requirements: Clayey loam or silty clay soil with good water retention is best for paddy. Soil should have good drainage and be able to hold water for 2-3 months. pH should be 5.5-7.0 for optimal growth.";
  }
  
  // Irrigation methods
  if (lower.includes("drip irrigation") || lower.includes("drip system")) {
    return "Drip Irrigation: Saves 30-50% water compared to flood irrigation. Provides uniform soil moisture, reduces weed growth, and improves crop yield. Ideal for vegetables, fruits, and row crops. Install filters and pressure regulators for best results.";
  }
  
  if (lower.includes("wheat irrigation") || lower.includes("wheat watering")) {
    return "Wheat Irrigation Schedule: 1) Crown root initiation (21-25 days after sowing), 2) Tillering (45-50 days), 3) Flowering (70-75 days), 4) Grain filling (90-95 days). Total 3-4 irrigations depending on rainfall and soil type.";
  }
  
  // Government schemes
  if (lower.includes("government scheme") || lower.includes("agricultural scheme") || lower.includes("subsidy")) {
    return "Government Agricultural Schemes: 1) PM-KISAN - Direct income support to farmers, 2) Kisan Credit Card (KCC) - Credit for farming needs, 3) Paramparagat Krishi Vikas Yojana (PKVY) - Organic farming support, 4) PM Fasal Bima Yojana - Crop insurance, 5) Soil Health Card Scheme - Soil testing and recommendations.";
  }
  
  if (lower.includes("organic farming") || lower.includes("organic scheme")) {
    return "Organic Farming Schemes: Paramparagat Krishi Vikas Yojana (PKVY) provides Rs. 50,000 per hectare for 3 years. National Mission for Sustainable Agriculture (NMSA) supports organic farming. Contact your local agriculture department for application details.";
  }
  
  if (lower.includes("farm loan") || lower.includes("agricultural loan") || lower.includes("kisan credit card")) {
    return "Agricultural Loans: Kisan Credit Card (KCC) provides credit up to Rs. 3 lakh at 4% interest. Visit your local agricultural bank or cooperative society. Required documents: Land records, Aadhaar card, bank account, and crop details.";
  }
  
  // Specific pest and disease control
  if (lower.includes("aphid control") || lower.includes("aphids")) {
    return "Aphid Control: Use neem oil spray (2-3ml per liter), introduce ladybugs, or use soap water spray. For severe infestation, use imidacloprid or thiamethoxam. Remove affected plant parts and maintain good air circulation.";
  }
  
  if (lower.includes("cotton pest") || lower.includes("bollworm")) {
    return "Cotton Pests: Bollworms and aphids are common. Use pheromone traps for bollworms, spray neem oil for aphids. Apply Bt cotton varieties for natural resistance. Use integrated pest management with biological and chemical control.";
  }
  
  if (lower.includes("tomato blight") || lower.includes("yellow spots tomato")) {
    return "Tomato Blight: Yellow spots may be early blight. Remove affected leaves, improve air circulation, avoid overhead watering. Apply copper fungicides or mancozeb. Use resistant varieties and practice crop rotation.";
  }
  
  // Water conservation
  if (lower.includes("water conservation") || lower.includes("save water")) {
    return "Water Conservation: Use drip irrigation, mulching, rainwater harvesting, and crop rotation. Choose drought-resistant crops like millets, sorghum, chickpeas. Implement precision irrigation and soil moisture monitoring.";
  }
  
  if (lower.includes("drought resistant") || lower.includes("drought crops")) {
    return "Drought-Resistant Crops: Millets (jowar, bajra), sorghum, chickpeas, groundnuts, pearl millet, finger millet. These crops require less water and can survive dry conditions. Use mulching and drip irrigation for better results.";
  }
  
  // Harvesting and post-harvest
  if (lower.includes("maize harvest") || lower.includes("corn harvest")) {
    return "Maize Harvesting: Harvest when kernels are hard and moisture content is 20-25%. Check by pressing thumbnail into kernel - should not dent. Harvest in early morning for better quality. Store in cool, dry conditions.";
  }
  
  if (lower.includes("potato storage") || lower.includes("prevent sprouting")) {
    return "Potato Storage: Store in cool (7-10°C), dark, well-ventilated place. Avoid exposure to light to prevent greening. Use proper ventilation and check regularly for spoilage. Remove damaged potatoes immediately.";
  }
  
  if (lower.includes("post harvest loss") || lower.includes("fruit storage")) {
    return "Post-Harvest Loss Prevention: Use proper packaging, cold storage, and timely transportation. Handle fruits gently, maintain proper temperature and humidity. Use appropriate storage containers and avoid bruising.";
  }
  
  // Weather and climate
  if (lower.includes("excess rainfall") || lower.includes("waterlogging")) {
    return "Excess Rainfall Effects: Can cause waterlogging, root rot, and reduce yield. Ensure proper drainage, use raised beds, and avoid water stagnation. Plant flood-resistant varieties and improve soil drainage.";
  }
  
  if (lower.includes("monsoon planting") || lower.includes("rice planting")) {
    return "Rice Planting Time: Usually sown at start of monsoon (June-July) for Kharif season. Prepare nursery 25-30 days before transplanting. Ensure proper water management and use certified seeds for better yield.";
  }
  
  // Crop maturity and growth periods
  if (lower.includes("tomato maturity") || lower.includes("tomato days") || lower.includes("tomato harvest time")) {
    return "Tomato Maturity: Typically 60-80 days from transplanting to harvest. Early varieties mature in 60-65 days, while late varieties take 75-80 days. Harvest when fruits are firm and fully colored.";
  }
  
  if (lower.includes("maize maturity") || lower.includes("corn days") || lower.includes("maize harvest time")) {
    return "Maize Maturity: About 90-120 days depending on variety and climate. Early varieties mature in 90-100 days, while late varieties take 110-120 days. Harvest when kernels are hard and moisture content is 20-25%.";
  }
  
  // Plant spacing requirements
  if (lower.includes("maize spacing") || lower.includes("corn spacing") || lower.includes("maize distance")) {
    return "Maize Spacing: 20-25 cm between plants and 60-75 cm between rows. This ensures proper air circulation, reduces disease, and allows for good yield. Adjust spacing based on variety and soil fertility.";
  }
  
  if (lower.includes("tomato spacing") || lower.includes("tomato distance")) {
    return "Tomato Spacing: 45-60 cm between plants and 90-120 cm between rows. Indeterminate varieties need more space than determinate ones. Proper spacing improves air circulation and reduces disease.";
  }
  
  // Dryland and drought farming
  if (lower.includes("dryland farming") || lower.includes("drought farming") || lower.includes("dry farming")) {
    return "Dryland Farming: Select drought-tolerant crops like millets (jowar, bajra), sorghum, chickpeas, groundnuts, and pulses. Use mulching, rainwater harvesting, and drought-resistant varieties. Practice conservation tillage.";
  }
  
  if (lower.includes("rice dry regions") || lower.includes("rice without water")) {
    return "Rice in Dry Regions: Rice requires high water (1000-1500mm). In dry regions, consider alternatives like millets, sorghum, or drought-resistant rice varieties. Use drip irrigation if water is available.";
  }
  
  // Container and small space farming
  if (lower.includes("vegetables in pots") || lower.includes("container gardening") || lower.includes("pot vegetables")) {
    return "Container Vegetables: Tomatoes, chillies, spinach, lettuce, herbs, and small varieties of eggplant grow well in pots. Use 15-20 liter pots, well-draining soil, and provide adequate sunlight and water.";
  }
  
  if (lower.includes("kitchen garden") || lower.includes("small garden") || lower.includes("home garden")) {
    return "Kitchen Garden Crops: Tomatoes, spinach, chillies, herbs (basil, coriander, mint), lettuce, and small varieties of vegetables. Choose compact varieties and use vertical growing techniques to maximize space.";
  }
  
  // Crop rotation strategies
  if (lower.includes("crop rotation strategy") || lower.includes("rotation plan")) {
    return "Crop Rotation Strategy: Rotate cereals with legumes to maintain soil fertility. Example: Rice → Wheat → Legumes → Oilseeds. This breaks pest cycles, improves soil health, and maintains nutrient balance.";
  }
  
  if (lower.includes("pulses cereals together") || lower.includes("intercropping")) {
    return "Intercropping: Yes, intercropping pulses with cereals improves soil nitrogen. Examples: Maize + Cowpea, Wheat + Chickpea, Rice + Pigeon pea. This increases yield and soil fertility while reducing pest pressure.";
  }
  
  // High-altitude and special conditions
  if (lower.includes("high altitude") || lower.includes("mountain farming")) {
    return "High-Altitude Crops: Potatoes, barley, peas, oats, and cool-season vegetables grow well in high-altitude regions. These crops tolerate cold temperatures and short growing seasons.";
  }
  
  if (lower.includes("saline soil") || lower.includes("salt soil")) {
    return "Saline Soil Crops: Wheat can tolerate mild salinity but not high-saline soils. For saline areas, grow salt-tolerant crops like barley, sorghum, or use soil amendments like gypsum to reduce salinity.";
  }
  
  // Oilseeds and high-value crops
  if (lower.includes("oilseeds") || lower.includes("oil crops")) {
    return "Indian Oilseeds: Groundnut, sunflower, mustard, soybean, sesame, and castor are common oilseeds. These provide good returns and are suitable for different regions and seasons.";
  }
  
  if (lower.includes("high value crops") || lower.includes("profitable crops")) {
    return "High-Value Crops: Herbs, medicinal plants, exotic vegetables, and specialty crops give high returns. Examples: Basil, mint, turmeric, ginger, and organic vegetables. These require less land but more care.";
  }
  
  // Greenhouse and controlled environment
  if (lower.includes("greenhouse") || lower.includes("protected cultivation")) {
    return "Greenhouse Crops: Cucumbers, tomatoes, lettuce, capsicum, and herbs grow well in greenhouses. Controlled environment allows year-round production and higher yields with proper temperature and humidity management.";
  }
  
  // Soil improvement and fertility
  if (lower.includes("soil fertility crops") || lower.includes("nitrogen fixing")) {
    return "Soil Fertility Crops: Legumes like peas, lentils, beans, and clover enrich soil with nitrogen. These crops fix atmospheric nitrogen and improve soil structure when used in rotation or as green manure.";
  }
  
  if (lower.includes("wetland crops") || lower.includes("waterlogged soil")) {
    return "Wetland Crops: Rice is ideal for wetland areas. Other options include water chestnut, lotus, and water spinach. These crops thrive in waterlogged conditions and can utilize excess water effectively.";
  }
  
  // Soil pH and acidity
  if (lower.includes("acidic soil crops") || lower.includes("acid soil")) {
    return "Acidic Soil Crops: Tea, coffee, potato, and blueberries prefer slightly acidic soil (pH 5.5-6.5). For other crops, add lime to raise pH or use acid-tolerant varieties.";
  }
  
  if (lower.includes("cotton soil") || lower.includes("cotton ph")) {
    return "Cotton Soil Requirements: Cotton prefers neutral to slightly alkaline soil (pH 6.0-8.0). Well-drained black and loamy soils are ideal. Avoid acidic soils and ensure good drainage for optimal growth.";
  }
  
  // Organic farming
  if (lower.includes("organic farming crops") || lower.includes("organic suitable")) {
    return "Organic Farming Crops: Vegetables, fruits, pulses, millets, and herbs are suitable for organic farming. These crops respond well to organic inputs and have good market demand for organic produce.";
  }
  
  // Drought-resistant cereals
  if (lower.includes("drought resistant cereals") || lower.includes("drought cereals")) {
    return "Drought-Resistant Cereals: Millets (jowar, bajra, ragi) and sorghum are highly drought-tolerant cereals. These crops require minimal water and can survive in harsh conditions with proper management.";
  }
  
  
  // General pests and diseases (check after specific ones)
  if (lower.includes("pest") || lower.includes("disease") || lower.includes("bug") || lower.includes("insect")) {
    return "Pest Management: Monitor weekly; use integrated pest management and rotate actives. Encourage beneficial insects, use row covers, and practice crop rotation. Identify problems early for best control.";
  }
  
  // Specific crops
  if (lower.includes("tomato")) {
    return "Tomato Care: Tomatoes prefer 18–27°C, full sun, deep but infrequent watering, and staking. Plant after last frost, space 24-36 inches apart. Prune suckers and provide support for best yields.";
  }
  
  if (lower.includes("lettuce") || lower.includes("spinach") || lower.includes("greens")) {
    return "Leafy Greens: Plant in cool weather (spring/fall), provide partial shade in hot climates. Keep soil consistently moist, harvest outer leaves first. Succession plant every 2-3 weeks for continuous harvest.";
  }
  
  if (lower.includes("carrot") || lower.includes("radish") || lower.includes("beet")) {
    return "Root Vegetables: Plant in loose, well-drained soil free of rocks. Thin seedlings to proper spacing. Keep soil consistently moist for even growth. Harvest when roots reach desired size.";
  }
  
  if (lower.includes("pepper") || lower.includes("chili")) {
    return "Pepper Growing: Start indoors 8-10 weeks before last frost. Transplant after soil warms to 65°F. Provide full sun, consistent moisture, and support for larger varieties. Harvest when firm and fully colored.";
  }
  
  if (lower.includes("cucumber") || lower.includes("squash") || lower.includes("zucchini")) {
    return "Vine Crops: Plant in warm soil after frost danger. Provide trellis or space for vines to spread. Water at soil level to prevent disease. Harvest regularly to encourage continued production.";
  }
  
  if (lower.includes("banana")) {
    return "Banana Growing: Plant in warm climates (USDA zones 9-11), full sun, well-draining soil. Keep soil consistently moist but not waterlogged. Provide wind protection and space 8-10 feet apart. Harvest when fingers are plump and rounded.";
  }
  
  if (lower.includes("apple") || lower.includes("pear") || lower.includes("cherry")) {
    return "Tree Fruits: Plant in well-draining soil with full sun. Prune annually for shape and fruit production. Most need cross-pollination. Space trees 15-20 feet apart. Harvest when fruit is firm and fully colored.";
  }
  
  if (lower.includes("citrus") || lower.includes("orange") || lower.includes("lemon") || lower.includes("lime")) {
    return "Citrus Trees: Grow in warm climates (USDA zones 9-11), full sun, well-draining soil. Water deeply but infrequently. Protect from frost. Fertilize 3 times per year. Harvest when fruit is fully colored and sweet.";
  }
  
  if (lower.includes("berry") || lower.includes("strawberry") || lower.includes("blueberry") || lower.includes("raspberry")) {
    return "Berry Growing: Plant in acidic soil (pH 4.5-5.5 for blueberries), full sun to partial shade. Keep soil consistently moist. Mulch to retain moisture and suppress weeds. Harvest when berries are fully ripe and sweet.";
  }
  
  if (lower.includes("grape") || lower.includes("vine")) {
    return "Grape Growing: Plant in well-draining soil with full sun, space 6-8 feet apart. Provide trellis support, prune annually in late winter. Water deeply but infrequently. Harvest when grapes are fully colored and sweet. Protect from birds with netting.";
  }
  
  if (lower.includes("sugarcane") || lower.includes("sugar cane")) {
    return "Sugarcane Growing: Plant in warm climates (USDA zones 9-11), full sun, well-draining soil. Space plants 3-4 feet apart. Keep soil consistently moist. Harvest when stalks are mature (12-18 months). Cut at ground level and remove leaves.";
  }
  
  if (lower.includes("corn") || lower.includes("maize")) {
    return "Corn Growing: Plant in warm soil after frost danger, full sun, well-draining soil. Space 8-12 inches apart in rows 30 inches apart. Keep soil consistently moist. Harvest when kernels are plump and milky.";
  }
  
  if (lower.includes("wheat") || lower.includes("rice") || lower.includes("barley") || lower.includes("oats")) {
    return "Grain Crops: Plant in well-draining soil with full sun. Follow specific planting times for your region. Keep soil consistently moist during growth. Harvest when grains are mature and dry. Store in cool, dry conditions.";
  }
  
  if (lower.includes("potato") || lower.includes("sweet potato")) {
    return "Potato Growing: Plant in loose, well-draining soil with full sun. Space 12 inches apart. Keep soil consistently moist but not waterlogged. Harvest when foliage dies back. Store in cool, dark, dry place.";
  }
  
  // Additional crops
  if (lower.includes("onion") || lower.includes("garlic")) {
    return "Onion/Garlic Growing: Plant in well-draining soil with full sun. Space 4-6 inches apart. Keep soil consistently moist. Harvest when tops fall over and dry. Store in cool, dry, well-ventilated place.";
  }
  
  if (lower.includes("cabbage") || lower.includes("broccoli") || lower.includes("cauliflower")) {
    return "Brassica Crops: Plant in cool weather, well-draining soil with full sun. Space 18-24 inches apart. Keep soil consistently moist. Harvest when heads are firm and tight. Use row covers to protect from pests.";
  }
  
  if (lower.includes("bean") || lower.includes("pea")) {
    return "Legume Growing: Plant in well-draining soil with full sun. Space 2-4 inches apart. Keep soil consistently moist. Provide support for climbing varieties. Harvest regularly to encourage continued production.";
  }
  
  if (lower.includes("herb") || lower.includes("basil") || lower.includes("parsley") || lower.includes("cilantro")) {
    return "Herb Growing: Plant in well-draining soil with full sun to partial shade. Space 6-12 inches apart. Keep soil consistently moist. Harvest regularly to encourage growth. Use fresh or dry for storage.";
  }
  
  // Seasonal crop guidance
  if (lower.includes("winter") || lower.includes("cold season") || lower.includes("winter crop")) {
    return "Winter Crops: Plant cold-hardy vegetables like kale, spinach, lettuce, carrots, radishes, broccoli, cauliflower, Brussels sprouts, and winter squash. These crops can tolerate frost and grow well in cool temperatures. Use row covers for extra protection.";
  }
  
  if (lower.includes("spring") || lower.includes("spring crop")) {
    return "Spring Crops: Plant cool-season vegetables like peas, lettuce, spinach, radishes, carrots, beets, and early potatoes. These crops prefer cooler temperatures and can be planted as soon as soil can be worked. Start seeds indoors for warm-season crops.";
  }
  
  if (lower.includes("summer") || lower.includes("summer crop")) {
    return "Summer Crops: Plant warm-season vegetables like tomatoes, peppers, cucumbers, squash, beans, corn, and melons. These crops need warm soil and air temperatures. Plant after last frost date and provide consistent moisture.";
  }
  
  if (lower.includes("fall") || lower.includes("autumn") || lower.includes("fall crop")) {
    return "Fall Crops: Plant cool-season vegetables like lettuce, spinach, kale, radishes, turnips, and winter squash. These crops mature in cooler weather and can often survive light frosts. Plant 6-8 weeks before first frost.";
  }
  
  if (lower.includes("season") || lower.includes("seasonal") || lower.includes("when to plant")) {
    return "Seasonal Planting Guide: Winter (Dec-Feb): Kale, spinach, lettuce, carrots. Spring (Mar-May): Peas, lettuce, radishes, early potatoes. Summer (Jun-Aug): Tomatoes, peppers, cucumbers, corn. Fall (Sep-Nov): Lettuce, spinach, kale, winter squash. Check your local frost dates for best planting times.";
  }
  
  // Planting and timing
  if (lower.includes("plant") || lower.includes("seed") || lower.includes("grow") || lower.includes("sow")) {
    return "Planting Tips: Check your local frost dates and plant accordingly. Start seeds indoors for warm-season crops. Harden off seedlings before transplanting. Follow seed packet instructions for depth and spacing.";
  }
  
  // Harvesting
  if (lower.includes("harvest") || lower.includes("pick") || lower.includes("collect")) {
    return "Harvesting Guide: Pick vegetables at peak ripeness for best flavor and nutrition. Harvest in early morning when plants are hydrated. Use sharp tools to avoid damage. Store properly to maintain freshness.";
  }
  
  // General gardening
  if (lower.includes("garden") || lower.includes("crop") || lower.includes("vegetable") || lower.includes("plant")) {
    return "General Gardening: Choose the right plants for your climate and season. Practice crop rotation to prevent disease. Use mulch to retain moisture and suppress weeds. Keep a garden journal to track what works best.";
  }
  
  return "I'm your comprehensive Indian farm assistant! I can help with Rabi/Kharif/Zaid seasons, crop varieties, soil testing, irrigation, government schemes, pest control, disease management, harvesting, storage, and specific crops (wheat, rice, cotton, sugarcane, maize, vegetables, fruits). I also provide information about PM-KISAN, KCC loans, organic farming schemes, and regional farming practices. What would you like to know?";
}

// --- API Routes ---

// Block GET on /api/chat
app.all("/api/chat", (req, res, next) => {
  if (req.method === "GET") {
    return res.status(405).json({ error: { message: "Use POST /api/chat", allow: "POST" } });
  }
  next();
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body ?? {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: { message: "messages array required" } });
    }

    let assistantMessage;
    try {
      // Call OpenAI API with a strong system prompt so online answers match the farm domain
      const systemPrompt = "You are a concise, practical Indian farm assistant. Answer ANY agriculture question accurately with action-oriented steps. Prioritize India context (Rabi/Kharif/Zaid, schemes), IPM, water-saving, precise NPK/spacing, and crop- & stage-specific guidance. If asked about irrigation in orchards, include drip layout (emitters per tree, L/hr), mulch depth, ET/sensor scheduling, regulated deficit after fruit set, pulsed irrigation, and maintenance checks.";
      const messagesWithSystem = [
        { role: "system", content: systemPrompt },
        ...messages
      ];
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messagesWithSystem
      });
      assistantMessage = completion.choices?.[0]?.message ?? { role: "assistant", content: "Sorry, no response." };
    } catch (err) {
      // If OpenAI fails, use offline fallback
      const lastMessage = messages[messages.length - 1]?.content || "";
      assistantMessage = { role: "assistant", content: offlineReply(lastMessage) };
    }

    res.json(assistantMessage);
  } catch (err) {
    console.error("/api/chat error:", err);
    res.status(500).json({ error: { message: err.message || "Server error" } });
  }
});

// Health checks
app.get("/api/health", (req, res) => {
  const hasKey = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-"));
  res.json({ ok: true, openaiKeyLoaded: hasKey });
});

app.get("/api/health/openai", async (req, res) => {
  try {
    const models = await openai.models.list();
    const first = models?.data?.[0]?.id || null;
    res.json({ ok: true, sampleModel: first, count: Array.isArray(models?.data) ? models.data.length : undefined });
  } catch (err) {
    const upstream = err?.response?.data || undefined;
    const message = upstream?.error?.message || err?.message || "Upstream error";
    const code = upstream?.error?.code || err?.code;
    const type = upstream?.error?.type;
    res.status(500).json({ ok: false, error: { message, code, type }, upstream });
  }
});

// Serve React build
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "public")));
// app.get(/^(?!\/api).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });



// =======================
// Start server
// =======================
app.listen(5000, () => console.log('✅ Server running on port 5000'));
