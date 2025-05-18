import React from "react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";
import logo from "./assets/logo.png";

const Header = ({ darkMode, toggleTheme }) => {
    return (
        <header style={{
            background: darkMode ? " #1f2937" : "#ffffff",
            color: darkMode ? " #f8f9fa" : "#374151", 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Helvetica, sans-serif'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={logo} alt="Logo" style={{ width: "80px", height: "90px" }} />
                <h1 style={{ fontSize: '2rem', fontWeight: '550', fontFamily: "'Poppins', sans-serif", background: 'linear-gradient(to right, #3b82f6, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>          
                    SkillSync
                </h1>
            </div>
      
            <nav style={{ display: 'flex', gap: '40px', alignItems: 'center', marginRight: '40px'}}>
                <Link to="/jobs" style={{ color: darkMode ? "#f8f9fa" : "#374151", textDecoration: 'none', fontSize: '1.0rem' }}>
                    Jobs
                </Link>
                <Link to="/recommendations" style={{ color: darkMode ? "#f8f9fa" : "#374151", textDecoration: 'none', fontSize: '1.0rem' }}>
                    Recommendations
                </Link>
                <Link to="/profile" style={{ color: darkMode ? "#f8f9fa" : "#374151", textDecoration: 'none', fontSize: '1.0rem' }}>
                    Profile
                </Link>
            </nav>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'left', marginRight: '30px' }}>
                <button onClick={toggleTheme} style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: darkMode ? "#1f2937" : "#ffffff",
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}>
                    {darkMode ? <Sun color="#9F67E0" size={25} /> : <Moon color="#374151" size={25} />}
                </button>
                <SignOut darkMode={darkMode} ></SignOut>
            </div>
        </header>
    )
}

export default Header
