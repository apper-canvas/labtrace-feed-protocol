import { getApperClient } from './apperService';

// Table name from the database
const TABLE_NAME = 'booking';

/**
 * Fetch bookings with optional filtering
 * @param {Object} options - Filter options
 * @param {string} options.status - Booking status filter
 * @param {string} options.email - Email filter
 * @param {number} options.limit - Results limit
 * @param {number} options.offset - Results offset for pagination
 * @returns {Promise<Array>} - Bookings array
 */
export const fetchBookings = async (options = {}) => {
  try {
    const apperClient = getApperClient();
    const { status, email, limit = 20, offset = 0 } = options;
    
    // Create filter conditions
    const whereConditions = [];
    
    // Add IsDeleted = false filter
    whereConditions.push({ field: "IsDeleted", operator: "equals", value: false });
    
    // Add status filter if provided
    if (status) {
      whereConditions.push({ field: "status", operator: "equals", value: status });
    }
    
    // Add email filter if provided
    if (email) {
      whereConditions.push({ field: "email", operator: "equals", value: email });
    }
    
    const params = {
      fields: [
        "Id", "Name", "email", "phone", "address", "selectedDate", 
        "selectedTime", "bookingType", "selectedTest", "selectedCombo", 
        "additionalInfo", "status"
      ],
      expands: [
        {
          name: "selectedTest",
          alias: "testDetails",
          fields: ["Id", "Name", "price", "category"]
        },
        {
          name: "selectedCombo",
          alias: "comboDetails",
          fields: ["Id", "Name", "price", "tests"]
        }
      ],
      where: whereConditions,
      orderBy: [{ field: "selectedDate", direction: "desc" }],
      pagingInfo: { limit, offset }
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

/**
 * Get a booking by ID
 * @param {number} id - Booking ID
 * @returns {Promise<Object>} - Booking object
 */
export const getBookingById = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: [
        "Id", "Name", "email", "phone", "address", "selectedDate", 
        "selectedTime", "bookingType", "selectedTest", "selectedCombo", 
        "additionalInfo", "status"
      ],
      expands: [
        {
          name: "selectedTest",
          alias: "testDetails",
          fields: ["Id", "Name", "price", "category"]
        },
        {
          name: "selectedCombo",
          alias: "comboDetails",
          fields: ["Id", "Name", "price", "tests"]
        }
      ]
    };
    
    const response = await apperClient.getRecordById(TABLE_NAME, id, params);
    return response?.data || null;
  } catch (error) {
    console.error(`Error fetching booking with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new booking
 * @param {Object} booking - Booking data
 * @returns {Promise<Object>} - Created booking
 */
export const createBooking = async (booking) => {
  try {
    const apperClient = getApperClient();
    
    // Set default status to pending if not provided
    if (!booking.status) {
      booking.status = 'pending';
    }
    
    const params = {
      records: [booking]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (response?.success && response?.results?.length > 0) {
      return response.results[0].data;
    }
    
    throw new Error("Failed to create booking");
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export default {
  fetchBookings,
  getBookingById,
  createBooking
};