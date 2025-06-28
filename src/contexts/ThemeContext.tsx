import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme] = useState<Theme>('light');

  useEffect(() => {
    // Always apply light theme styles
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add('light');
    
    // Set light theme background and text
    document.body.style.background = '#f8fafc';
    document.body.style.color = '#0f172a';
  }, []);

  const setTheme = () => {
    // Theme is always light, this function is kept for compatibility
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};