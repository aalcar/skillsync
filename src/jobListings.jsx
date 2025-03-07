import React from 'react';

function JobCard({ title, company, location, jobType, payRate, skills, darkMode }) {
  return (
    <div style={{
      backgroundColor: darkMode ? '#2d3748' : 'white',  // Adjust for dark mode
      color: darkMode ? '#fff' : '#000',  // Text color for dark mode
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{title}</h3>

      <button style={{
        backgroundColor: darkMode ? "#9F67E0" : "#4285f4",
        color: darkMode ? "#1E1B29" : "#fff",
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}>
        Apply Now
      </button>

      <p style={{ margin: '10px 0', fontSize: '0.9em', color: darkMode ? '#fff' : '#555' }}><strong>{company}</strong></p>
      <p style={{ margin: '0', fontSize: '0.9em', color: darkMode ? '#fff' : '#555' }}>{location}</p>

      <p style={{
        backgroundColor: darkMode ? "white" : "#e0e0e0",
        color: darkMode ? "black" : "#fff",
        padding: '5px',
        borderRadius: '5px',
        display: 'inline-block',
        marginTop: '10px',
        fontSize: '0.85em'
      }}>
        {jobType}
      </p>

      <p style={{ margin: '5px 0', fontSize: '0.9em', color: darkMode ? '#fff' : '#555' }}><strong>Income:</strong> {payRate}</p>

      <div>
        <strong>Skills:</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
          {skills.map(skill => (
            <span key={skill} style={{
              backgroundColor: darkMode ? "#9F67E0" : "#4285f4",
              color: darkMode ? "#1E1B29" : "#fff",
              padding: '5px 8px',
              borderRadius: '5px',
              fontSize: '0.8em',
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <p style={{ marginTop: '10px', fontSize: '0.9em', color: darkMode ? '#fff' : '#555' }}><strong>Job Description</strong></p>
    </div>
  );
}

function JobListings({ darkMode }) {
  return (
    <div style={{
      width: '400px',
      height: '550px',
      overflowY: 'auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: darkMode ? '#1f2937' : 'white',  // Adjust for dark mode
      color: darkMode ? '#fff' : '#000',  // Text color for dark mode
      boxShadow: darkMode ? '0 4px 8px rgba(255, 255, 255, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.2)',
    }}>
      <h2 style={{ textAlign: 'left', margin: '10px', fontSize: '1.5em', fontWeight: 'bold' }}>Job Listings</h2>

      {/* Multiple Job Listings */}
      <JobCard
        title="Software Developer"
        company="Indeed"
        location="Davis, CA"
        jobType="Full - Time"
        payRate="$55 per hour"
        skills={["Java", "Python", "C++", "Django", "React", "API", "Git"]}
        darkMode={darkMode}
      />
      <JobCard
        title="Python Developer"
        company="LinkedIn"
        location="San Francisco, CA"
        jobType="Full - Time"
        payRate="$50 per hour"
        skills={["Python", "Flask", "Django", "SQL"]}
        darkMode={darkMode}
      />
      <JobCard
        title="Data Scientist"
        company="Google"
        location="Mountain View, CA"
        jobType="Full - Time"
        payRate="$60 per hour"
        skills={["Python", "Machine Learning", "TensorFlow", "SQL"]}
        darkMode={darkMode}
      />
      <JobCard
        title="Front-End Developer"
        company="Facebook"
        location="Menlo Park, CA"
        jobType="Full - Time"
        payRate="$55 per hour"
        skills={["JavaScript", "React", "CSS", "HTML", "Redux"]}
        darkMode={darkMode}
      />
      <JobCard
        title="Cybersecurity Engineer"
        company="Microsoft"
        location="Redmond, WA"
        jobType="Full - Time"
        payRate="$65 per hour"
        skills={["Security", "Penetration Testing", "Networking", "Python"]}
        darkMode={darkMode}
      />
    </div>
  );
}

export default JobListings;
