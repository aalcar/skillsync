import React from 'react';

function JobsForYou({ darkMode }) {
  return (
    <div style={{
      width: '400px',
      minHeight: '550px',
      overflowY: 'auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: darkMode ? '#1f2937' : 'white',  // Adjust for dark mode
      color: darkMode ? '#fff' : '#000',  // Text color for dark mode
      boxShadow: darkMode ? '0 4px 8px rgba(255, 255, 255, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.2)',
    }}>
      <h2 style={{ textAlign: 'left', margin: '10px', fontSize: '1.5em', fontWeight: 'bold' }}>Jobs for You</h2>

      {/* Example Job Listings */}
      <div style={{ paddingBottom: "10px" }}>
        <p><strong>Software Developer</strong></p>
        <p>Indeed - Davis, CA</p>
        <p>Full - Time</p>
      </div>
      <div style={{ paddingBottom: "10px" }}>
        <p><strong>Python Developer</strong></p>
        <p>LinkedIn - San Francisco, CA</p>
        <p>Full - Time</p>
      </div>
      <div style={{ paddingBottom: "10px" }}>
        <p><strong>Data Scientist</strong></p>
        <p>Google - Mountain View, CA</p>
        <p>Full - Time</p>
      </div>
      <div style={{ paddingBottom: "10px" }}>
        <p><strong>UX/UI Designer</strong></p>
        <p>Indeed - Davis, CA</p>
        <p>Full - Time</p>
      </div>
    </div>
  );
}

export default JobsForYou;
