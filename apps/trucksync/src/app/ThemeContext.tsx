// src/app/ThemeContext.tsx
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ThemeConfig, theme } from 'antd';

type ThemeContextType = {
  themeConfig: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  toggleTheme: () => void;
};

const defaultTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
    colorBgContainer: '#ffffff',
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorBgLayout: '#f5f5f5',
  },
  components: {
    Layout: {
      headerBg: '#001529',
      bodyBg: '#f5f5f5',
    },
  },
  algorithm: undefined,
};

const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#177ddc',
    colorBgContainer: '#1f1f1f',
    colorBgLayout: '#141414',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextHeading: 'rgba(255, 255, 255, 0.85)',
    colorBorder: '#424242',
    colorBgElevated: '#1f1f1f',
  },
  components: {
    Layout: {
      headerBg: '#141414',
      bodyBg: '#000000',
    },
    Card: {
      colorBgContainer: '#1f1f1f',
    },
    Menu: {
      darkItemBg: '#141414',
      darkItemColor: 'rgba(255, 255, 255, 0.85)',
      darkItemSelectedBg: '#177ddc',
    },
  },
  algorithm: theme.darkAlgorithm,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to ensure color is a string
const ensureColorString = (color: any): string => {
  if (!color) return '#1677ff';
  if (typeof color === 'string') {
    // Ensure it's a valid hex color
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      return color;
    }
    return '#1677ff';
  }
  // If it's a color object, convert to hex
  if (color.metaColor) {
    const { r, g, b } = color.metaColor;
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  }
  // Fallback to default
  return '#1677ff';
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    try {
      const savedTheme = localStorage.getItem('antd-theme');
      if (!savedTheme) return defaultTheme;
      
      const parsed = JSON.parse(savedTheme);
      // Ensure colorPrimary is a string
      if (parsed.token?.colorPrimary) {
        parsed.token.colorPrimary = ensureColorString(parsed.token.colorPrimary);
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse saved theme, using default', e);
      return defaultTheme;
    }
  });

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    try {
      // Ensure colorPrimary is a string
      const safeUpdates = { ...updates };
      if (safeUpdates.token?.colorPrimary) {
        safeUpdates.token.colorPrimary = ensureColorString(safeUpdates.token.colorPrimary);
      }

      const newTheme = {
        ...themeConfig,
        ...safeUpdates,
        token: {
          ...themeConfig.token,
          ...(safeUpdates.token || {}),
        },
      };
      
      setThemeConfig(newTheme);
      localStorage.setItem('antd-theme', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  const resetTheme = () => {
    const theme = isDarkMode ? darkTheme : defaultTheme;
    setThemeConfig(theme);
    localStorage.setItem('antd-theme', JSON.stringify(theme));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = !isDarkMode ? darkTheme : defaultTheme;
    setThemeConfig(newTheme);
    localStorage.setItem('antd-theme', JSON.stringify(newTheme));
  };

  const value = useMemo(
    () => ({ themeConfig, updateTheme, resetTheme, toggleTheme }),
    [themeConfig, isDarkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};