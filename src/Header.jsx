import React from "react";
import { Moon } from "lucide-react";

const Header = () => {
    return (
        <header style={{
            background: 'rgb(255, 255, 255)', 
            color: '#f8f9fa', 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Helvetica, sans-serif'
        }}>
            <h1 style={{  marginLeft: '20px', fontSize: '2rem', fontWeight: '550', fontFamily: "'Poppins', sans-serif", background: 'linear-gradient(to right, #3b82f6, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>          
                Name
            </h1>
      
            <nav style={{ display: 'flex', gap: '40px' }}>
                <a href="#" style={{ color: '#374151', textDecoration: 'none', fontSize: '1.0rem' }}>Home</a>
                <a href="#" style={{ color: '#374151', textDecoration: 'none', fontSize: '1.0rem' }}>Recommendations</a>
                <a href="#" style={{ color: '#374151', textDecoration: 'none', fontSize: '1.0rem' }}>Resume Analyzer</a>
            </nav>

            <div style={{ display: 'flex', gap: '5px', alignItems: 'left', marginRight: '15px' }}>
                <button style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}>
                    <Moon color="#374151" size={25} />
                </button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#fff', color: '#4285f4', border: '2px solid #4285f4',  borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s, color 0.3s' }}>Sign up</button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#fff', color: '#4285f4', border: '2px solid #4285f4',  borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s, color 0.3s' }}>Sign in</button>
            </div>
        </header>
    );
};

export default Header;