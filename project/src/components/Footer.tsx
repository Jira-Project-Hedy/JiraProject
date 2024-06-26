import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white', padding: '10px 0', textAlign: 'center' }}>
      <div className="container mx-auto">
        <p className="text-sm">
          © 2024 Project Hedy
        </p>
        <p className="text-sm">
          <a href="https://github.com/Jira-Project-Hedy/JiraProject" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">GitHub Repository</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
