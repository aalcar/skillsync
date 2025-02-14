import React from 'react'
import PdfUploader from "/Users/Maya/Desktop/resume/src/PDFUploader.jsx";






const App = () => {
  const roles = ['Software Engineer', 'Web Developer', 'Mobile Developer', 'Game Developer', 'Blockchain Developer', 'Data Scientist', 'Data Engineer', 'ML Engineer', 'DevOps Engineer', 'Cloud Architect', 'Security Engineer']
  return (
    <div>
      <h1 style={{ backgroundColor: 'lightblue', color: 'darkblue' }}> Resume Analyzer </h1>
      <ul>
        {roles.map((role, index) => (
          <li key={index}> {role} </li>
        ))}
      </ul>

      <div className="flex justify-center items-center">
      <PdfUploader />
    </div>
    </div>
  )
}
export default App 
