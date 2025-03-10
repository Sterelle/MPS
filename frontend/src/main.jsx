import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import useAuthStore from './store/authStore';
import './index.css';

// Initialiser l'état d'authentification avant le rendu
const initializeAuth = async () => {
  const initialize = useAuthStore.getState().initialize;
  await initialize();
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

initializeAuth(); 