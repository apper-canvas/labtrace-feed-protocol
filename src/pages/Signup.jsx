import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

/**
 * Signup page component
 * Uses ApperUI for authentication
 */
function Signup() {
  const { isInitialized } = useContext(AuthContext);

  useEffect(() => {
    if (isInitialized) {
      // Show signup UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showSignup("#authentication");
    }
  }, [isInitialized]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md space-y-8 p-6 bg-white dark:bg-surface-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-surface-800 dark:text-surface-100">Create Account</h1>
          <p className="mt-2 text-surface-600 dark:text-surface-400">Sign up for your account</p>
        </div>
        {/* The ApperUI will render the signup form in this div */}
        <div id="authentication" className="min-h-[400px]"></div>
        <div className="text-center mt-4">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
              Sign in
            </Link>
          </p>
        </div>
        
        {/* Information about the application */}
        <div className="mt-8 pt-8 border-t border-surface-200 dark:border-surface-700">
          <div className="text-center text-sm text-surface-500 dark:text-surface-400">
            <p className="mb-2 font-medium">Join LabTrace Today</p>
            <p>
              Create an account to book lab tests, view your results online, and manage 
              your health with our state-of-the-art pathology services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;