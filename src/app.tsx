import { Link, Outlet } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { themeToStyle, Theme } from "@shared/lib";

import './app.css';
import alternateTheme from './themes/alternate.theme.json';
import defaultTheme from './themes/default.theme.json';
import { useState } from "react";
import { AuthProvider } from "./modules/auth/lib/auth.provider";

const THEME_OPTIONS: Record<string, Theme> = {
  "Default": defaultTheme,
  "Alternate": alternateTheme
};

const queryClient = new QueryClient();

export const App = () => {
  const [activeThemeKey, setActiveThemeKey] = useState<string>("Default");

  return <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <main id="headlessui-portal-root" className="bg-light text-light min-h-screen" style={themeToStyle(THEME_OPTIONS[activeThemeKey])}>
        <nav className="bg-primary-300 gutters py-1">
          <Link className="px-2 text-primary-300" to="/">Home</Link>
          <Link className="px-2 text-primary-300" to="/carriage">Carriage</Link>
          <Link className="px-2 text-primary-300" to="/logout">Logout</Link>

          <label className="text-primary-300 absolute right-1 top-1">
            Theme&nbsp;
            <select className="py-1 text-xs text-light" value={activeThemeKey} onChange={e => setActiveThemeKey(e.currentTarget.value)}>
              <option value={"Default"}>Default</option>
              <option value={"Alternate"}>Alternate</option>
            </select>
          </label>
        </nav>
        <Outlet />
      </main>
    </AuthProvider>
  </QueryClientProvider>
};

export default App;