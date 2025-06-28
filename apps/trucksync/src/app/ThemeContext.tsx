// src/app/ThemeContext.tsx
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ThemeConfig } from 'antd';

type ThemeContextType = {
  themeConfig: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
};

const defaultTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
    colorBgContainer: '#ffffff',
    colorText: 'rgba(0, 0, 0, 0.88)',
  },
  components: {
    Layout: {
      colorBgHeader: '#001529',
      colorBgBody: '#f5f5f5',
    },
  },
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
    setThemeConfig(defaultTheme);
    localStorage.setItem('antd-theme', JSON.stringify(defaultTheme));
  };

  const value = useMemo(
    () => ({ themeConfig, updateTheme, resetTheme }),
    [themeConfig]
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