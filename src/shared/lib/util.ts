import { CSSProperties, useState, useCallback, useEffect } from "react";

export function groupById<T extends { id: string }>(items: T[]): Record<string, T> {
  return items.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.id]: curr
    };
  }, {});
}

export function maxBy<T>(items: T[], compareFn: (a: T, b: T) => number): T {
  return items.reduce((acc, curr) => {
    if (compareFn(curr, acc) > 0) {
      return curr;
    }
    return acc;
  }, null);
}

export function useQuery<T>(getFn: () => Promise<T>, initialValue: T, errorValue: T = null) {
  const [data, setData] = useState<T>(initialValue);

  const fetch = useCallback(() => {
    return getFn()
      .then(setData)
      .catch(() => setData(errorValue));
  }, [getFn]);

  useEffect(() => {
    fetch();
  }, [getFn])

  return { data, fetch, setData };
}

function hexToRgb(hex: string): number[] {
  var bigint = parseInt(hex.replace("#", ""), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r, g, b];
}

type PaletteKeys = "DEFAULT" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | string;

type Palette = Record<PaletteKeys, string>;

export interface Theme {
  backgroundColor: Record<string, Palette>;
  colors: Record<string, Palette>;
  textColor: Record<string, Palette>;
}

function paletteMapToStyle(paletteMap: Record<string, Palette>, prefix: string): CSSProperties {
  // For each palette
  return Object.keys(paletteMap).reduce((acc, paletteName) => {
    const palette = paletteMap[paletteName];

    // For each shade in the palette
    const paletteVars = Object.keys(palette).reduce((pAcc, shade) => {
      // ignore keys starting with underscore
      if (shade[0] === "_") { return pAcc }

      // remove the suffix if DEFAULT
      const shadeKey = shade === "DEFAULT" ? "" : `-${shade}`;

      // Otherwise conver the hex value to rgb
      return {
        ...pAcc,
        [`--${prefix}-${paletteName}${shadeKey}`]: hexToRgb(palette[shade]).join(" ")
      };
    }, acc);
    return {
      ...acc,
      ...paletteVars
    }
  }, {});
}

export function themeToStyle(theme: Theme): CSSProperties {
  const backgroundColorStyles = paletteMapToStyle(theme.backgroundColor, "backgroundColor");
  const colorStyles = paletteMapToStyle(theme.colors, "color");
  const textColorStyles = paletteMapToStyle(theme.textColor, "textColor");

  return {
    ...backgroundColorStyles,
    ...colorStyles,
    ...textColorStyles
  };
}
