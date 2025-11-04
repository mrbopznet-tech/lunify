
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getServices } from '../services/api';
import { Service, Platform, ServiceType } from '../types';
import ServiceCard from '../components/ServiceCard';
import { Loader2 } from '../components/icons';
import { PlatformIcon } from '../components/PlatformIcon';

const allPlatforms = Object.values(Platform);
const allTypes = Object.values(ServiceType);

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

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPlatform = searchParams.get('platform') as Platform | null;
  const selectedType = searchParams.get('type') as ServiceType | null;

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const filters = {
        platform: selectedPlatform || undefined,
        type: selectedType || undefined,
      };
      const data = await getServices(filters);
      setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, [selectedPlatform, selectedType]);
  
  const handleFilterChange = (key: string, value: string | null) => {
    setSearchParams(prev => {
        if (value === null) {
            prev.delete(key);
        } else {
            prev.set(key, value);
        }
        return prev;
    })
  }

  const filteredServices = useMemo(() => {
    return services;
  }, [services]);

  return (
    <PageWrapper>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#2d2d2d] mb-2">Our Services</h1>
        <p className="text-lg text-gray-600">Find the perfect service to match your needs.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-8 sticky top-24 z-40">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex-1">
                <label className="text-sm font-semibold text-gray-500 mb-2 block">Platform</label>
                 <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleFilterChange('platform', null)} className={`px-4 py-2 text-sm rounded-full border transition-colors ${!selectedPlatform ? 'bg-[#b8c0ff] text-white border-[#b8c0ff]' : 'bg-white hover:border-gray-400'}`}>All</button>
                    {allPlatforms.map(p => (
                        <button key={p} onClick={() => handleFilterChange('platform', p)} className={`px-4 py-2 text-sm rounded-full border transition-colors flex items-center gap-2 ${selectedPlatform === p ? 'bg-[#b8c0ff] text-white border-[#b8c0ff]' : 'bg-white hover:border-gray-400'}`}>
                           <PlatformIcon platform={p} size={16} /> {p}
                        </button>
                    ))}
                </div>
            </div>
             <div className="flex-1">
                <label className="text-sm font-semibold text-gray-500 mb-2 block">Service Type</label>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleFilterChange('type', null)} className={`px-4 py-2 text-sm rounded-full border transition-colors ${!selectedType ? 'bg-[#b8c0ff] text-white border-[#b8c0ff]' : 'bg-white hover:border-gray-400'}`}>All</button>
                    {allTypes.map(t => (
                        <button key={t} onClick={() => handleFilterChange('type', t)} className={`px-4 py-2 text-sm rounded-full border transition-colors ${selectedType === t ? 'bg-[#b8c0ff] text-white border-[#b8c0ff]' : 'bg-white hover:border-gray-400'}`}>{t}</button>
                    ))}
                </div>
            </div>
        </div>
      </div>


      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-[#b8c0ff]" size={48} />
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
            {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                <motion.div layout key={service.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ServiceCard service={service} />
                </motion.div>
                ))
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:col-span-2 lg:col-span-3 text-center py-16">
                    <h3 className="text-2xl font-semibold">No Services Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
      )}
    </PageWrapper>
  );
};

export default ServicesPage;
