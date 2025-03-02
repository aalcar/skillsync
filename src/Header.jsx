import React from "react";
import { Moon, Sun } from "lucide-react";

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
            <h1 style={{  marginLeft: '20px', fontSize: '2rem', fontWeight: '550', fontFamily: "'Poppins', sans-serif", background: 'linear-gradient(to right, #3b82f6, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>          
                SkillScalar
            </h1>
      
            <nav style={{ display: 'flex', gap: '40px' }}>
                <a href="#" style={{ color: darkMode ? "#f8f9fa" : "#374151", textDecoration: 'none', fontSize: '1.0rem' }}>Home</a>
                <a href="#" style={{ color: darkMode ? "#f8f9fa" : "#374151", textDecoration: 'none', fontSize: '1.0rem' }}>Recommendations</a>
                <a href="#" style={{ color: darkMode ? "#f8f9fa" : "#374151", textDecoration: 'none', fontSize: '1.0rem' }}>Resume Analyzer</a>
            </nav>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'left', marginRight: '15px' }}>
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
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: darkMode ? "#1f2937" : "#fff", color: darkMode ? " #9F67E0" : "#4285f4", border: darkMode ? "2px solid #9F67E0" : "2px solid #4285f4",  borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Sign up</button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: darkMode ? "#1f2937" : "#fff", color: darkMode ? " #9F67E0" : "#4285f4", border: darkMode ? "2px solid #9F67E0" : "2px solid #4285f4",  borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Sign in</button>
            </div>
        </header>
    );
};

export default Header;
