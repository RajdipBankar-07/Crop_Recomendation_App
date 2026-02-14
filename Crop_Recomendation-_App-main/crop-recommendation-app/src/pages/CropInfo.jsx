
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CropInfo.css';
import { motion, AnimatePresence } from 'framer-motion';

function CropInfo() {
  const [seasons, setSeasons] = useState([]);
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  

  useEffect(() => {
    axios.get('http://localhost:5000/api/seasons')
      .then(res => setSeasons(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/crops')
      .then(res => setCrops(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSeasonClick = (seasonName) => {
    const element = document.getElementById(seasonName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedCrop(null);
  };

  

  return (
    <div className="crop-info-container">

           {/* Season buttons */}
      <div className="season-buttons">
        {seasons.map((season, i) => (
          <button key={i} onClick={() => handleSeasonClick(season.name)}>
            {season.name}
          </button>
        ))}
      </div>


     


      {/* All crops grouped by season */}
      {seasons.map((season, i) => (
        <div key={i} className="crop-section" id={season.name}>
          <h2>{season.name} Crops</h2>
          <div className="underline"></div>

          <div className="crop-cards">
            {crops.filter(crop => crop.season === season.name).map((crop, j) => (
              <motion.div
                key={j}
                className="crop-card"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCropClick(crop)}
              >
                <img src={crop.image_url} alt={crop.name} />
                <h3>{crop.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Crop overlay */}
      <AnimatePresence>
        {showOverlay && selectedCrop && (
          <motion.div
            className="crop-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOverlay}
          >
            <motion.div
              className="crop-overlay-content"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={e => e.stopPropagation()}
              style={{ marginTop: '100px' }} // Header height adjustment
            >
              <button className="close-btn" onClick={closeOverlay}>×</button>
              <h2>{selectedCrop.name}</h2>
              <img src={selectedCrop.image_url} alt={selectedCrop.name} />
              <p><strong>Season:</strong> {selectedCrop.season}</p>
              <p><strong>Soil Type:</strong> {selectedCrop.soil_type}</p>
              <p><strong>Description:</strong> {selectedCrop.description}</p>
              {selectedCrop.video_url && (
                <div className="video-wrapper">
                  <iframe
                    width="100%"
                    height="300"
                    src={selectedCrop.video_url}
                    title="Crop video"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CropInfo;






