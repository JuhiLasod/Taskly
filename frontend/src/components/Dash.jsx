import React from "react";
import { useNavigate } from "react-router-dom";

function Dash() {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate("/login");
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
      borderRadius: "25px",
      padding: "40px 30px",
      textAlign: "center",
      maxWidth: "600px",
      width: "100%",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box", // Ensure padding is included in width
    },
    title: {
      fontSize: "36px",
      color: "#7e22ce",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    subtext: {
      fontSize: "16px",
      color: "#4b5563",
      marginBottom: "30px",
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
    quote: {
      marginTop: "25px",
      fontSize: "14px",
      color: "#6b7280",
      fontStyle: "italic",
    },

    // Mobile responsiveness using media queries
    "@media (max-width: 600px)": {
      card: {
        padding: "20px 15px", // Reduced padding for smaller screens
        width: "90%", // Wider content area for mobile
      },
      title: {
        fontSize: "28px", // Smaller title font for mobile
      },
      subtext: {
        fontSize: "14px", // Smaller subtext for mobile
      },
      button: {
        padding: "10px 28px", // Smaller button padding for mobile
        fontSize: "14px", // Smaller font size for the button
      },
      quote: {
        fontSize: "12px", // Smaller font size for the quote
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>✨ Welcome to the Taskly!</h1>
        <p style={styles.subtext}>
          Your personal productivity hub. Plan smart, work better, and manage your time with ease.
        </p>

        <button
          style={styles.button}
          onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
          onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
          onClick={handleBtnClick}
        >
          🚀 Login to Continue
        </button>

        <p style={styles.quote}>
          “Discipline is the bridge between goals and accomplishment.” — Jim Rohn
        </p>
      </div>
    </div>
  );
}

export default Dash;
