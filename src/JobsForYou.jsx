import React from 'react';

function JobListing({ title, company, location, payRate, type, matchPercentage, darkMode }) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${darkMode ? '#5A4B81' : '#ccc'}`, 
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: darkMode ? '#E0CFF2' : '#000000', 
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '0.9em', color: darkMode ? '#BFA3D4' : '#555' }}>{company}</p>
        <p style={{ margin: 0, fontSize: '0.9em', color: darkMode ? '#BFA3D4' : '#555' }}>{location}</p>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
          <span
            style={{
              backgroundColor: darkMode ? '#5A4B81' : '#f0f0f0',
              padding: '2px 5px',
              borderRadius: '4px',
              marginRight: '5px',
              fontSize: '0.8em',
              color: darkMode ? '#E0CFF2' : '#000000',
            }}
          >
            $ per hour
          </span>
          <span
            style={{
              backgroundColor: darkMode ? '#5A4B81' : '#f0f0f0',
              padding: '2px 5px',
              borderRadius: '4px',
              fontSize: '0.8em',
              color: darkMode ? '#E0CFF2' : '#000000',
            }}
          >
            {type}
          </span>
        </div>
      </div>
      {/* Match Percentage */}
      <div
        style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          color: darkMode ? '#C084FC' : '#5c98c7', 
          marginLeft: '20px',
        }}
      >
        {matchPercentage}
      </div>
    </div>
  );
}

function JobsForYou({ darkMode }) {
  return (
    <div
      style={{
        width: '400px',
        border: `1px solid ${darkMode ? '#5A4B81' : '#ccc'}`, 
        borderRadius: '8px',
        boxShadow: `0 2px 4px ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        padding: '10px',
        backgroundColor: darkMode ? '#1E1B29' : 'white', 
        color: darkMode ? '#E0CFF2' : '#000000', 
      }}
    >
      <h2
        style={{
          textAlign: 'left',
          margin: '10px',
          fontSize: '1.5em',
          fontWeight: 'bold',
          color: darkMode ? '#C084FC' : '#000000', 
        }}
      >
        Jobs for you
      </h2>
      {/* Job Listings */}
      <JobListing
        title="Software Developer"
        company="Indeed"
        location="Davis, CA"
        payRate="$ per hour"
        type="Full - Time"
        matchPercentage="95%"
        darkMode={darkMode}
      />
      <JobListing
        title="Python Developer"
        company="LinkedIn"
        location="Davis, CA"
        payRate="$ per hour"
        type="Full - Time"
        matchPercentage="90%"
        darkMode={darkMode}
      />
      <JobListing
        title="Data Scientist"
        company="Indeed"
        location="Davis, CA"
        payRate="$ per hour"
        type="Full - Time"
        matchPercentage="89%"
        darkMode={darkMode}
      />
      <JobListing
        title="UX/UI Designer"
        company="Indeed"
        location="Davis, CA"
        payRate="$ per hour"
        type="Full - Time"
        matchPercentage="78%"
        darkMode={darkMode}
      />
    </div>
  );
}

export default JobsForYou;
