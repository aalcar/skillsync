import React from "react";

function JobsForYou({ jobResults = [], darkMode }) {
  if (jobResults.length === 0) return null;

  return (
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
          {jobResults.map((job, index) => (
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
  );
}

export default JobsForYou;
