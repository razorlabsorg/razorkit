import { createContext, useContext } from "react";

export const ThemeIdContext = createContext<string | undefined>(undefined);

const attr = 'data-rk';

export const createThemeRootProps = (id: string | undefined) => ({ [attr]: id || '' });

export const createThemeRootSelector = (id: string | undefined) => {
  if (id && !/^[a-zA-Z0-9_]+$/.test(id)) {
    throw new Error(`Invalid ID: ${id}`);
  }

  return id ? `[${attr}="${id}"]` : `[${attr}]`;
};

export const useThemeRootProps = () => {
  const id = useContext(ThemeIdContext);
  return createThemeRootProps(id);
};