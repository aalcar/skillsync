import React from 'react';

function JobCard({ title, company, location, jobType, payRate, skills }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{title}</h3>

      <button style={{
        backgroundColor: '#3b5998',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}>
        Apply Now
      </button>

      <p style={{ margin: '10px 0', fontSize: '0.9em', color: '#555' }}><strong>{company}</strong></p>
      <p style={{ margin: '0', fontSize: '0.9em', color: '#555' }}>{location}</p>

      <p style={{
        backgroundColor: '#e0e0e0',
        padding: '5px',
        borderRadius: '5px',
        display: 'inline-block',
        marginTop: '10px',
        fontSize: '0.85em'
      }}>
        {jobType}
      </p>

      <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#555' }}><strong>Income:</strong> {payRate}</p>

      <div>
        <strong>Skills:</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
          {skills.map(skill => (
            <span key={skill} style={{
              backgroundColor: '#3b5998',
              color: 'white',
              padding: '5px 8px',
              borderRadius: '5px',
              fontSize: '0.8em',
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#555' }}><strong>Job Description</strong></p>
    </div>
  );
}

function JobListings() {
  return (
    <div style={{
      width: '400px', // Match "Jobs for You" box width
      height: '550px', // Match expected height
      overflowY: 'auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: 'white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
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
      />
      <JobCard
        title="Python Developer"
        company="LinkedIn"
        location="San Francisco, CA"
        jobType="Full - Time"
        payRate="$50 per hour"
        skills={["Python", "Flask", "Django", "SQL"]}
      />
      <JobCard
        title="Data Scientist"
        company="Google"
        location="Mountain View, CA"
        jobType="Full - Time"
        payRate="$60 per hour"
        skills={["Python", "Machine Learning", "TensorFlow", "SQL"]}
      />
      <JobCard
        title="Front-End Developer"
        company="Facebook"
        location="Menlo Park, CA"
        jobType="Full - Time"
        payRate="$55 per hour"
        skills={["JavaScript", "React", "CSS", "HTML", "Redux"]}
      />
      <JobCard
        title="Cybersecurity Engineer"
        company="Microsoft"
        location="Redmond, WA"
        jobType="Full - Time"
        payRate="$65 per hour"
        skills={["Security", "Penetration Testing", "Networking", "Python"]}
      />
    </div>
  );
}

export default JobListings;
