import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import { store } from './store';
import { restoreSession } from './store/slices/auth';

import Authorized from './components/common/Authorized';
import App from './components/App/App';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import Vacations from './pages/Vacations';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authorized />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/schedule',
            element: <Schedule />,
          },
          {
            path: '/settings',
            element: <Settings />,
          },
          {
            path: '/vacations',
            element: <Vacations />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

store.dispatch(restoreSession());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>
);
