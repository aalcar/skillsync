import React, { useState } from "react";
import Header from "./Header";
import JobSearchBar from "./JobSearchBar";
import JobsForYou from "./JobsForYou"; 

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.style.background = darkMode ? "#ffffff" : "#1f2937";
    document.body.style.color = darkMode ? "#000000" : "#f8f9fa";
  };

  return (
    <div>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      <main style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <JobSearchBar darkMode={darkMode} />
        <JobsForYou /> {}
      </main>
    </div>
  );
};

export default App;