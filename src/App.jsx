import React from 'react'
import PdfUploader from "C:/Users/hiral/OneDrive/Desktop/GDSC App/frontend/src/PDFUploader.jsx";
import { Moon } from 'lucide-react';

const App = () => {
  const roles = ['Software Engineer', 'Web Developer', 'Mobile Developer', 'Game Developer', 'Blockchain Developer', 'Data Scientist', 'Data Engineer', 'ML Engineer', 'DevOps Engineer', 'Cloud Architect', 'Security Engineer']
  return (
    <div>
      <header style={{
        background: 'rgb(255, 255, 255)', 
        color: '#f8f9fa', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Helvetica, sans-serif'
      }}>
        <h1 style={{  marginLeft: '20px', fontSize: '2rem', fontWeight: '550', fontFamily: "'Poppins', sans-serif", background: 'linear-gradient(to right, #3b82f6, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>          
          Name
        </h1>
      
        <nav style={{ display: 'flex', gap: '40px' }}>
          <a href="#" style={{ color: '#374151', textDecoration: 'none', fontSize: '1.0rem' }}>Home</a>
          <a href="#" style={{ color: '#374151', textDecoration: 'none', fontSize: '1.0rem' }}>Recommendations</a>
          <a href="#" style={{ color: '#374151', textDecoration: 'none', fontSize: '1.0rem' }}>Resume Analyzer</a>
        </nav>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'left' }}>
          <button style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#ffffff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <Moon color="#374151" size={25} />
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Sign Up
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Sign In
          </button>
        </div>
      </header>

      {/*<div className="flex justify-center items-center mt-6">
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-1/3">
            <input type="text" placeholder="Job title, keywords, or company" className="w-full outline-none text-gray-600" />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 ml-3 w-1/5">
            <option>Job Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Remote</option>
          </select>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 ml-3 w-1/3">
            <input type="text" placeholder="Location" className="w-full outline-none text-gray-600" />
          </div>
          <button className="ml-3 px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-black bg-white hover:bg-gray-100 flex items-center">
          Upload your resume here
        </button>
      </div>*/}

      <ul style={{ marginTop: '20px', paddingLeft: '20px' }}>
        {roles.map((role, index) => (
          <li key={index} style={{ fontSize: '1.2rem', padding: '10px 0' }}>
            {role}
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center">
        <PdfUploader />
      </div>
    </div>
  )
}
export default App 
