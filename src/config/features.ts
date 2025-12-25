/**
 * Feature Flags Configuration
 * 
 * Central feature map that gates features based on app flavor.
 * This allows you to conditionally enable/disable features per flavor.
 * Uses react-native-config for environment-based feature flags.
 */
import Config from 'react-native-config';
import { APP_FLAVOR } from './flavor';

export const FEATURES = {
  /**
   * Video editor feature - only available in full flavor
   */
  videoEditor: Config.ENABLE_VIDEO_EDITOR === 'true' || APP_FLAVOR === 'full',
  
  /**
   * Ads feature - only available in lite flavor
   */
  ads: Config.ENABLE_ADS === 'true' || APP_FLAVOR === 'lite',
  
  /**
   * Analytics - available in all flavors
   */
  analytics: true,
  
  /**
   * Premium features - only in full flavor
   */
  premiumFeatures: APP_FLAVOR === 'full',
} as const;

/**
 * Type-safe feature checker
 */
export const isFeatureEnabled = (feature: keyof typeof FEATURES): boolean => {
  return FEATURES[feature] === true;
};

