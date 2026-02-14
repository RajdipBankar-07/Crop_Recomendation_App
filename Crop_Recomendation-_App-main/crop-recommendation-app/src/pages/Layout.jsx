
import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaSeedling,
  FaChartLine,
  FaInfoCircle,
  FaSignInAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../pages/AuthContext"; // ✅ import
import "./Layout.css";

function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // ✅ get user + logout

  return (
    <>
      <header className="navbar">
        <h1>🌾 Crop Recommendation</h1>
        <nav>
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/")}>
            <FaHome /> Home
          </motion.button>

          <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/crop-info")}>
            <FaSeedling /> Crop Info
          </motion.button>

          <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/recommendation")}>
            <FaChartLine /> Recommendation
          </motion.button>

          <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate("/about")}>
            <FaInfoCircle /> About Us
          </motion.button>

         
          {user ? (
            <>
              <motion.button className="logout-btn" onClick={logout}>
                <FaSignOutAlt /> Logout
              </motion.button>
              <motion.button className="user-btn" title={user.fullname}>
                <FaUserCircle /> {user.fullname}
              </motion.button>
            </>
          ) : (
            <motion.button onClick={() => navigate("/login")}>
              <FaSignInAlt /> Login
            </motion.button>
          )}

        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default Layout;
