import React, { useState } from "react";
import PdfUploader from "./PDFUploader.jsx";

function JobSearchForm({ darkMode }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [jobResults, setJobResults] = useState([]);
  const [resumeKeywords, setResumeKeywords] = useState(new Set());

  const computeMatch = (jobs, keywordsSet) => {
    return jobs.map((job) => {
      const keywords = job.technical_keywords || [];
      const matched = keywords.filter((kw) => keywordsSet.has(kw));
      const percent =
        keywords.length > 0
          ? ((matched.length / keywords.length) * 100).toFixed(2)
          : 0;
      return { ...job, match_percent: percent };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: jobTitle,
          job_type: jobType,
          location: location,
        }),
      });
      const data = await response.json();
      if (data.data) {
        const updatedJobs = resumeKeywords.size
          ? computeMatch(data.data, resumeKeywords)
          : data.data;
        setJobResults(updatedJobs);
      } else {
        alert(data.error || "No jobs found");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch jobs");
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const keywordSet = new Set(data.keywords.map(([k]) => k));
      setResumeKeywords(keywordSet);
      setJobResults((prev) => computeMatch(prev, keywordSet));
    } catch (error) {
      console.error("Resume upload failed:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            padding: "20px",
            marginTop: "50px",
            backgroundColor: darkMode ? "#1f2937" : "#fff",
            borderRadius: "5px",
            boxShadow: darkMode
              ? "0 1px 3px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(255, 255, 255, 0.24)"
              : "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          }}
        >
          <select
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              flex: "1",
            }}
          >
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

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              flex: "0.5",
            }}
          >
            <option value="">Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
            <option value="internship">Internship</option>
          </select>

          <input
            type="text"
            placeholder="Location (eg. Davis, CA)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              flex: "1",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: darkMode ? "#9F67E0" : "#4285f4",
              color: darkMode ? "#1E1B29" : "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button
            style={{
              border: "none",
              background: "none",
              color: darkMode ? "#9F67E0" : "#4285f4",
              cursor: "pointer",
              fontSize: "11px",
            }}
          >
            <PdfUploader onUpload={handleUpload} />
          </button>
        </div>
      </form>

      {jobResults.length > 0 && (
        <div style={{ padding: "20px" }}>
          <h3 style={{ color: darkMode ? "#fff" : "#000" }}>Jobs for you</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: darkMode ? "#374151" : "#e2e8f0" }}>
                <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Title</th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Company</th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Location</th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Apply Link</th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Match %</th>
              </tr>
            </thead>
            <tbody>
              {[...jobResults]
                .sort((a, b) => parseFloat(b.match_percent) - parseFloat(a.match_percent))
                .map((job, index) => (
                  <tr key={index}>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>{job.title}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>{job.company}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>{job.location}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
                      <a
                        href={job.job_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          padding: "8px 16px",
                          backgroundColor: darkMode ? "#9F67E0" : "#4285f4",
                          color: darkMode ? "#1E1B29" : "#fff",
                          borderRadius: "12px",
                          fontWeight: "600",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          transition: "all 0.2s ease-in-out",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        Apply
                      </a>
                    </td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
                      {job.match_percent !== undefined ? `${job.match_percent}%` : "—"}
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default JobSearchForm;
