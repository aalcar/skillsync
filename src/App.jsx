import React from 'react'

const App = () => {
  const roles = ['Software Engineer', 'Web Developer', 'Mobile Developer', 'Game Developer', 'Blockchain Developer', 'Data Scientist', 'Data Engineer', 'ML Engineer', 'DevOps Engineer', 'Cloud Architect', 'Security Engineer']
  return (
    <div>
      <h1> Resume Analyzer </h1>
      <ul>
        {roles.map((role, index) => (
          <li key={index}> {role} </li>
        ))}
      </ul>
    </div>
  )
}

export default App
