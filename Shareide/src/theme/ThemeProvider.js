import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { DARK, LIGHT } from './colors';


const ThemeContext = createContext();


export function ThemeProvider({ children }) {
const system = useColorScheme();
const [mode, setMode] = useState('system'); // 'system' | 'light' | 'dark'


const value = useMemo(() => {
const resolved = mode === 'system' ? (system || 'light') : mode;
const colors = resolved === 'dark' ? DARK : LIGHT;
return { mode, setMode, resolved, colors };
}, [mode, system]);


return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}


export function useTheme() {
return useContext(ThemeContext);
}