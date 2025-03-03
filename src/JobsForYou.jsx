import React from 'react';

function JobListing({ title, company, location, payRate, type, matchPercentage }) {
  return (
    <div style={{
      borderBottom: '1px solid #ccc',
      padding: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <h3 style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '0.9em', color: '#555' }}>{company}</p>
        <p style={{ margin: 0, fontSize: '0.9em', color: '#555' }}>{location}</p>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
          <span style={{
            backgroundColor: '#f0f0f0',
            padding: '2px 5px',
            borderRadius: '4px',
            marginRight: '5px',
            fontSize: '0.8em'
          }}>
            $ per hour
          </span>
          <span style={{
            backgroundColor: '#f0f0f0',
            padding: '2px 5px',
            borderRadius: '4px',
            fontSize: '0.8em'
          }}>
            {type}
          </span>
        </div>
      </div>
      <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#5c98c7', marginLeft: '20px' }}>
        {matchPercentage}
      </div>
    </div>
  );
}

function JobsForYou() {
  return (
    <div style={{
      width: '400px', // Adjusted width to better fit the example image
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '10px',
      backgroundColor: 'white',
    }}>
      <h2 style={{ textAlign: 'left', margin: '10px', fontSize: '1.5em', fontWeight: 'bold' }}>Jobs for you</h2>
      <JobListing
        title="Software Developer"
        company="Indeed"
        location="Davis, CA"
        payRate="$ per hour"
        type="Full - Time"
        matchPercentage="95%"
      />
      <JobListing
        title="Python Developer"
        company="LinkedIn"
        location="Davis, CA"
        payRate="$ per hour"
        type="Full - Time"
        matchPercentage="90%"
      />
      <JobListing
        title="Data Scientist"
        company="Indeed"
        location="Davis, CA"
        payRate="$ per hour"
        type="Full - Time"
        matchPercentage="89%"
      />
      <JobListing
        title="UX/UI Designer"
        company="Indeed"
        location="Davis, CA"
        payRate="$ per hour"
        type="Full - Time"
        matchPercentage="78%"
      />
    </div>
  );
}

export default JobsForYou;