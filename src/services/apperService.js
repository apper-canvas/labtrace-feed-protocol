/**
 * Function to get an initialized ApperClient instance
 * This is a singleton pattern to avoid multiple initializations
 * @returns {Object} ApperClient instance
 */
export const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  
  // Create a new ApperClient instance with the project ID and public key
  const apperClient = new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
  
  return apperClient;
};

export default {
  getApperClient
};