// import React, { useRef, useState, useEffect } from "react";

// function Message({ role, content }) {
//   return (
//     <div style={{ display: "flex", justifyContent: role === "user" ? "flex-end" : "flex-start", marginBottom: 8 }}>
//       <div style={{ width: "100%", maxWidth: 720, padding: "10px 12px", borderRadius: 10, background: role === "user" ? "#1f2937" : "#151b2d", color: "#e8ecf1", boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset", wordBreak: "break-word" }}>
//         {content}
//       </div>
//     </div>
//   );
// }

// const starter = [{ role: "assistant", content: "Hi! I'm your farm assistant. Ask me anything about crops." }];

// export default function App() {
//   const [messages, setMessages] = useState(starter);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const listRef = useRef(null);

//   function offlineReply(prompt) {
//     const lower = String(prompt || "").toLowerCase();
    
//     // Orchard irrigation optimization (specific before generic watering)
//     if ((lower.includes("orchard") || lower.includes("orchards")) && (lower.includes("irrigation") || lower.includes("optimize") || lower.includes("optimization") || lower.includes("optimum"))) {
//       return "Orchard Irrigation: Use drip with 2–4 emitters per tree (4–8 L/hr each), irrigate at the canopy dripline, mulch 5–8 cm to cut evaporation, schedule via soil moisture sensors or ET (allow 10–20% regulated deficit after fruit set), split into 2–3 short pulses to reduce runoff, and adjust by growth stage (flowering/fruit set highest demand). Maintain basins, weed-free strips, and check uniformity quarterly.";
//     }

//     // Water and irrigation
//     if (lower.includes("water") || lower.includes("irrigation") || lower.includes("moisture")) {
//       return "Watering Tips: Aim for consistent moisture; early mornings are best for watering. Water deeply but less frequently to encourage strong root growth. Check soil moisture 2-3 inches deep before watering.";
//     }
    
//     // Soil related
//     if (lower.includes("soil") || lower.includes("dirt") || lower.includes("ground")) {
//       return "Soil Advice: Use well-draining loam enriched with 3–5% organic matter. Test pH levels (6.0-7.0 for most crops). Add compost annually to improve soil structure and fertility.";
//     }
    
//     // Fertilizer and nutrients
//     if (lower.includes("fertilizer") || lower.includes("nutrient") || lower.includes("npk") || lower.includes("feed")) {
//       return "Fertilizer Guide: Apply balanced NPK (e.g., 10-10-10) according to crop stage and soil test. Use organic options like compost, manure, or fish emulsion. Avoid over-fertilizing which can burn plants.";
//     }
    
//     // Specific disease management (check these first)
//     if (lower.includes("banana disease") || lower.includes("banana pest") || lower.includes("banana diseases") || lower.includes("names of banana") || lower.includes("banana disease names") || lower.includes("banana diseases names")) {
//       return "Banana Disease Names: 1) Panama Disease (Fusarium Wilt) - yellowing leaves, wilting, plant death. 2) Black Sigatoka - dark spots on leaves, leaf death. 3) Banana Bunchy Top - stunted growth, bunchy appearance. 4) Anthracnose - dark spots on fruit. 5) Moko Disease - bacterial wilt, yellowing leaves. 6) Banana Streak Virus - yellow streaks on leaves. 7) Rhizome Rot - rotting of underground stem.";
//     }
    
//     if (lower.includes("grape disease") || lower.includes("grape pest") || lower.includes("grape diseases") || lower.includes("names of grape") || lower.includes("grape disease names") || lower.includes("grape diseases names")) {
//       return "Grape Disease Names: 1) Powdery Mildew - white powder coating on leaves and fruit. 2) Downy Mildew - yellow spots on top, white fuzz underneath leaves. 3) Black Rot - dark spots on fruit that spread. 4) Botrytis (Gray Mold) - gray fuzzy mold on fruit. 5) Anthracnose - dark spots on leaves and stems. 6) Phomopsis - brown spots on leaves and canes. 7) Crown Gall - tumor-like growths on roots and trunk.";
//     }
    
//     if (lower.includes("tomato disease") || lower.includes("tomato pest")) {
//       return "Tomato Diseases: Early Blight (dark spots with rings) - remove infected leaves, apply fungicides. Late Blight (water-soaked spots) - improve drainage, apply copper fungicides. Blossom End Rot (black bottom) - maintain consistent soil moisture, add calcium. Fusarium Wilt (yellowing, wilting) - use resistant varieties, rotate crops.";
//     }
    
//     if (lower.includes("plant disease") || lower.includes("crop disease") || lower.includes("disease control")) {
//       return "Disease Prevention: Choose disease-resistant varieties, practice crop rotation, maintain proper spacing for air circulation, avoid overhead watering, remove infected plant material, use clean tools, and apply appropriate fungicides when needed. Early detection and treatment are key to successful disease management.";
//     }
    
//     if (lower.includes("disease names") || lower.includes("names of disease") || lower.includes("common diseases")) {
//       return "Common Plant Diseases: Fungal - Powdery Mildew, Downy Mildew, Black Rot, Anthracnose, Rust, Blight. Bacterial - Bacterial Wilt, Crown Gall, Fire Blight. Viral - Mosaic Virus, Streak Virus, Bunchy Top. Nematode - Root Knot, Cyst Nematodes. Each crop has specific diseases - ask about your particular crop for detailed information.";
//     }
    
//     // Agricultural techniques and methods
//     if (lower.includes("crop rotation") || lower.includes("rotation")) {
//       return "Crop Rotation: Practice rotating crops in different families each year to prevent disease buildup and improve soil health. Example: Legumes (beans, peas) → Leafy greens → Root crops → Fruiting crops. This helps break pest and disease cycles while maintaining soil fertility.";
//     }
    
//     if (lower.includes("mulch") || lower.includes("mulching")) {
//       return "Mulching: Apply organic mulch (straw, leaves, compost) around plants to retain moisture, suppress weeds, and regulate soil temperature. Use 2-4 inches of mulch, keeping it away from plant stems. Mulch also improves soil structure as it decomposes.";
//     }
    
//     if (lower.includes("compost") || lower.includes("composting")) {
//       return "Composting: Create nutrient-rich compost by mixing green materials (kitchen scraps, grass clippings) with brown materials (leaves, straw) in a 1:3 ratio. Turn regularly, keep moist, and use when dark and crumbly. Compost improves soil structure and provides nutrients.";
//     }
    
//     if (lower.includes("pruning") || lower.includes("prune")) {
//       return "Pruning: Remove dead, diseased, or damaged branches to improve plant health and productivity. Prune fruit trees in late winter, remove suckers from tomatoes, and deadhead flowers to encourage continued blooming. Use clean, sharp tools and make cuts at 45-degree angles.";
//     }
    
//     if (lower.includes("harvest") || lower.includes("harvesting") || lower.includes("when to harvest")) {
//       return "Harvesting: Pick vegetables at peak ripeness for best flavor and nutrition. Harvest in early morning when plants are hydrated. Use sharp tools to avoid damage. Store properly - cool, dry conditions for most crops. Some crops like tomatoes continue ripening after picking.";
//     }
    
//     if (lower.includes("storage") || lower.includes("storing")) {
//       return "Storage: Store crops in cool, dry, well-ventilated conditions. Root vegetables keep best in cool, humid conditions. Fruits need good air circulation. Check regularly for spoilage. Some crops like potatoes need darkness to prevent greening.";
//     }
    
//     // General pests and diseases (check after specific ones)
//     if (lower.includes("pest") || lower.includes("disease") || lower.includes("bug") || lower.includes("insect")) {
//       return "Pest Management: Monitor weekly; use integrated pest management and rotate actives. Encourage beneficial insects, use row covers, and practice crop rotation. Identify problems early for best control.";
//     }
    
//     // Specific crops
//     if (lower.includes("tomato")) {
//       return "Tomato Care: Tomatoes prefer 18–27°C, full sun, deep but infrequent watering, and staking. Plant after last frost, space 24-36 inches apart. Prune suckers and provide support for best yields.";
//     }
    
//     if (lower.includes("lettuce") || lower.includes("spinach") || lower.includes("greens")) {
//       return "Leafy Greens: Plant in cool weather (spring/fall), provide partial shade in hot climates. Keep soil consistently moist, harvest outer leaves first. Succession plant every 2-3 weeks for continuous harvest.";
//     }
    
//     if (lower.includes("carrot") || lower.includes("radish") || lower.includes("beet")) {
//       return "Root Vegetables: Plant in loose, well-drained soil free of rocks. Thin seedlings to proper spacing. Keep soil consistently moist for even growth. Harvest when roots reach desired size.";
//     }
    
//     if (lower.includes("pepper") || lower.includes("chili")) {
//       return "Pepper Growing: Start indoors 8-10 weeks before last frost. Transplant after soil warms to 65°F. Provide full sun, consistent moisture, and support for larger varieties. Harvest when firm and fully colored.";
//     }
    
//     if (lower.includes("cucumber") || lower.includes("squash") || lower.includes("zucchini")) {
//       return "Vine Crops: Plant in warm soil after frost danger. Provide trellis or space for vines to spread. Water at soil level to prevent disease. Harvest regularly to encourage continued production.";
//     }
    
//     if (lower.includes("banana")) {
//       return "Banana Growing: Plant in warm climates (USDA zones 9-11), full sun, well-draining soil. Keep soil consistently moist but not waterlogged. Provide wind protection and space 8-10 feet apart. Harvest when fingers are plump and rounded.";
//     }
    
//     if (lower.includes("apple") || lower.includes("pear") || lower.includes("cherry")) {
//       return "Tree Fruits: Plant in well-draining soil with full sun. Prune annually for shape and fruit production. Most need cross-pollination. Space trees 15-20 feet apart. Harvest when fruit is firm and fully colored.";
//     }
    
//     if (lower.includes("citrus") || lower.includes("orange") || lower.includes("lemon") || lower.includes("lime")) {
//       return "Citrus Trees: Grow in warm climates (USDA zones 9-11), full sun, well-draining soil. Water deeply but infrequently. Protect from frost. Fertilize 3 times per year. Harvest when fruit is fully colored and sweet.";
//     }
    
//     if (lower.includes("berry") || lower.includes("strawberry") || lower.includes("blueberry") || lower.includes("raspberry")) {
//       return "Berry Growing: Plant in acidic soil (pH 4.5-5.5 for blueberries), full sun to partial shade. Keep soil consistently moist. Mulch to retain moisture and suppress weeds. Harvest when berries are fully ripe and sweet.";
//     }
    
//     if (lower.includes("grape") || lower.includes("vine")) {
//       return "Grape Growing: Plant in well-draining soil with full sun, space 6-8 feet apart. Provide trellis support, prune annually in late winter. Water deeply but infrequently. Harvest when grapes are fully colored and sweet. Protect from birds with netting.";
//     }
    
//     if (lower.includes("sugarcane") || lower.includes("sugar cane")) {
//       return "Sugarcane Growing: Plant in warm climates (USDA zones 9-11), full sun, well-draining soil. Space plants 3-4 feet apart. Keep soil consistently moist. Harvest when stalks are mature (12-18 months). Cut at ground level and remove leaves.";
//     }
    
//     if (lower.includes("corn") || lower.includes("maize")) {
//       return "Corn Growing: Plant in warm soil after frost danger, full sun, well-draining soil. Space 8-12 inches apart in rows 30 inches apart. Keep soil consistently moist. Harvest when kernels are plump and milky.";
//     }
    
//     if (lower.includes("wheat") || lower.includes("rice") || lower.includes("barley") || lower.includes("oats")) {
//       return "Grain Crops: Plant in well-draining soil with full sun. Follow specific planting times for your region. Keep soil consistently moist during growth. Harvest when grains are mature and dry. Store in cool, dry conditions.";
//     }
    
//     if (lower.includes("potato") || lower.includes("sweet potato")) {
//       return "Potato Growing: Plant in loose, well-draining soil with full sun. Space 12 inches apart. Keep soil consistently moist but not waterlogged. Harvest when foliage dies back. Store in cool, dark, dry place.";
//     }
    
//     // Additional crops
//     if (lower.includes("onion") || lower.includes("garlic")) {
//       return "Onion/Garlic Growing: Plant in well-draining soil with full sun. Space 4-6 inches apart. Keep soil consistently moist. Harvest when tops fall over and dry. Store in cool, dry, well-ventilated place.";
//     }
    
//     if (lower.includes("cabbage") || lower.includes("broccoli") || lower.includes("cauliflower")) {
//       return "Brassica Crops: Plant in cool weather, well-draining soil with full sun. Space 18-24 inches apart. Keep soil consistently moist. Harvest when heads are firm and tight. Use row covers to protect from pests.";
//     }
    
//     if (lower.includes("bean") || lower.includes("pea")) {
//       return "Legume Growing: Plant in well-draining soil with full sun. Space 2-4 inches apart. Keep soil consistently moist. Provide support for climbing varieties. Harvest regularly to encourage continued production.";
//     }
    
//     if (lower.includes("herb") || lower.includes("basil") || lower.includes("parsley") || lower.includes("cilantro")) {
//       return "Herb Growing: Plant in well-draining soil with full sun to partial shade. Space 6-12 inches apart. Keep soil consistently moist. Harvest regularly to encourage growth. Use fresh or dry for storage.";
//     }
    
//     // Seasonal crop guidance
//     if (lower.includes("winter") || lower.includes("cold season") || lower.includes("winter crop")) {
//       return "Winter Crops: Plant cold-hardy vegetables like kale, spinach, lettuce, carrots, radishes, broccoli, cauliflower, Brussels sprouts, and winter squash. These crops can tolerate frost and grow well in cool temperatures. Use row covers for extra protection.";
//     }
    
//     if (lower.includes("spring") || lower.includes("spring crop")) {
//       return "Spring Crops: Plant cool-season vegetables like peas, lettuce, spinach, radishes, carrots, beets, and early potatoes. These crops prefer cooler temperatures and can be planted as soon as soil can be worked. Start seeds indoors for warm-season crops.";
//     }
    
//     if (lower.includes("summer") || lower.includes("summer crop")) {
//       return "Summer Crops: Plant warm-season vegetables like tomatoes, peppers, cucumbers, squash, beans, corn, and melons. These crops need warm soil and air temperatures. Plant after last frost date and provide consistent moisture.";
//     }
    
//     if (lower.includes("fall") || lower.includes("autumn") || lower.includes("fall crop")) {
//       return "Fall Crops: Plant cool-season vegetables like lettuce, spinach, kale, radishes, turnips, and winter squash. These crops mature in cooler weather and can often survive light frosts. Plant 6-8 weeks before first frost.";
//     }
    
//     if (lower.includes("season") || lower.includes("seasonal") || lower.includes("when to plant")) {
//       return "Seasonal Planting Guide: Winter (Dec-Feb): Kale, spinach, lettuce, carrots. Spring (Mar-May): Peas, lettuce, radishes, early potatoes. Summer (Jun-Aug): Tomatoes, peppers, cucumbers, corn. Fall (Sep-Nov): Lettuce, spinach, kale, winter squash. Check your local frost dates for best planting times.";
//     }
    
//     // Planting and timing
//     if (lower.includes("plant") || lower.includes("seed") || lower.includes("grow") || lower.includes("sow")) {
//       return "Planting Tips: Check your local frost dates and plant accordingly. Start seeds indoors for warm-season crops. Harden off seedlings before transplanting. Follow seed packet instructions for depth and spacing.";
//     }
    
//     // Harvesting
//     if (lower.includes("harvest") || lower.includes("pick") || lower.includes("collect")) {
//       return "Harvesting Guide: Pick vegetables at peak ripeness for best flavor and nutrition. Harvest in early morning when plants are hydrated. Use sharp tools to avoid damage. Store properly to maintain freshness.";
//     }
    
//     // General gardening
//     if (lower.includes("garden") || lower.includes("crop") || lower.includes("vegetable") || lower.includes("plant")) {
//       return "General Gardening: Choose the right plants for your climate and season. Practice crop rotation to prevent disease. Use mulch to retain moisture and suppress weeds. Keep a garden journal to track what works best.";
//     }
    
//     return "I'm your comprehensive Indian farm assistant! I can help with Rabi/Kharif/Zaid seasons, crop varieties, soil testing, irrigation, government schemes, pest control, disease management, harvesting, storage, spacing, maturity times, and specific crops (wheat, rice, cotton, sugarcane, maize, vegetables, fruits). I also provide information about PM-KISAN, KCC loans, organic farming schemes, fertilizer ratios, soil types, and regional farming practices. What would you like to know?";
//   }

//   useEffect(() => {
//     if (!listRef.current) return;
//     listRef.current.scrollTop = listRef.current.scrollHeight;
//   }, [messages, loading]);

//   async function handleSend(e) {
//     e.preventDefault();
//     const text = input.trim();
//     if (!text) return;
//     const next = [...messages, { role: "user", content: text }];
//     setMessages(next);
//     setInput("");
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.content })) })
//       });
//       // Parse response body as JSON if possible; otherwise as text
//       let data; let rawText = "";
//       try { data = await res.json(); } catch { try { rawText = await res.text(); } catch { rawText = ""; } }
//       if (!res.ok) {
//         const errorMessage =
//           (data && (data.error?.message || data.error)) || rawText || `Request failed (${res.status})`;
//         throw new Error(errorMessage);
//       }
//       const assistant = data?.content || (Array.isArray(data) ? data.join("\n") : String(data));
//       setMessages([...next, { role: "assistant", content: assistant }]);
//     } catch (err) {
//       const message = err?.message || "Sorry, there was an error contacting the AI.";
//       const fallback = offlineReply(text);
//       setMessages([...next, { role: "assistant", content: `${message}\n\nFallback: ${fallback}` }]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ height: "100%", display: "grid", gridTemplateRows: "1fr auto" }}>
//       <div ref={listRef} style={{ overflowY: "auto", padding: 16 }}>
//         {messages.map((m, i) => (<Message key={i} role={m.role} content={m.content} />))}
//         {loading && <Message role="assistant" content="Thinking…" />}
//       </div>
//       <form onSubmit={handleSend} style={{ display: "flex", gap: 8, padding: 16, background: "#0b1020", borderTop: "1px solid rgba(255,255,255,0.06)", position: "sticky", bottom: 0 }}>
//         <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about crops…" style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "#0e1528", color: "#e8ecf1" }} />
//         <button type="submit" disabled={loading} style={{ padding: "12px 16px", borderRadius: 10, background: "#6ee7b7", color: "#0b1020", border: "none", fontWeight: 600, minWidth: 88 }}>
//           {loading ? "Sending…" : "Send"}
//         </button>
//       </form>
//     </div>
//   );
// }




import React, { useRef, useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa"; // small floating icon

function Message({ role, content }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: role === "user" ? "flex-end" : "flex-start",
        marginBottom: 8
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          padding: "10px 12px",
          borderRadius: 10,
          background: role === "user" ? "#1f2937" : "#151b2d",
          color: "#e8ecf1",
          boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
          wordBreak: "break-word"
        }}
      >
        {content}
      </div>
    </div>
  );
}

const starter = [
  { role: "assistant", content: "Hi! I'm your farm assistant. Ask me anything about crops." }
];

export default function Chatbot() {
  const [messages, setMessages] = useState(starter);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // toggle chat visibility
  const listRef = useRef(null);

  function offlineReply(prompt) {
    const lower = String(prompt || "").toLowerCase();
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
    
    // Fertilizer and nutrients
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
    
    return "I'm your comprehensive Indian farm assistant! I can help with Rabi/Kharif/Zaid seasons, crop varieties, soil testing, irrigation, government schemes, pest control, disease management, harvesting, storage, spacing, maturity times, and specific crops (wheat, rice, cotton, sugarcane, maize, vegetables, fruits). I also provide information about PM-KISAN, KCC loans, organic farming schemes, fertilizer ratios, soil types, and regional farming practices. What would you like to know?";
  }
  

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.content })) })
      });
      let data;
      let rawText = "";
      try { data = await res.json(); } catch { try { rawText = await res.text(); } catch { rawText = ""; } }
      if (!res.ok) {
        const errorMessage =
          (data && (data.error?.message || data.error)) || rawText || `Request failed (${res.status})`;
        throw new Error(errorMessage);
      }
      const assistant = data?.content || (Array.isArray(data) ? data.join("\n") : String(data));
      setMessages([...next, { role: "assistant", content: assistant }]);
    } catch (err) {
      const message = err?.message || "Sorry, there was an error contacting the AI.";
      const fallback = offlineReply(text);
      setMessages([...next, { role: "assistant", content: `${message}\n\nFallback: ${fallback}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 999 }}>
      {!open && (
        <div
          onClick={() => setOpen(true)}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#6ee7b7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
          }}
        >
          <FaRobot size={28} color="#0b1020" />
        </div>
      )}

      {open && (
        <div
          style={{
            width: 360,
            height: 500,
            display: "flex",
            flexDirection: "column",
            background: "#0b1020",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
          }}
        >
          <div
            style={{
              background: "#151b2d",
              padding: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#e8ecf1",
              fontWeight: 600,
              fontSize: 16
            }}
          >
            Farm Assistant
            <span
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer", fontWeight: "bold", fontSize: 18 }}
            >
              ×
            </span>
          </div>

          <div
            ref={listRef}
            style={{ flex: 1, overflowY: "auto", padding: 12, background: "#0b1020" }}
          >
            {messages.map((m, i) => (
              <Message key={i} role={m.role} content={m.content} />
            ))}
            {loading && <Message role="assistant" content="Thinking…" />}
          </div>

          <form
            onSubmit={handleSend}
            style={{
              display: "flex",
              gap: 8,
              padding: 12,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "#0b1020"
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crops…"
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "#0e1528",
                color: "#e8ecf1"
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                background: "#6ee7b7",
                color: "#0b1020",
                border: "none",
                fontWeight: 600,
                minWidth: 72
              }}
            >
              {loading ? "Sending…" : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
