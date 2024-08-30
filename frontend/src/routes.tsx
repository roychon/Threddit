import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import CreatePost from './pages/CreatePost';
import ProtectedRoute from './components/ProtectedRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><HomePage/></ProtectedRoute>,
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
  {
    path: '/post',
    element: <ProtectedRoute><CreatePost /></ProtectedRoute>
  }
]);

export default router;
