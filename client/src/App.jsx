import { useSelector } from 'react-redux';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { user } = useSelector((state) => state.auth);
  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <Home /> : <Register />,
    },
    {
      path: '/register',
      element: user ? <Navigate to="/" /> : <Register />,
    },
    {
      path: '/login',
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
