import React from "react";
import Header from "./Header";
import JobSearchBar from "./JobSearchBar";

const Dashboard = ({ darkMode, toggleTheme }) => {
  return (
    <div>
      {/* Keep Header and Search Bar Full Width */}
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <JobSearchBar darkMode={darkMode} />
    </div>
  );
};

export default Dashboard;