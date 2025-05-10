import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showPopup, setShowPopup] = useState(true);
  const [tests, setTests] = useState([]);

  const LabIcon = getIcon('Microscope');
  const HeartIcon = getIcon('Heart');
  const BrainIcon = getIcon('Brain');
  const StomachIcon = getIcon('Stethoscope');
  const DiabetesIcon = getIcon('Droplets');
  const BloodIcon = getIcon('Thermometer');
  const BoneIcon = getIcon('AlignHorizontalJustifyCenter');
  const SearchIcon = getIcon('Search');

  useEffect(() => {
    // Mock tests data
    const mockTests = [
      {
        id: 1,
        name: "Complete Blood Count (CBC)",
        description: "Measures different components of blood, including red and white blood cells and platelets.",
        category: "blood",
        price: 25.99,
        turnaroundTime: "24 hours",
        image: "https://images.unsplash.com/photo-1579165466741-7f35e4755183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsb29kJTIwdGVzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 2,
        name: "Lipid Panel",
        description: "Measures the level of specific lipids in blood, including cholesterol and triglycerides.",
        category: "heart",
        price: 35.50,
        turnaroundTime: "24 hours",
        image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNob2xlc3Rlcm9sfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 3,
        name: "Glucose Tolerance Test",
        description: "Measures how efficiently your body processes glucose.",
        category: "diabetes",
        price: 45.00,
        turnaroundTime: "3 hours",
        image: "https://images.unsplash.com/photo-1560306580-62fcca1bc93a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdsYWNvc2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 4,
        name: "Liver Function Test",
        description: "Measures various chemicals in the blood to evaluate liver function.",
        category: "stomach",
        price: 42.99,
        turnaroundTime: "24 hours",
        image: "https://images.unsplash.com/photo-1602615607198-7217c6e1dc3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2ZXJ8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 5,
        name: "Vitamin D Test",
        description: "Measures the amount of vitamin D in blood, which helps bones absorb calcium.",
        category: "bone",
        price: 39.99,
        turnaroundTime: "24 hours",
        image: "https://images.unsplash.com/photo-1577712388415-55f3ec8c3214?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dml0YW1pbiUyMGR8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 6,
        name: "Thyroid Function Test",
        description: "Checks how well your thyroid gland is working.",
        category: "brain",
        price: 55.00,
        turnaroundTime: "24 hours",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRoeXJvaWR8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60"
      }
    ];
    
    setTests(mockTests);
  }, []);
  
  const filteredTests = activeTab === 'all' 
    ? tests 
    : tests.filter(test => test.category === activeTab);
  
  const categories = [
    { id: 'all', name: 'All Tests', icon: LabIcon },
    { id: 'blood', name: 'Blood Tests', icon: BloodIcon },
    { id: 'heart', name: 'Cardiac Tests', icon: HeartIcon },
    { id: 'brain', name: 'Neurological', icon: BrainIcon },
    { id: 'stomach', name: 'Digestive', icon: StomachIcon },
    { id: 'diabetes', name: 'Diabetes', icon: DiabetesIcon },
    { id: 'bone', name: 'Bone & Joints', icon: BoneIcon }
  ];

  const comboPackages = [
    {
      id: 1,
      name: "Complete Health Checkup",
      description: "Comprehensive package including CBC, Lipid Panel, Liver Function, and more.",
      price: 99.99,
      originalPrice: 129.99,
      discountPercentage: 23,
      tests: ["Complete Blood Count (CBC)", "Lipid Panel", "Liver Function Test", "Thyroid Function Test"],
      image: "https://images.unsplash.com/photo-1530026454774-50cce722a1fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhbHRoJTIwY2hlY2t1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Women's Health Package",
      description: "Specially designed tests for women including hormonal analysis and vitamin levels.",
      price: 119.99,
      originalPrice: 159.99,
      discountPercentage: 25,
      tests: ["Complete Blood Count (CBC)", "Lipid Panel", "Thyroid Function Test", "Vitamin D Test", "Calcium Test"],
      image: "https://images.unsplash.com/photo-1609904603778-55d296926fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWVuJTIwaGVhbHRofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Senior Citizen Package",
      description: "Comprehensive tests designed for seniors to monitor overall health and detect age-related concerns.",
      price: 129.99,
      originalPrice: 179.99,
      discountPercentage: 28,
      tests: ["Complete Blood Count (CBC)", "Lipid Panel", "Glucose Tolerance Test", "Vitamin D Test", "Liver Function Test", "Thyroid Function Test"],
      image: "https://images.unsplash.com/photo-1569473028773-6e9a88ab1263?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNlbmlvciUyMGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
  ];
  
  return (
    <div>
      {showPopup && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <MainFeature onClose={() => setShowPopup(false)} />
        </motion.div>
      )}
      
      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
          <img 
            src="https://images.unsplash.com/photo-1581093196277-9f608732013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhYiUyMHRlc3R8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
            alt="Lab Tests" 
            className="w-full h-64 md:h-96 object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-2xl"
            >
              Advanced Pathology Testing for Better Health
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/90 text-sm md:text-lg max-w-xl mb-6"
            >
              State-of-the-art diagnostics with quick results and expert analysis. Your health is our priority.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => setShowPopup(true)}
              className="btn bg-white text-primary hover:bg-surface-100 hover:text-primary-dark"
            >
              Book a Test Now
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* Search and Filter */}
      <section className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-surface-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Search for tests..."
          />
        </div>
        
        <div className="mt-4 flex flex-nowrap overflow-x-auto pb-2 scrollbar-hide space-x-2">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center p-2 md:px-4 whitespace-nowrap rounded-full border transition-all ${
                  activeTab === category.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <CategoryIcon className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </section>
      
      {/* Tests Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Available Tests</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <motion.div 
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="card group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={test.image} 
                  alt={test.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 dark:text-white">{test.name}</h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">{test.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary dark:text-primary-light">${test.price}</span>
                  <span className="text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 py-1 px-2 rounded-full">
                    Results in {test.turnaroundTime}
                  </span>
                </div>
                <button 
                  onClick={() => setShowPopup(true)}
                  className="mt-4 w-full btn btn-primary"
                >
                  Book This Test
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Combo Packages Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Special Combo Packages</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comboPackages.map((combo) => (
            <motion.div 
              key={combo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="card group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={combo.image} 
                  alt={combo.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Save {combo.discountPercentage}%
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 dark:text-white">{combo.name}</h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">{combo.description}</p>
                <div className="space-y-2 mb-3">
                  <h4 className="text-xs font-semibold uppercase text-surface-500 dark:text-surface-400">Includes:</h4>
                  <ul className="text-sm space-y-1">
                    {combo.tests.map((test, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full p-1 mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {test}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-bold text-primary dark:text-primary-light">${combo.price}</span>
                  <span className="text-sm line-through text-surface-500 dark:text-surface-400">${combo.originalPrice}</span>
                </div>
                <button 
                  onClick={() => setShowPopup(true)} 
                  className="w-full btn btn-primary"
                >
                  Book This Package
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Why Choose LabTrace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Accurate Results", 
              description: "State-of-the-art equipment and rigorous quality control for high accuracy.",
              icon: "CheckCircle",
              color: "text-green-500"
            },
            { 
              title: "Quick Turnaround", 
              description: "Get results faster with our streamlined testing processes.",
              icon: "Clock",
              color: "text-blue-500"
            },
            { 
              title: "Certified Professionals", 
              description: "Experienced pathologists and lab technicians with relevant certifications.",
              icon: "Award",
              color: "text-purple-500"
            },
            { 
              title: "Digital Reports", 
              description: "Access your reports online anytime, anywhere securely.",
              icon: "Smartphone",
              color: "text-red-500"
            }
          ].map((feature, index) => {
            const FeatureIcon = getIcon(feature.icon);
            return (
              <div key={index} className="p-6 neu-card">
                <div className={`${feature.color} mb-4`}>
                  <FeatureIcon size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;