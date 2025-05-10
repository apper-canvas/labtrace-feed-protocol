import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

/**
 * 404 Not Found page component
 */
function NotFound() {
  const ArrowLeftIcon = getIcon('ArrowLeft');
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-primary dark:text-primary-light">404</h1>
        <div className="w-24 h-1 bg-primary dark:bg-primary-light mx-auto my-6"></div>
        <h2 className="text-3xl font-bold text-surface-800 dark:text-surface-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
      </div>
      
      <Link 
        to="/" 
        className="flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
      >
        <ArrowLeftIcon className="mr-2" size={18} />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;