import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './pages/root/root';
import Home from './pages/Home/home';
import Apps from './pages/Apps/apps';
import TTT from './pages/TTT/ttt';
import Clock from './pages/Clock/clock';
import ISS from './pages/ISS/iss';
import ErrorPage from './pages/Error/error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'apps/',
            element: <Apps />,
          },
          {
            path: 'apps/iss/',
            element: <ISS />,
          },
          {
            path: 'apps/clock/',
            element: <Clock />,
          },
          {
            path: 'apps/ttt/',
            element: <TTT />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
