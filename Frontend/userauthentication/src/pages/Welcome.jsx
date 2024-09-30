import React, { useEffect, useState } from 'react';
import "../styles/Welcome.css";

function Welcome() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
            setMessage("No token found, please login first.");
            return;
        }

        // Make an authenticated request to the /welcome endpoint
        fetch("http://localhost:5000/welcome", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Set the Authorization header
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    setMessage(data.message);
                } else {
                    setMessage("Welcome, but something went wrong.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setMessage("Error fetching welcome message.");
            });
    }, []);

    useEffect(() => {
        // Initialize Typed.js after the message is set
        if (message) {
            const options = {
                strings: [message], // Use the message fetched from the API
                typeSpeed: 50,
                backSpeed: 25,
                backDelay: 1500,
                loop: false, // Set to true if you want the animation to loop
                showCursor: false // Disable the blinking cursor

            };

            const typed = new window.Typed('.typed', options); // Initialize Typed.js

            // Cleanup function to destroy Typed instance
            return () => {
                typed.destroy();
            };
        }
    }, [message]); // Run this effect whenever the message changes

    return (
        <div>
            <h1 className='welcome-text typed'></h1> {/* This will display the animated text */}
            <button className="logout" onClick={() => {
                localStorage.removeItem('token'); // Clear token on logout
                window.location.href = "/login"; // Redirect to login
            }}>
                Logout
            </button>
        </div>
    );
}

export default Welcome;

