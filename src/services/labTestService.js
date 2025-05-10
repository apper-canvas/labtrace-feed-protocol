import { getApperClient } from './apperService';

// Table name from the database
const TABLE_NAME = 'lab_test';

/**
 * Fetch lab tests with optional filtering
 * @param {Object} options - Filter options
 * @param {string} options.category - Category filter
 * @param {string} options.search - Search term
 * @param {number} options.limit - Results limit
 * @param {number} options.offset - Results offset for pagination
 * @returns {Promise<Array>} - Lab tests array
 */
export const fetchLabTests = async (options = {}) => {
  try {
    const apperClient = getApperClient();
    const { category, search, limit = 20, offset = 0 } = options;
    
    // Create filter conditions
    const whereConditions = [];
    
    // Add IsDeleted = false filter
    whereConditions.push({ field: "IsDeleted", operator: "equals", value: false });
    
    // Add category filter if provided
    if (category && category !== 'all') {
      whereConditions.push({ field: "category", operator: "equals", value: category });
    }
    
    // Add search filter if provided
    if (search) {
      whereConditions.push({ field: "Name", operator: "contains", value: search });
    }
    
    const params = {
      fields: ["Id", "Name", "description", "category", "price", "turnaroundTime", "image"],
      where: whereConditions,
      orderBy: [{ field: "Name", direction: "asc" }],
      pagingInfo: { limit, offset }
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching lab tests:", error);
    throw error;
  }
};

/**
 * Get a lab test by ID
 * @param {number} id - Lab test ID
 * @returns {Promise<Object>} - Lab test object
 */
export const getLabTestById = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: ["Id", "Name", "description", "category", "price", "turnaroundTime", "image"]
    };
    
    const response = await apperClient.getRecordById(TABLE_NAME, id, params);
    return response?.data || null;
  } catch (error) {
    console.error(`Error fetching lab test with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new lab test
 * @param {Object} labTest - Lab test data
 * @returns {Promise<Object>} - Created lab test
 */
export const createLabTest = async (labTest) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [labTest]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (response?.success && response?.results?.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error("Failed to create lab test");
  } catch (error) {
    console.error("Error creating lab test:", error);
    throw error;
  }
};

/**
 * Update an existing lab test
 * @param {Object} labTest - Lab test data with Id
 * @returns {Promise<Object>} - Updated lab test
 */
export const updateLabTest = async (labTest) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [labTest]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (response?.success && response?.results?.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error("Failed to update lab test");
  } catch (error) {
    console.error("Error updating lab test:", error);
    throw error;
  }
};

export default {
  fetchLabTests,
  getLabTestById,
  createLabTest,
  updateLabTest
};