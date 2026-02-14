
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaHome, FaEye, FaEyeSlash } from "react-icons/fa"; // added eye icons
import "./Auth.css";

function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // toggle password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // toggle confirm password
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.fullname.trim()) newErrors.fullname = "Full Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email address";

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{6,}$/;
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number & symbol";
    }

    if (!form.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm Password is required";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!form.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/register", {
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        address: form.address,
      });

      setTimeout(() => {
        setLoading(false);
        toast.success("Registration successful! Please login.");
        setForm({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
        });
        setTimeout(() => navigate("/login"), 2000);
      }, 3000);
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="page">
      <div className="auth-container register-container">
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
            <p className="loader-text">Registering...</p>
          </div>
        )}

        <h2>Register</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <div className="input-icon-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Enter your full name"
                  value={form.fullname}
                  onChange={handleChange}
                />
              </div>
              {errors.fullname && <p className="message">{errors.fullname}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-icon-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="message">{errors.email}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p className="message">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="message">{errors.confirmPassword}</p>
              )}
            </div>
          </div>


          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <div className="input-icon-wrapper">
                <FaHome className="input-icon" />
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
              {errors.address && <p className="message">{errors.address}</p>}
            </div>
          </div>

          <button type="submit" disabled={loading}>
            Register
          </button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;


