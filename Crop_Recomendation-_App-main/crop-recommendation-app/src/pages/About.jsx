
// import React from 'react';
// import './About.css';
// import { motion } from 'framer-motion';

// const textVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

// const imageVariants = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1 },
// };

// function About ()  {
//   return (
//     <motion.div
//       className="about-us-container"
//       initial="hidden"
//       animate="visible"
//       transition={{ staggerChildren: 0.3 }}
//     >
//       <motion.div
//         className="about-header"
//         variants={textVariants}
//         transition={{ duration: 0.8 }}
//       >
//         <h1>About Smart Crop Scheduler</h1>
//         <p>
//           Empowering farmers through data-driven decision making and modern agri-tech solutions.
//         </p>
//       </motion.div>

//       <div className="about-content">
//         <motion.div
//           className="about-image"
//           variants={imageVariants}
//           transition={{ duration: 1 }}
//           whileHover={{ scale: 1.05 }}
//         >
//           <img
//             src="https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-08/agritech.jpg"
//             alt="AgriTech"
//           />
//         </motion.div>

//         <motion.div
//           className="about-text"
//           variants={textVariants}
//           transition={{ duration: 0.8 }}
//         >
//           <h2>Our Mission</h2>
//           <motion.p
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1 }}
//             viewport={{ once: true }}
//           >
//             We aim to revolutionize farming by leveraging the power of technology and AI to help
//             farmers make better crop decisions. From seasonal planning to crop rotation insights,
//             we provide smart tools that improve productivity and sustainability.
//           </motion.p>

//           <h2>Why Smart Crop Scheduler?</h2>
//           <motion.ul
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             {[
//               '🌾 Intelligent crop recommendations based on soil and weather',
//               '📆 Smart scheduling to optimize planting and harvesting cycles',
//               '📊 Real-time insights for informed decision-making',
//               '🤝 Built by a team passionate about agricultural innovation',
//             ].map((item, i) => (
//               <motion.li
//                 key={i}
//                 initial={{ x: -20, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 transition={{ delay: i * 0.2, duration: 0.6 }}
//               >
//                 {item}
//               </motion.li>
//             ))}
//           </motion.ul>

//           <h2>Our Vision</h2>
//           <motion.p
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1 }}
//             viewport={{ once: true }}
//           >
//             To build a future where every farmer, regardless of location or resources, can maximize
//             their yield and minimize risks with the help of smart, accessible tools.
//           </motion.p>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default About;



import React from 'react';
import './About.css';
import { motion } from 'framer-motion';

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

function About() {
  return (
    <motion.div
      className="about-us-container"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.3 }}
    >
      <motion.div
        className="about-header"
        variants={textVariants}
        transition={{ duration: 0.8 }}
      >
        <h1>About Smart Crop Recommendation System</h1>
        <p>
          Empowering farmers with intelligent crop selection using data-driven insights, soil analysis, and weather-based predictions.
        </p>
      </motion.div>

      <div className="about-content">
        <motion.div
          className="about-image"
          variants={imageVariants}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-08/agritech.jpg"
            alt="AgriTech"
          />
        </motion.div>

        <motion.div
          className="about-text"
          variants={textVariants}
          transition={{ duration: 0.8 }}
        >
          <h2>Our Mission</h2>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Our mission is to guide farmers in choosing the right crops for their soil and climate conditions. By analyzing environmental, soil, and seasonal data, we help farmers maximize yield, conserve resources, and make sustainable choices.
          </motion.p>

          <h2>Why Smart Crop Recommendation?</h2>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              '🌱 Personalized crop suggestions based on soil nutrients and weather patterns',
              '🌤️ AI-driven recommendations for optimal planting times',
              '📈 Improved productivity and reduced risk through data analytics',
              '🤖 Integrating technology and agriculture for smarter decisions',
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <h2>Our Vision</h2>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            To create a future where every farmer can make confident, informed decisions about what to grow, leading to higher yields, sustainable farming, and food security for all.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default About;
