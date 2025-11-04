
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Service } from '../types';
import { PlatformIcon, ServiceTypeIcon } from './PlatformIcon';
import { ArrowRight } from './icons';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300"
    >
      <Link to={`/service/${service.slug}`} className="block h-full flex flex-col">
        <div className="p-6 flex-grow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <PlatformIcon platform={service.platform} className="text-[#b8c0ff]" size={28} />
              <span className="text-lg font-bold text-[#2d2d2d]">{service.platform}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                <ServiceTypeIcon type={service.type} size={16} />
                <span>{service.type}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-[#2d2d2d] mb-2">{service.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
        </div>
        <div className="bg-gray-50 p-4 flex items-center justify-between border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">Starting from</span>
            <p className="text-xl font-bold text-[#2d2d2d]">${service.price_per_1000.toFixed(2)}
              <span className="text-sm font-normal text-gray-500">/1k</span>
            </p>
          </div>
          <div className="flex items-center text-[#b8c0ff] font-semibold">
            Order Now <ArrowRight className="ml-2" size={20} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
