import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const text = await res.text();
    if (text === "success") {
        localStorage.setItem("email", email);
        navigate("/userdash");
    } else {
      setMessage(text);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f472b6, #fcd34d)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "20px",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      padding: "40px 30px",
      borderRadius: "25px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center",
      position: "relative",
      boxSizing: "border-box", // Include padding in width calculation
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#7e22ce",
      marginBottom: "25px",
    },
    inputGroup: {
      marginBottom: "20px",
      textAlign: "left",
    },
    label: {
      display: "block",
      fontWeight: "500",
      marginBottom: "5px",
      color: "#4b5563",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box", // Include padding in input size calculation
    },
    message: {
      color: "red",
      fontSize: "14px",
      margin: "10px 0",
    },
    loginButton: {
      background: "linear-gradient(to right, #9333ea, #ec4899)",
      border: "none",
      color: "white",
      padding: "12px 28px",
      fontSize: "15px",
      fontWeight: "600",
      borderRadius: "30px",
      cursor: "pointer",
      marginTop: "20px",
    },
    linkBtn: {
      background: "none",
      border: "none",
      color: "#7e22ce",
      fontWeight: "500",
      cursor: "pointer",
      textDecoration: "underline",
      marginTop: "20px",
      fontSize: "14px",
      display: "inline-block",
    },

    // Mobile responsiveness using media queries
    "@media (max-width: 600px)": {
      card: {
        padding: "20px",
        width: "90%",
        maxWidth: "95%",
      },
      title: {
        fontSize: "24px", // Smaller title font for mobile
      },
      input: {
        padding: "10px", // Adjust padding inside inputs for mobile
      },
      loginButton: {
        padding: "12px 24px", // Slightly smaller padding for the button
        fontSize: "14px", // Adjust font size for mobile
      },
      linkBtn: {
        fontSize: "12px", // Adjust font size for the link
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}> Login to Your Account</h2>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        {message && <div style={styles.message}>{message}</div>}

        <button style={styles.loginButton} onClick={handleLogin}>
           Login
        </button>
        <br/>
        <button style={styles.linkBtn} onClick={handleSignup}>
          Don’t have an account? Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
