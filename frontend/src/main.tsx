import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css'; //global stylinh

//import router for more clean code
import router from './routes';
import AuthProvider from './context/AuthProvider';

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);
