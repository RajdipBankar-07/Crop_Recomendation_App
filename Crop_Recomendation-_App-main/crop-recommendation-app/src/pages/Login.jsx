
import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ add eye icons
import { AuthContext } from "../pages/AuthContext"; 
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle password
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.email.trim()) return setMessage("Email is required");
    if (!/\S+@\S+\.\S+/.test(form.email))
      return setMessage("Enter a valid email");
    if (!form.password.trim()) return setMessage("Password is required");

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);

      login(res.data.user);

      setTimeout(() => {
        setLoading(false);
        toast.success("Login successful! 🌾");
        navigate("/");
      }, 3000);
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="page">
      <div className="auth-container">
        <Toaster position="top-center" reverseOrder={false} />

        {loading && (
          <div className="center-loader">
            <div className="leaf-loader">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="leaf"
                  style={{ transform: `rotate(${i * 72}deg) translateX(6px)` }}
                >
                  🍃
                </div>
              ))}
            </div>
            <p className="loader-text">🌱 Logging in...</p>
          </div>
        )}

        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group input-icon-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group input-icon-wrapper">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"} // ✅ toggle
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {message && <p className="message">{message}</p>}

          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>

        <p className="login-link">
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
