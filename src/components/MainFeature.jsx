import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ onClose }) => {
  // Define icons
  const CloseIcon = getIcon('X');
  const UserIcon = getIcon('User');
  const MapPinIcon = getIcon('MapPin');
  const PhoneIcon = getIcon('Phone');
  const MailIcon = getIcon('Mail');
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const BeakerIcon = getIcon('Beaker');
  const PackageIcon = getIcon('Package');
  const InfoIcon = getIcon('Info');
  const CheckIcon = getIcon('Check');
  const ActivityIcon = getIcon('Activity');
  
  // Define states
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    selectedDate: '',
    selectedTime: '',
    bookingType: 'test', // 'test' or 'combo'
    selectedTest: '',
    selectedCombo: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  
  // Test and combo data
  const tests = [
    { id: 'cbc', name: 'Complete Blood Count (CBC)', price: 25.99 },
    { id: 'lipid', name: 'Lipid Panel', price: 35.50 },
    { id: 'glucose', name: 'Glucose Tolerance Test', price: 45.00 },
    { id: 'liver', name: 'Liver Function Test', price: 42.99 },
    { id: 'vitamin', name: 'Vitamin D Test', price: 39.99 },
    { id: 'thyroid', name: 'Thyroid Function Test', price: 55.00 }
  ];
  
  const comboPackages = [
    { id: 'complete', name: 'Complete Health Checkup', price: 99.99 },
    { id: 'women', name: 'Women\'s Health Package', price: 119.99 },
    { id: 'senior', name: 'Senior Citizen Package', price: 129.99 }
  ];
  
  // Generate available times based on date
  useEffect(() => {
    if (formData.selectedDate) {
      // In a real app, these would come from an API based on availability
      const mockTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
      setAvailableTimes(mockTimes);
    }
  }, [formData.selectedDate]);
  
  // Form validation
  const validateForm = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
      if (!formData.address.trim()) newErrors.address = 'Address is required';
    }
    
    if (currentStep === 2) {
      if (!formData.selectedDate) newErrors.selectedDate = 'Date is required';
      if (!formData.selectedTime) newErrors.selectedTime = 'Time is required';
    }
    
    if (currentStep === 3) {
      if (formData.bookingType === 'test' && !formData.selectedTest) {
        newErrors.selectedTest = 'Please select a test';
      } else if (formData.bookingType === 'combo' && !formData.selectedCombo) {
        newErrors.selectedCombo = 'Please select a package';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm(3)) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send data to your backend
      console.log('Form submitted with data:', formData);
      
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success('Your booking has been confirmed!');
    } catch (error) {
      setIsLoading(false);
      toast.error('There was an error processing your request.');
      console.error('Submission error:', error);
    }
  };
  
  // Move to next step
  const nextStep = () => {
    if (validateForm(step)) {
      setStep(step + 1);
    }
  };
  
  // Move to previous step
  const prevStep = () => {
    setStep(step - 1);
  };
  
  // Handle close
  const handleClose = () => {
    // If user has started filling form, confirm before closing
    if (
      formData.name || 
      formData.email || 
      formData.phone || 
      formData.address || 
      formData.selectedDate
    ) {
      if (window.confirm('Are you sure you want to close? Your information will be lost.')) {
        onClose();
      }
    } else {
      onClose();
    }
  };
  
  // Get current date in YYYY-MM-DD format for min attribute
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Get max date (3 months from now)
  const getMaxDate = () => {
    const now = new Date();
    now.setMonth(now.getMonth() + 3);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Calculate price based on selection
  const calculatePrice = () => {
    if (formData.bookingType === 'test' && formData.selectedTest) {
      const test = tests.find(t => t.id === formData.selectedTest);
      return test ? test.price : 0;
    } else if (formData.bookingType === 'combo' && formData.selectedCombo) {
      const combo = comboPackages.find(c => c.id === formData.selectedCombo);
      return combo ? combo.price : 0;
    }
    return 0;
  };
  
  // Get name of selected test or combo
  const getSelectionName = () => {
    if (formData.bookingType === 'test' && formData.selectedTest) {
      const test = tests.find(t => t.id === formData.selectedTest);
      return test ? test.name : '';
    } else if (formData.bookingType === 'combo' && formData.selectedCombo) {
      const combo = comboPackages.find(c => c.id === formData.selectedCombo);
      return combo ? combo.name : '';
    }
    return '';
  };
  
  // Form steps
  const renderPersonalInfoStep = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary dark:text-primary-light flex items-center">
        <UserIcon className="mr-2" size={20} />
        Personal Information
      </h2>
      
      <div className="form-group">
        <label htmlFor="name" className="form-label">Full Name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-surface-400" />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-control pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="John Doe"
          />
        </div>
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MailIcon className="h-5 w-5 text-surface-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="john@example.com"
          />
        </div>
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="phone" className="form-label">Phone Number</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PhoneIcon className="h-5 w-5 text-surface-400" />
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-control pl-10 ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="1234567890"
          />
        </div>
        {errors.phone && <p className="form-error">{errors.phone}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="address" className="form-label">Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPinIcon className="h-5 w-5 text-surface-400" />
          </div>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`form-control pl-10 ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="123 Main St, City, State, ZIP"
          ></textarea>
        </div>
        {errors.address && <p className="form-error">{errors.address}</p>}
      </div>
    </div>
  );
  
  const renderSchedulingStep = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary dark:text-primary-light flex items-center">
        <CalendarIcon className="mr-2" size={20} />
        Appointment Scheduling
      </h2>
      
      <div className="form-group">
        <label htmlFor="selectedDate" className="form-label">Select Date</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-surface-400" />
          </div>
          <input
            type="date"
            id="selectedDate"
            name="selectedDate"
            value={formData.selectedDate}
            onChange={handleChange}
            min={getCurrentDate()}
            max={getMaxDate()}
            className={`form-control pl-10 ${errors.selectedDate ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
        </div>
        {errors.selectedDate && <p className="form-error">{errors.selectedDate}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="selectedTime" className="form-label">Select Time</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ClockIcon className="h-5 w-5 text-surface-400" />
          </div>
          <select
            id="selectedTime"
            name="selectedTime"
            value={formData.selectedTime}
            onChange={handleChange}
            className={`form-control pl-10 ${errors.selectedTime ? 'border-red-500 focus:ring-red-500' : ''}`}
            disabled={!formData.selectedDate}
          >
            <option value="">Select a time</option>
            {availableTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        {!formData.selectedDate && (
          <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">
            Please select a date first
          </p>
        )}
        {errors.selectedTime && <p className="form-error">{errors.selectedTime}</p>}
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-start">
          <InfoIcon className="text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" size={18} />
          <div className="text-blue-700 dark:text-blue-300 text-sm">
            <p className="font-medium mb-1">Preparation Instructions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>For most blood tests, fasting for 8-12 hours is required.</li>
              <li>Stay hydrated by drinking plenty of water before your appointment.</li>
              <li>Bring your ID and insurance information if applicable.</li>
              <li>Arrive 10 minutes before your scheduled time.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderTestSelectionStep = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary dark:text-primary-light flex items-center">
        <BeakerIcon className="mr-2" size={20} />
        Select Tests
      </h2>
      
      <div className="flex space-x-4 mb-4">
        <button
          type="button"
          onClick={() => handleChange({ target: { name: 'bookingType', value: 'test' } })}
          className={`flex-1 py-3 px-4 rounded-lg transition-all ${
            formData.bookingType === 'test'
              ? 'bg-primary text-white shadow-md'
              : 'bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600'
          }`}
        >
          <BeakerIcon className="h-5 w-5 mx-auto mb-1" />
          <span className="text-sm font-medium">Individual Tests</span>
        </button>
        
        <button
          type="button"
          onClick={() => handleChange({ target: { name: 'bookingType', value: 'combo' } })}
          className={`flex-1 py-3 px-4 rounded-lg transition-all ${
            formData.bookingType === 'combo'
              ? 'bg-primary text-white shadow-md'
              : 'bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600'
          }`}
        >
          <PackageIcon className="h-5 w-5 mx-auto mb-1" />
          <span className="text-sm font-medium">Combo Packages</span>
        </button>
      </div>
      
      <AnimatePresence mode="wait">
        {formData.bookingType === 'test' ? (
          <motion.div
            key="tests"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="form-group">
           >
            {isLoadingOptions ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-surface-600 dark:text-surface-400">Loading tests...</span>
              </div>
            ) : fetchError ? (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                <p className="text-red-600 dark:text-red-400">
                  {fetchError}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm text-primary underline"
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="selectedTest" className="form-label">Select Test</label>
                <select
                  id="selectedTest"
                  name="selectedTest"
                  value={formData.selectedTest}
                  onChange={handleChange}
                  className={`form-control ${errors.selectedTest ? 'border-red-500 focus:ring-red-500' : ''}`}
                >
                  <option value="">Choose a test</option>
                  {tests.map(test => (
                    <option key={test.Id} value={test.Id}>{test.Name} - ${test.price}</option>
                  ))}
                </select>
                {errors.selectedTest && <p className="form-error">{errors.selectedTest}</p>}
                
                {formData.selectedTest && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mt-4">
                    <div className="flex items-center text-green-800 dark:text-green-200 mb-2">
                      <CheckIcon className="mr-2 flex-shrink-0" size={18} />
                      <span className="font-medium">Test selected: {tests.find(t => t.Id == formData.selectedTest)?.Name}</span>
                    </div>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Price: ${tests.find(t => t.Id == formData.selectedTest)?.price}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="combos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
                name="selectedTest"
                value={formData.selectedTest}
          >
            {isLoadingOptions ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-surface-600 dark:text-surface-400">Loading packages...</span>
      return test ? test.Name : '';
      return combo ? combo.Name : '';
  // Get updated selection name using Id instead of id
  const getUpdatedSelectionName = () => {
    if (formData.bookingType === 'test' && formData.selectedTest) {
      const test = tests.find(t => t.Id == formData.selectedTest);
      return test ? test.Name : '';
    } else if (formData.bookingType === 'combo' && formData.selectedCombo) {
      const combo = comboPackages.find(c => c.Id == formData.selectedCombo);
      return combo ? combo.Name : '';
    }
    return '';
  };
  
  // Get updated price
  const getUpdatedPrice = () => {
    if (formData.bookingType === 'test' && formData.selectedTest) {
      const test = tests.find(t => t.Id == formData.selectedTest);
      return test ? test.price || 0 : 0;
    } else if (formData.bookingType === 'combo' && formData.selectedCombo) {
      const combo = comboPackages.find(c => c.Id == formData.selectedCombo);
      return combo ? combo.price || 0 : 0;
    }
    return 0;
  };
  
            ) : fetchError ? (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                <p className="text-red-600 dark:text-red-400">
                  {fetchError}
      
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm text-primary underline"
                >
                  Try again
                </button>
      <div className="form-group">
            ) : (
              <div className="form-group">
                <label htmlFor="selectedCombo" className="form-label">Select Package</label>
                <select
                  id="selectedCombo"
                  name="selectedCombo"
                  value={formData.selectedCombo}
                  onChange={handleChange}
                  className={`form-control ${errors.selectedCombo ? 'border-red-500 focus:ring-red-500' : ''}`}
                >
                  <option value="">Choose a package</option>
                  {comboPackages.map(combo => (
                    <option key={combo.Id} value={combo.Id}>{combo.Name} - ${combo.price}</option>
                  ))}
                </select>
                {errors.selectedCombo && <p className="form-error">{errors.selectedCombo}</p>}
                
                {formData.selectedCombo && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mt-4">
                    <div className="flex items-center text-green-800 dark:text-green-200 mb-2">
                      <CheckIcon className="mr-2 flex-shrink-0" size={18} />
                      <span className="font-medium">Package selected: {comboPackages.find(c => c.Id == formData.selectedCombo)?.Name}</span>
                    </div>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Price: ${comboPackages.find(c => c.Id == formData.selectedCombo)?.price}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows="3"
          className="form-control"
          placeholder="Any specific requirements or medical conditions we should know about?"
        ></textarea>
      </div>
    </div>
  );
  
  const renderConfirmationScreen = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-4">
          <CheckIcon size={32} />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Booking Confirmed!</h2>
        <p className="text-surface-600 dark:text-surface-300 mt-2">
          Your appointment has been scheduled successfully.
        </p>
      </div>
      
      <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="bg-primary/10 dark:bg-primary/5 border-b border-surface-200 dark:border-surface-700 p-4">
          <h3 className="text-lg font-medium text-primary dark:text-primary-light flex items-center">
            <ActivityIcon className="mr-2" size={20} />
            Booking Details
          </h3>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Personal Information</h4>
              <p className="text-surface-900 dark:text-white font-medium">{formData.name}</p>
              <p className="text-surface-600 dark:text-surface-300 text-sm">{formData.email}</p>
              <p className="text-surface-600 dark:text-surface-300 text-sm">{formData.phone}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Appointment</h4>
              <p className="text-surface-900 dark:text-white font-medium">{new Date(formData.selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-surface-900 dark:text-white font-medium">{formData.selectedDate ? new Date(formData.selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Selected {formData.bookingType === 'test' ? 'Test' : 'Package'}</h4>
            <p className="text-surface-900 dark:text-white font-medium">{getSelectionName()}</p>
            <p className="text-surface-900 dark:text-white font-medium">{getUpdatedSelectionName()}</p>
              Price: ${calculatePrice().toFixed(2)}
              Price: ${getUpdatedPrice().toFixed(2)}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Address</h4>
            <p className="text-surface-600 dark:text-surface-300 text-sm whitespace-pre-line">{formData.address}</p>
          </div>
          
          {formData.additionalInfo && (
            <div>
              <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400 mb-1">Additional Information</h4>
              <p className="text-surface-600 dark:text-surface-300 text-sm">{formData.additionalInfo}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-surface-600 dark:text-surface-300 text-sm">
          A confirmation has been sent to your email. Please arrive 10 minutes before your scheduled time.
        </p>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="btn btn-primary"
        >
          Done
        </button>
      </div>
    </div>
  );
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative w-full max-w-3xl bg-surface-50 dark:bg-surface-900 rounded-2xl shadow-soft overflow-hidden"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 p-1 rounded-full bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
        aria-label="Close form"
      >
        <CloseIcon size={18} />
      </button>
      
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-r from-primary to-accent p-6 text-white">
        <h1 className="text-2xl font-bold">
          {isSubmitted ? 'Booking Complete' : 'Book Your Test'}
        </h1>
        <p className="opacity-90 text-sm mt-1">
          {isSubmitted ? 'Thank you for choosing our services' : 'Fill in the details to schedule your test'}
        </p>
        
        {/* Progress steps - only show if not in confirmation */}
        {!isSubmitted && (
          <div className="flex justify-between items-center mt-4 px-2">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-1 items-center">
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                  step >= stepNumber ? 'bg-white text-primary' : 'bg-white/30 text-white'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > stepNumber ? 'bg-white' : 'bg-white/30'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Form content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderConfirmationScreen()}
            </motion.div>
          ) : (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && renderPersonalInfoStep()}
              {step === 2 && renderSchedulingStep()}
              {step === 3 && renderTestSelectionStep()}
              
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                ) : (
                  <div></div> // Empty div to maintain flex spacing
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="btn btn-primary"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MainFeature;