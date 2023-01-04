import { useState } from "react"

type ThemeMode = 'dark' | 'white';
interface ThemeModeOutputData {
    theme: ThemeMode,
    switchTheme: (mode?: string) => void 
}

/**
 * @defaultTheme default theme of application if this's neccessary 
 * @returns theme - current theme, switchTheme - callback for switching current theme
 */
export const useThemeMode = (defaultTheme?: ThemeMode | undefined) : ThemeModeOutputData => {
    const [theme, setTheme] = useState(typeof defaultTheme === 'undefined' ? 'white' : defaultTheme);
    
    const switchTheme = () => {
        setTheme(theme === 'white' ? 'dark' : 'white');
    }
    
    return {
        theme,
        switchTheme 
    }
}