import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'glass';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
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
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'glass';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Apply theme classes to document
    document.documentElement.classList.remove('light', 'dark', 'glass');
    document.documentElement.classList.add(theme);
    
    // Apply theme-specific styles
    if (theme === 'glass') {
      document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else if (theme === 'dark') {
      document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    }
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'glass'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};