import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{6,}$/;
    const cleanPassword = password.trim();
    if (!passwordPattern.test(cleanPassword)) {
      setMessage("Password must contain at least one uppercase letter, one number, and one special character.");
      return;
    }

    const res = await fetch("http://localhost:8000/api/auth/signup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const text = await res.text();
    if (text === "success") {
      Swal.fire({
        icon: 'success',
        title: 'Signed Up!',
        text: text, // Message from backend
        confirmButtonColor: '#3085d6'
      });
      navigate("/login");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text,
        confirmButtonColor: '#d33'
      });
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #f472b6, #fcd34d)",
      padding: "20px",
      fontFamily: "'Segoe UI', sans-serif",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderRadius: "10px",
      padding: "40px 30px",
      textAlign: "center",
      maxWidth: "500px",
      width: "100%",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
    },
    title: {
      fontSize: "28px",
      color: "#7e22ce",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    inputContainer: {
      textAlign: "left", // Align inputs to the left
      marginBottom: "15px",
      width: "100%",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      color: "#4b5563",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "8px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    button: {
      background: "linear-gradient(to right, #9333ea, #ec4899)",
      border: "none",
      color: "white",
      padding: "12px 32px",
      fontSize: "16px",
      fontWeight: "600",
      borderRadius: "30px",
      cursor: "pointer",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    buttonHover: {
      transform: "scale(1.05)",
      boxShadow: "0 8px 20px rgba(147, 51, 234, 0.4)",
    },
    message: {
      color: "red",
      fontSize: "14px",
      marginTop: "10px",
    },
    link: {
      marginTop: "15px",
      display: "block",
      color: "#7e22ce",
      textDecoration: "none",
    },
    "@media (max-width: 600px)": {
      card: {
        padding: "20px 15px", // Reduced padding for smaller screens
        width: "90%", // Wider content area for mobile
      },
      title: {
        fontSize: "24px", // Smaller title font for mobile
      },
      input: {
        padding: "10px",
        fontSize: "14px",
      },
      button: {
        padding: "10px 28px", // Smaller button padding for mobile
        fontSize: "14px", // Smaller font size for the button
      },
      container: {
        padding: "10px",
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}> Create Your Account</h1>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>

        {message && <div style={styles.message}>{message}</div>}

        <button
          style={styles.button}
          onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
          onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <a href="/login" style={styles.link}>Already have an account? Log in</a>
      </div>
    </div>
  );
}

export default Signup;
