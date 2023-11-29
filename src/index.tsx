import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import "./tailwind.css";
import App from './app';
import { LoginPage, LogoutPage } from '@auth';
import { LobbyPage } from './modules/chess/Lobby.page';
import { GamePage } from './modules/chess/game/Game.page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <LobbyPage />
      },
      {
        path: "games/:gameId",
        element: <GamePage />

      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "logout",
        element: <LogoutPage />
      }
    ]
  }
]);

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<RouterProvider router={router} />);