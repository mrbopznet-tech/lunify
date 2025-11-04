
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Lunivefy.store. All rights reserved.</p>
        <p className="text-sm mt-1">Your trusted Social Media Booster Panel.</p>
      </div>
    </footer>
  );
};

export default Footer;
