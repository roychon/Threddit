import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './SignInPage';

const isAuthenticated = false;

const router = createBrowserRouter([
  {
    path: '/',
    element: isAuthenticated ? <HomePage /> : <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
]);

export default router;
