/**
 * App Flavor Configuration
 * 
 * This constant is injected at runtime from react-native-config.
 * It represents the build flavor (lite, full, etc.) that was used to build the app.
 */
import Config from 'react-native-config';

export const APP_FLAVOR = (Config.APP_FLAVOR || globalThis.__APP_FLAVOR__) as 'lite' | 'full' | undefined;

/**
 * Type guard to check if flavor is valid
 */
export const isValidFlavor = (flavor: string | undefined): flavor is 'lite' | 'full' => {
  return flavor === 'lite' || flavor === 'full';
};

/**
 * Get the app flavor, throwing an error if not set
 */
export const getAppFlavor = (): 'lite' | 'full' => {
  if (!APP_FLAVOR || !isValidFlavor(APP_FLAVOR)) {
    throw new Error(
      'APP_FLAVOR is not set. Make sure the native flavor module is properly configured.'
    );
  }
  return APP_FLAVOR;
};

