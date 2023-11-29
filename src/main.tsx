import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Theme, themeToStyle } from "./shared/lib/util";
import alternateTheme from './themes/alternate.theme.json';
import defaultTheme from './themes/default.theme.json';
import { Helmet } from "react-helmet";
import { useAuth } from "./modules/auth/lib/useAuth.hook";
import { Avatar } from "./shared/components/Avatar";

const THEME_OPTIONS: Record<string, Theme> = {
  "Default": defaultTheme,
  "Alternate": alternateTheme
};

const THEME_STORAGE_KEY = "user.preferences.theme";
export const Main = () => {
  const [activeThemeKey, setActiveThemeKey] = useState<string>("Default");
  const { userInfo } = useAuth();

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

  return <main id="headlessui-portal-root" className="bg-light text-light h-full overflow-auto" style={themeToStyle(themeOption)}>
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
    <nav className="bg-primary-300 gutters py-1 h-[32px]">
      <Link className="px-2 text-primary-300 align-top" to="/">Home</Link>

      <div className="absolute right-1 top-1">
        <Avatar userInfo={userInfo} />
        <Link className="px-2 text-primary-300 align-top" to="/logout">Logout</Link>
        <label className="text-primary-300 text-base align-top ml-4">
          Theme&nbsp;
          <select className="py-1 text-xs text-light" value={activeThemeKey} onChange={e => handleChangeTheme(e.currentTarget.value)}>
            <option value={"Default"}>Default</option>
            <option value={"Alternate"}>Alternate</option>
          </select>
        </label>
      </div>
    </nav>
    <div className="mt-[-32px] pt-[32px]">
      <Outlet />
    </div>
  </main>;
};