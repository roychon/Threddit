import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

const isAuthenticated = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: isAuthenticated ? <HomePage /> : <Navigate to='/sign-up' />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
]);

export default router;
