import React from 'react';

function JobsForYou() {
  return (
    <div style={{
      width: '400px', // Match Job Listings width
      minHeight: '550px', // Match Job Listings height
      overflowY: 'auto', // Allow scrolling if content overflows
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: 'white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
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
