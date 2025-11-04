
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20"
    >
      <h1 className="text-9xl font-extrabold text-[#b8c0ff]">404</h1>
      <h2 className="text-4xl font-bold text-[#2d2d2d] mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block bg-gradient-to-r from-[#b8c0ff] to-[#a0aaff] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300"
      >
        Go Back Home
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
