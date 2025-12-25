/**
 * API Configuration per Flavor
 * 
 * Different flavors can have different API endpoints, keys, and configurations.
 * This is set at build time via react-native-config.
 */
import Config from 'react-native-config';
import { APP_FLAVOR, getAppFlavor } from './flavor';

/**
 * API Configuration interface
 */
export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  environment: 'development' | 'staging' | 'production';
  timeout: number;
  enableLogging: boolean;
}

/**
 * Get API configuration based on flavor
 * Uses react-native-config to read from .env files
 */
export const getApiConfig = (): ApiConfig => {
  const flavor = getAppFlavor();
  
  // Use values from react-native-config if available, otherwise fallback
  return {
    baseUrl: Config.API_BASE_URL || (flavor === 'lite' ? 'https://api-lite.example.com/v1' : 'https://api-full.example.com/v1'),
    apiKey: Config.API_KEY || (flavor === 'lite' ? 'lite_api_key_12345' : 'full_api_key_67890'),
    environment: 'production',
    timeout: flavor === 'lite' ? 10000 : 15000,
    enableLogging: flavor === 'full', // Full version has detailed logging
  };
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  // Common endpoints
  login: '/auth/login',
  logout: '/auth/logout',
  profile: '/user/profile',
  
  // Full flavor only endpoints
  videoUpload: '/video/upload',
  videoEdit: '/video/edit',
  premiumContent: '/content/premium',
  
  // Lite flavor only endpoints
  ads: '/ads/load',
  adImpression: '/ads/impression',
} as const;

/**
 * Make API call with flavor-specific configuration
 */
export const apiCall = async (endpoint: string, options?: RequestInit): Promise<Response> => {
  const config = getApiConfig();
  const url = `${config.baseUrl}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': config.apiKey,
    'X-Flavor': getAppFlavor(),
    ...options?.headers,
  };
  
  if (config.enableLogging) {
    console.log(`[API] ${options?.method || 'GET'} ${url}`);
  }
  
  return fetch(url, {
    ...options,
    headers,
    signal: AbortSignal.timeout(config.timeout),
  });
};

