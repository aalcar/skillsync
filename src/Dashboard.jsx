import React from "react";
import Header from "./Header";
import JobSearchBar from "./JobSearchBar";
import JobsForYou from "./JobsForYou";

const Dashboard = ({ darkMode, toggleTheme }) => {
  return (
    <div>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <JobSearchBar darkMode={darkMode} />
      <JobsForYou darkMode={darkMode} /> {}
    </div>
  );
};

export default Dashboard;
