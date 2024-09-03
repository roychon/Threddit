import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import CreatePost from './pages/CreatePost';
import ProtectedRoute from './components/ProtectedRoute';
import CreateThread from './pages/createThread';
import Nav from './components/Nav';
import ChangeUsername from './components/ChangeUsername';
import ThreadPage from './pages/ThreadPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
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
    path: '/post/:threadID',
    element: (
      <ProtectedRoute>
        <Nav />
        <CreatePost />
      </ProtectedRoute>
    ),
  },
  {
    path: '/thread',
    element: (
      <ProtectedRoute>
        <Nav />
        <CreateThread />
      </ProtectedRoute>
    ),
  },
  {
    path: '/change-username',
    element: (
      <ProtectedRoute>
        <Nav />
        <ChangeUsername />
      </ProtectedRoute>
    ),
  },
  {
    path: '/thread/:threadID',
    element: (
      <ProtectedRoute>
        <Nav />
        <ThreadPage />
      </ProtectedRoute>
    ),
  },
]);

export default router;
