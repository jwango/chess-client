import { Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { themeToStyle, Theme } from "@shared/lib";

import './app.css';
import alternateTheme from './themes/alternate.theme.json';
import defaultTheme from './themes/default.theme.json';
import { useEffect, useState } from "react";
import { AuthProvider } from "./modules/auth/lib/auth.provider";

const THEME_OPTIONS: Record<string, Theme> = {
  "Default": defaultTheme,
  "Alternate": alternateTheme
};

const queryClient = new QueryClient();
const THEME_STORAGE_KEY = "user.preferences.theme";

export const App = () => {
  const [activeThemeKey, setActiveThemeKey] = useState<string>("Default");

  // load any saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      setActiveThemeKey(savedTheme);
    }
  }, [setActiveThemeKey]);

  const themeOption = THEME_OPTIONS[activeThemeKey];
  const themeColor = themeOption.colors.primary["300"];

  const handleChangeTheme = (theme: string) => {
    setActiveThemeKey(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  return <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Helmet>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='theme-color' content={themeColor} />
        <link rel='manifest' href='/manifest.json' />

        <title>Chess by jwango</title>
        <meta name='description' content="Simple chess client" />
        <meta name='keywords' content="chess jwango" />
        <meta name='author' content="Joshua Wang"/>

        <meta name='mobile-web-app-capable' content='yes'></meta>
        <link rel='icon' type='image/png' href='/favicon.ico' sizes='16x16' />
        <link rel='icon' type='image/png' href='/favicon.ico' sizes='24x24' />
        <link rel='icon' type='image/png' href='/favicon.ico' sizes='32x32' />
        <link rel='icon' type='image/png' href='/favicon.ico' sizes='64x64' />
        <link rel='apple-touch-icon' href='/app-icon.png' />
        <link rel='mask-icon' href='/mask-icon.svg' color={themeColor}/>
        <link rel='shortcut icon' href='/app-icon.png' />
      </Helmet>
      <main id="headlessui-portal-root" className="bg-light text-light min-h-screen" style={themeToStyle(themeOption)}>
        <nav className="bg-primary-300 gutters py-1">
          <Link className="px-2 text-primary-300" to="/">Home</Link>
          <Link className="px-2 text-primary-300" to="/logout">Logout</Link>

          <label className="text-primary-300 absolute right-1 top-1">
            Theme&nbsp;
            <select className="py-1 text-xs text-light" value={activeThemeKey} onChange={e => handleChangeTheme(e.currentTarget.value)}>
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