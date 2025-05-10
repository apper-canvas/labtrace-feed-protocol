import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

/**
 * Login page component
 * Uses ApperUI for authentication
 */
function Login() {
  const { isInitialized } = useContext(AuthContext);

  useEffect(() => {
    if (isInitialized) {
      // Show login UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showLogin("#authentication");
    }
  }, [isInitialized]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md space-y-8 p-6 bg-white dark:bg-surface-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-surface-800 dark:text-surface-100">Welcome Back</h1>
          <p className="mt-2 text-surface-600 dark:text-surface-400">Sign in to your account</p>
        </div>
        {/* The ApperUI will render the login form in this div */}
        <div id="authentication" className="min-h-[400px]"></div>
        <div className="text-center mt-4">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary-dark">
              Sign up
            </Link>
          </p>
        </div>
        
        {/* Information about the application */}
        <div className="mt-8 pt-8 border-t border-surface-200 dark:border-surface-700">
          <div className="text-center text-sm text-surface-500 dark:text-surface-400">
            <p className="mb-2 font-medium">LabTrace - Modern Pathology Lab Services</p>
            <p>
              Book lab tests online, view results, and manage your health with our 
              comprehensive pathology services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;