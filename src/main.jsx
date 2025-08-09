import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './router/router';
import { RouterProvider } from 'react-router';
import AuthProvider from './contexts/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './reUse/ThemeContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider> 
        <RouterProvider router={router} />
        <ToastContainer position="top-center" />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
