import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './pages/root/root';
import Home from './pages/Home/home';
import Apps from './pages/Apps/apps';
import TTT from './pages/Apps/TTT/ttt';
import ErrorPage from './pages/Error/error';

// import ContactsRoot, {
//   loader as contactsRootLoader,
//   action as contactsRootAction,
// } from './pages/Contacts/contactsroot';
// import ContactsHome from './pages/Contacts/contactshome';
// import Contact, {
//   loader as contactLoader,
//   action as contactAction,
// } from './pages/Contacts/contact';
// import EditContact, {
//   action as editContactAction,
// } from './pages/Contacts/edit';
// import {
//   action as destroyContactAction
// } from './pages/Contacts/destroy';

const router = createBrowserRouter([
  {
    path: '',
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
            path: 'apps/ttt/',
            element: <TTT />,
          }
        ],
      },
    ],
  },
  // {
  //   path: '/',
  //   element: <ContactsRoot />,
  //   errorElement: <ErrorPage />,
  //   loader: contactsRootLoader,
  //   action: contactsRootAction,
  //   children: [
  //     {
  //       errorElement: <ErrorPage />,
  //       children: [
  //         {
  //           index: true,
  //           element: <ContactsHome />,
  //         },
  //         {
  //           path: 'contacts/:contactId',
  //           element: <Contact />,
  //           loader: contactLoader,
  //           action: contactAction,
  //         },
  //         {
  //           path: 'contacts/:contactId/edit',
  //           element: <EditContact />,
  //           loader: contactLoader,
  //           action: editContactAction,
  //         },
  //         {
  //           path: 'contacts/:contactId/destroy',
  //           action: destroyContactAction,
  //           errorElement: <div>Oops! There was an error.</div>,
  //         },
  //       ]
  //     },
  //   ],
  // },
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
