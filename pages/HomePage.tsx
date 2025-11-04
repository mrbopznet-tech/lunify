
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Platform } from '../types';
import { PlatformIcon } from '../components/PlatformIcon';
import { ArrowRight } from '../components/icons';

const platforms = [
  { name: Platform.Instagram, color: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]' },
  { name: Platform.TikTok, color: 'from-[#00f2ea] to-[#ff0050]' },
  { name: Platform.YouTube, color: 'from-[#ff0000] to-[#c4302b]' },
  { name: Platform.X, color: 'from-[#1DA1F2] to-[#14171A]' },
  { name: Platform.Facebook, color: 'from-[#1877F2] to-[#3b5998]' },
  { name: Platform.Telegram, color: 'from-[#0088cc] to-[#29a9ea]' },
];

const MotionLink = motion(Link);

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      <div className="text-center py-16 md:py-24">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold text-[#2d2d2d] mb-4"
        >
          Amplify Your Social Presence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Instant, reliable, and high-quality social media services to boost your growth. Get started in seconds.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/services"
            className="inline-block bg-gradient-to-r from-[#b8c0ff] to-[#a0aaff] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300"
          >
            Browse Services
          </Link>
        </motion.div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Choose Your Platform</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {platforms.map((platform, index) => (
            <MotionLink
              key={platform.name}
              to={`/services?platform=${platform.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className={`block p-6 rounded-xl text-white font-bold text-xl text-center bg-gradient-to-br ${platform.color} shadow-lg hover:shadow-2xl transition-shadow duration-300`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <PlatformIcon platform={platform.name} size={40} className="mb-3" />
                <span>{platform.name}</span>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
