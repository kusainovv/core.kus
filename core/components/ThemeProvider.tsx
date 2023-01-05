import React, { createContext, ReactNode, useContext } from "react";
import { useThemeMode } from "../utils/useThemeMode";

export type ThemeMode = 'dark' | 'white';

interface Theme {
    theme: ThemeMode,
    switchTheme: (mode?: string) => void 
}

const ThemeContext = createContext<Theme>({ theme: 'white', switchTheme: () => {} });

export const ThemeProvider : React.FC<{ children: ReactNode }> = ({ children }) => {
    const { theme, switchTheme } = useThemeMode();
    return <ThemeContext.Provider value={{ theme, switchTheme }}>
        {children}
    </ThemeContext.Provider>
}

export const useThemeApplication = () => useContext(ThemeContext);