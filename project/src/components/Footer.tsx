import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '3px 0' }}>
      <div className="container mx-auto px-5 h-[50px]">
        <div className="flex items-center h-full flex-col lg:flex-row items-center justify-center lg:pl-4">
          <p className='text-xs lg:text-lg'>
            <Link
              className='font-extralight hover:text-blue'
              href="https://github.com/Jira-Project-Hedy/JiraProject" 
              target='_blank'
            >© 2024 Project Hedy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;