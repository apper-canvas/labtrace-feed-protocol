import { getApperClient } from './apperService';

// Table name from the database
const TABLE_NAME = 'combo_package';

/**
 * Fetch combo packages with optional filtering
 * @param {Object} options - Filter options
 * @param {string} options.search - Search term
 * @param {number} options.limit - Results limit
 * @param {number} options.offset - Results offset for pagination
 * @returns {Promise<Array>} - Combo packages array
 */
export const fetchComboPackages = async (options = {}) => {
  try {
    const apperClient = getApperClient();
    const { search, limit = 20, offset = 0 } = options;
    
    // Create filter conditions
    const whereConditions = [];
    
    // Add IsDeleted = false filter
    whereConditions.push({ field: "IsDeleted", operator: "equals", value: false });
    
    // Add search filter if provided
    if (search) {
      whereConditions.push({ field: "Name", operator: "contains", value: search });
    }
    
    const params = {
      fields: [
        "Id", "Name", "description", "price", "originalPrice", 
        "discountPercentage", "tests", "image"
      ],
      where: whereConditions,
      orderBy: [{ field: "Name", direction: "asc" }],
      pagingInfo: { limit, offset }
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching combo packages:", error);
    throw error;
  }
};

/**
 * Get a combo package by ID
 * @param {number} id - Combo package ID
 * @returns {Promise<Object>} - Combo package object
 */
export const getComboPackageById = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: [
        "Id", "Name", "description", "price", "originalPrice", 
        "discountPercentage", "tests", "image"
      ]
    };
    
    const response = await apperClient.getRecordById(TABLE_NAME, id, params);
    return response?.data || null;
  } catch (error) {
    console.error(`Error fetching combo package with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new combo package
 * @param {Object} comboPackage - Combo package data
 * @returns {Promise<Object>} - Created combo package
 */
export const createComboPackage = async (comboPackage) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [comboPackage]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (response?.success && response?.results?.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error("Failed to create combo package");
  } catch (error) {
    console.error("Error creating combo package:", error);
    throw error;
  }
};

/**
 * Update an existing combo package
 * @param {Object} comboPackage - Combo package data with Id
 * @returns {Promise<Object>} - Updated combo package
 */
export const updateComboPackage = async (comboPackage) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      records: [comboPackage]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (response?.success && response?.results?.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error("Failed to update combo package");
  } catch (error) {
    console.error("Error updating combo package:", error);
    throw error;
  }
};

export default {
  fetchComboPackages,
  getComboPackageById,
  createComboPackage,
  updateComboPackage
};