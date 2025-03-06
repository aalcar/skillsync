import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.jpg";

const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div style={{
      background: "#2d3748",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "#1f2937",
        color: "#f8f9fa",
        textAlign: "center",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "400px"
      }}>
        <img src={logo} alt="SkillScalar Logo" style={{ width: "180px", height: "200px" }} />
        <h1 style={{
          marginBottom: '2px',
          fontSize: "2rem",
          fontWeight: "550",
          fontFamily: "'Poppins', sans-serif"
        }}>
          SkillScalar
        </h1>
        
        {/* "Go to Dashboard" Button */}
        <button 
          onClick={() => navigate("/dashboard")} 
          style={{
            padding: "10px 20px",
            backgroundColor: "#9333ea",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "20px"
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
