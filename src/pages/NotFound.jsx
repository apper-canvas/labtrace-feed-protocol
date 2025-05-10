import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  const HomeIcon = getIcon('Home');
  const AlertIcon = getIcon('AlertTriangle');

  useEffect(() => {
    document.title = "404 - Page Not Found | LabTrace";
    return () => {
      document.title = "LabTrace | Modern Pathology Lab Services";
    };
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 dark:text-red-400">
            <AlertIcon size={40} />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-white mb-4">404</h1>
        
        <h2 className="text-xl md:text-2xl font-semibold text-surface-700 dark:text-surface-200 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline w-full sm:w-auto"
          >
            Go Back
          </button>
          
          <Link to="/" className="btn btn-primary w-full sm:w-auto">
            <HomeIcon size={18} className="mr-2" />
            Go to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;