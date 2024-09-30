import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "../styles/Signup.css";

function Signup() {
    // State to store the form inputs
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));

        // Reset validation error on input change
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: ""
        }));
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    // Form validation
    const validateForm = () => {
        let valid = true;
        let newErrors = { username: "", email: "", password: "" };

        if (!formData.username) {
            newErrors.username = "Username is required";
            valid = false;
        }
        if (!formData.email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            valid = false;
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Stop submission if validation fails

        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: data.message || "Signup successful!",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Signup failed",
                    text: data.message || "Something went wrong. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="signup-container">
            <h3>Signup</h3>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle input type
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                        />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /> {/* Use FontAwesome icons */}
                        </span>
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit" className="signup-btn">Sign Up</button>

                <div className="login-prompt">
                    <span>Already have an account? </span>
                    <a href="/login" className="login-btn">Login</a>
                </div>
            </form>
        </div>
    );
}

export default Signup;
