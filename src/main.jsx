import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes.jsx'; 
import Authprovider from './components/context/Authprovider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovider>
        <RouterProvider router={router} /> 
    </Authprovider>
  </React.StrictMode>,
);

