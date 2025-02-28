import React from 'react';
import Header from "./Header";
import JobSearchBar from "./JobSearchBar";


const App = () => {
  const roles = ['Software Engineer', 'Web Developer', 'Mobile Developer', 'Game Developer', 'Blockchain Developer', 'Data Scientist', 'Data Engineer', 'ML Engineer', 'DevOps Engineer', 'Cloud Architect', 'Security Engineer']
  return (
    <div>
      <Header />

      <main>
        <JobSearchBar />
      </main>

    </div>
  )
}
export default App 
