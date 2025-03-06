import React from "react";
import Header from "./Header";
import JobSearchBar from "./JobSearchBar";
import JobsForYou from "./JobsForYou";
import JobListings from "./jobListings";

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
        alignItems: "flex-start", // Align at the same height
        gap: "40px", // Space between the boxes
        marginTop: "30px", // Adjusts space below search bar
      }}>
        {/* Left: Jobs for You */}
        <JobsForYou />

        {/* Right: Job Listings */}
        <JobListings />
      </div>
    </div>
  );
};

export default Dashboard;
