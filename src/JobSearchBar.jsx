import React from 'react';
import PdfUploader from "./PDFUploader.jsx";

function JobSearchForm() {
  return (
    <form>
        
      <div style={{ display: 'flex', gap: '10px', padding: '20px', marginTop: '50px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
        <input type="text" placeholder="Job title, keywords, or company" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', flex: '1' }} />
        <select style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', flex: '0.5' }}>
          <option value="">Job Type</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="temporary">Temporary</option>
          <option value="internship">Internship</option>
        </select>                          
        <input type="text" placeholder="Location" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', flex: '1' }} />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4285f4', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Search</button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <button style={{ border: 'none', background: 'none', color: '#4285f4', cursor: 'pointer', fontSize:'11px' }}>
          <PdfUploader />
        </button>
      </div>

    </form>
  );
}

export default JobSearchForm;
