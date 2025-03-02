import React, { useState } from "react";
import Header from "./Header";
import JobSearchBar from "./JobSearchBar";


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

      <main>
        <JobSearchBar darkMode={darkMode} />
      </main>
    </div>
  )
}
export default App 
