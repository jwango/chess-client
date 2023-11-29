import { useState, useEffect, useCallback } from "react";
import { Link, Outlet } from "react-router-dom";
import { Theme, themeToStyle } from "./shared/lib/util";
import arBlueTheme from './themes/argentine-blue.theme.json';
import sageTheme from './themes/sage.theme.json';
import { Helmet } from "react-helmet";
import { useAuth } from "./modules/auth/lib/useAuth.hook";
import { Avatar } from "./shared/components/Avatar";

enum ThemeKey {
  Default = 'Default',
  Alternate = 'Alternate',
  Sage = 'Sage',
  ArgnetineBlue = 'Argentine Blue'
}

const THEME_OPTIONS: Record<ThemeKey, Theme> = {
  "Default": { ...sageTheme, isDeprecated: true },
  "Alternate": { ...arBlueTheme, isDeprecated: true },
  "Sage": sageTheme,
  "Argentine Blue": arBlueTheme
};

const THEME_STORAGE_KEY = "user.preferences.theme";
export const Main = () => {
  const [activeThemeKey, setActiveThemeKey] = useState<ThemeKey>(ThemeKey.Sage);
  const { userInfo } = useAuth();

  const handleChangeTheme = useCallback((theme: string) => {
    const themeKey = parseThemeKey(theme);
    setActiveThemeKey(themeKey);
    localStorage.setItem(THEME_STORAGE_KEY, themeKey);
  }, [parseThemeKey, setActiveThemeKey]);

  // load the saved theme and re-save whatever was parsed to clean any old themes
  useEffect(() => {
    const savedTheme = parseThemeKey(localStorage.getItem(THEME_STORAGE_KEY));
    if (savedTheme) {
      handleChangeTheme(savedTheme);
    }
  }, [setActiveThemeKey]);

  const themeOption = THEME_OPTIONS[activeThemeKey];
  const themeColor = themeOption.colors.primary["300"];

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
            {Object.keys(THEME_OPTIONS)
              .map((themeKey: ThemeKey) => ({ value: themeKey, name: themeKey, show: !THEME_OPTIONS[themeKey].isDeprecated } ))
              .filter(o => o.show)
              .map(o => <option key={o.value} value={o.value}>{o.name}</option>)
            };
          </select>
        </label>
      </div>
    </nav>
    <div className="mt-[-32px] pt-[32px]">
      <Outlet />
    </div>
  </main>;
};

function parseThemeKey(key: string): ThemeKey {
  switch (key) {
    case ThemeKey.Default:
      return ThemeKey.Sage;
    case ThemeKey.Alternate:
      return ThemeKey.ArgnetineBlue;
    case ThemeKey.Sage:
    case ThemeKey.ArgnetineBlue:
      return key;
    default:
      return ThemeKey.Sage;
  }
}
