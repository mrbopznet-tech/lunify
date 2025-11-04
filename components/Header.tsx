
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-lg font-medium transition-colors ${
      isActive ? 'text-[#b8c0ff]' : 'text-gray-600 hover:text-[#b8c0ff]'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block py-2 px-4 text-lg rounded-md ${
      isActive ? 'bg-[#b8c0ff] text-white' : 'text-gray-600 hover:bg-gray-100'
    }`;
  
  const navItems = [
    { to: '/', text: 'Home' },
    { to: '/services', text: 'Services' },
    { to: '/order', text: 'Track Order' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#b8c0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#b8c0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#b8c0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span className="text-2xl font-bold text-[#2d2d2d]">Lunivefy</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
                 <NavLink key={item.to} to={item.to} className={navLinkClasses}>
                    {item.text}
                 </NavLink>
            ))}
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-[#b8c0ff]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t"
        >
          {navItems.map(item => (
                 <NavLink key={item.to} to={item.to} className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
                    {item.text}
                 </NavLink>
            ))}
        </motion.div>
      )}
    </header>
  );
};

export default Header;
