import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';

// Add toast CSS
import 'react-toastify/dist/ReactToastify.css';

/**
 * Main entry point for the LabTrace application
 * 
 * Wraps the App component with:
 * - Redux Provider for state management
 * - BrowserRouter for routing
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);