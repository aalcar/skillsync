import React from "react";
import Header from "./Header";
import JobSearchBar from "./JobSearchBar";
import JobsForYou from "./JobsForYou";
import JobListings from "./JobListings";

const Dashboard = ({ darkMode, toggleTheme }) => {
  return (
    <div>
      {/* Keep Header and Search Bar Full Width */}
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <JobSearchBar darkMode={darkMode} />

      {/* Main Content: Align "Jobs for You" and "Job Listings" */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        marginTop: "30px",
      }}>
        {/* Left: Jobs for You */}
        <JobsForYou darkMode={darkMode} />

        {/* Right: Job Listings */}
        <JobListings darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Dashboard;
