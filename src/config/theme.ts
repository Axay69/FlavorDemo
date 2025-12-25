/**
 * Theme Configuration per Flavor
 * 
 * Different flavors can have completely different branding, colors, and themes.
 */
import { APP_FLAVOR, getAppFlavor } from './flavor';

/**
 * Color palette interface
 */
export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  error: string;
  success: string;
  warning: string;
}

/**
 * Theme interface
 */
export interface Theme {
  colors: ColorPalette;
  name: string;
  flavor: 'lite' | 'full';
}

/**
 * Lite flavor theme - Simple, clean, minimal
 */
const liteTheme: Theme = {
  name: 'Lite Theme',
  flavor: 'lite',
  colors: {
    primary: '#4CAF50',        // Green - simple, friendly
    secondary: '#81C784',      // Light green
    accent: '#FF9800',          // Orange for ads/CTAs
    background: '#F5F5F5',      // Light gray background
    surface: '#FFFFFF',         // White cards
    text: '#212121',            // Dark gray text
    textSecondary: '#757575',   // Medium gray
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FF9800',
  },
};

/**
 * Full flavor theme - Premium, rich, sophisticated
 */
const fullTheme: Theme = {
  name: 'Premium Theme',
  flavor: 'full',
  colors: {
    primary: '#2196F3',         // Blue - professional
    secondary: '#1976D2',       // Dark blue
    accent: '#FF4081',          // Pink - premium feel
    background: '#FAFAFA',      // Very light gray
    surface: '#FFFFFF',          // White cards with shadows
    text: '#212121',            // Dark text
    textSecondary: '#616161',   // Medium gray
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FF9800',
  },
};

/**
 * Get theme based on current flavor
 */
export const getTheme = (): Theme => {
  const flavor = getAppFlavor();
  
  switch (flavor) {
    case 'lite':
      return liteTheme;
    case 'full':
      return fullTheme;
    default:
      return fullTheme; // Default fallback
  }
};

/**
 * Typography styles per flavor
 */
export const typography = {
  lite: {
    heading: {
      fontSize: 24,
      fontWeight: '600' as const,
      color: liteTheme.colors.text,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: liteTheme.colors.text,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      color: liteTheme.colors.textSecondary,
    },
  },
  full: {
    heading: {
      fontSize: 28,
      fontWeight: '700' as const,
      color: fullTheme.colors.text,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: fullTheme.colors.text,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: fullTheme.colors.textSecondary,
    },
  },
};

