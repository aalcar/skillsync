import React, { useState } from "react";
import PdfUploader from "./PDFUploader.jsx";

function JobSearchForm({ darkMode }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [jobResults, setJobResults] = useState([]);

  return (
    <form>
      <div style={{ 
          display: 'flex', 
          gap: '10px', 
          padding: '20px',
          marginTop: '50px',
          backgroundColor: darkMode ? "#1f2937" : "#fff", 
          borderRadius: '5px', 
          boxShadow: darkMode ? "0 1px 3px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(255, 255, 255, 0.24)" : "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      }}>
        <select style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', flex: '1' }}>
          <option value="">Job title, keywords, or company</option>
          <option value="Software Developer/Engineer">Software Developer/Engineer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="Systems Administrator">Systems Administrator</option>
          <option value="Network Engineer">Network Engineer</option>
          <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
          <option value="Cloud Architect">Cloud Architect</option>
          <option value="Artificial Intelligence Engineer">Artificial Intelligence Engineer</option>
          <option value="Software Tester">Software Tester</option>
          <option value="Database Administrator">Database Administrator</option>
          <option value="App Developer">App Developer</option>
          <option value="UX/UI Designer">UX/UI Designer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Product Manager">Product Manager</option>
        </select>  
        <select style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', flex: '0.5' }}>
          <option value="">Job Type</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="temporary">Temporary</option>
          <option value="internship">Internship</option>
        </select>                          
        <input type="text" placeholder="Location (eg. Davis, CA)" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', flex: '1' }} />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: darkMode ? "#9F67E0" : "#4285f4", color: darkMode ? "#1E1B29" : "#fff", border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Search</button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <button style={{ border: 'none', background: 'none', color: darkMode ? "#9F67E0" : "#4285f4", cursor: 'pointer', fontSize:'11px' }}>
          <PdfUploader />
        </button>
      </div>

    </form>
  );
}

export default JobSearchForm;
