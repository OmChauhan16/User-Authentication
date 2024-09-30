import React, { useState } from "react";
import "../styles/Login.css";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ username: "", password: "" });

    let hasErrors = false;

    // Validation
    if (!username) {
      setErrors(prev => ({ ...prev, username: "Email is required." }));
      hasErrors = true;
    }

    if (!password) {
      setErrors(prev => ({ ...prev, password: "Password is required." }));
      hasErrors = true;
    }

    if (hasErrors) return; // Stop submission if there are errors

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login Successful! Redirecting...',
        });
        setTimeout(() => {
          window.location.href = "/welcome";
        }, 2000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: data.message || "Please check your credentials.",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  // Handle input change and clear corresponding error messages
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: "" })); // Clear username error
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" })); // Clear password error
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your Email"
            value={username}
            onChange={handleUsernameChange} // Use the new change handler
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange} // Use the new change handler
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" className="loginbtn">Login</button>
        <div className="signup-prompt">
          <span>Don't have an account?</span>
          <a href="/signup"> Sign Up</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
