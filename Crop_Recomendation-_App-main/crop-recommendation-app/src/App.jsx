import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CropInfo from './pages/CropInfo';
import About from './pages/About';
import Login from './pages/Login';
import Layout from './pages/Layout';
import CropPredictor from './pages/CropPredictor';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute'; 
import Chatbot from './pages/Chatbot';
import './App.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/crop-info" element={<CropInfo />} />

          <Route
            path="/recommendation"
            element={
              <ProtectedRoute>
                <CropPredictor />
              </ProtectedRoute>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/chatbot" element={<Chatbot/>}></Route> */}
        </Route>
      </Routes>
      <Chatbot/>
    </div>
  );
}

export default App;

