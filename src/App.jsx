import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RecommenderPage from "./RecommenderPage";
import ProfilePage from "./ProfilePage";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Apply dark mode to the document body
  useEffect(() => {
    document.body.style.background = darkMode ? "#1f2937" : "#ffffff";
    document.body.style.color = darkMode ? "#f8f9fa" : "#000000";
  }, [darkMode]);

  return (
      <Router>
        <main style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/jobs" element={<Dashboard darkMode={darkMode} toggleTheme={toggleTheme} />} />
              <Route path="/recommendations" element={<RecommenderPage darkMode={darkMode} toggleTheme={toggleTheme} />} />
              <Route path="/profile" element={<ProfilePage darkMode={darkMode} toggleTheme={toggleTheme} />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </main>
      </Router>
    );
};

export default App;
