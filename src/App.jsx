import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Page components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

// Route components
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Utils and store
import { setUser, clearUser } from './store/slices/userSlice';
import getIcon from './utils/iconUtils';

// Create authentication context
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  // Initialize ApperUI once when the app loads
  useEffect(() => {
    try {
      const { ApperClient, ApperUI } = window.ApperSDK;
      const client = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Initialize but don't show login yet
      ApperUI.setup(client, {
        target: '#authentication',
        clientId: import.meta.env.VITE_APPER_PROJECT_ID,
        view: 'both',
        onSuccess: function(user) {
          // Store user data in Redux store
          let currentPath = window.location.pathname + window.location.search;
          if (user && user.isAuthenticated) {
            dispatch(setUser(user));
            
            // If user was on login or signup, redirect to home
            if (currentPath.includes('login') || currentPath.includes('signup')) {
              navigate('/');
            }
          } else if (!currentPath.includes('login')) {
            navigate(currentPath);
          } else {
            navigate('/login');
          }
        },
        onError: function(error) {
          console.error("Authentication failed:", error);
          toast.error("Authentication failed. Please try again.");
        }
      });
      
      setIsInitialized(true);
    } catch (error) {
      console.error("Error initializing ApperUI:", error);
      toast.error("Failed to initialize authentication. Please refresh the page.");
    }
  }, [dispatch, navigate]);
  
  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
        toast.success("Logged out successfully");
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');

  // Don't render protected content until auth is initialized
  const isLoading = !isInitialized;

  return (
    <AuthContext.Provider value={authMethods}>
      <div className="min-h-screen transition-colors duration-200">
        <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-primary font-bold text-xl">LabTrace</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <button
                  onClick={authMethods.logout}
                  className="text-sm font-medium text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light"
                >
                  Logout
                </button>
              )}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </button>
            </div>
          </div>
        </header>
      
        <main className="container mx-auto px-4 py-6">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-3 text-lg text-surface-600 dark:text-surface-400">Initializing application...</span>
            </div>
          ) : (
            <Routes>
              {/* Public routes - accessible only when NOT authenticated */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              
              {/* Protected routes - require authentication */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home darkMode={darkMode} />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </main>
      
        <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
          <div className="container mx-auto px-4">
            <div className="text-center text-surface-500 dark:text-surface-400 text-sm">
              © {new Date().getFullYear()} LabTrace. All rights reserved.
            </div>
          </div>
        </footer>
      
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
          toastClassName="rounded-xl"
        />
        
        {/* Hidden div for ApperUI authentication */}
        <div id="authentication" className="hidden"></div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;