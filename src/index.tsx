import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import "./tailwind.css";
import App from './app';
import { CarriagePage, HomePage, LoginPage } from '@home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <HomePage name="world" />,
        children: [
          {
            path: "carriage",
            element: <CarriagePage />
          }
        ]
      }
    ]
  },
  {
    path: "login",
    element: <LoginPage />
  }
]);

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<RouterProvider router={router} />);