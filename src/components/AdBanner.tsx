/**
 * Ad Banner Component
 * 
 * This component is only available in the LITE flavor.
 * It demonstrates ads integration for the free version.
 */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getTheme } from '../config/theme';

export const AdBanner: React.FC = () => {
  const theme = getTheme();
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Simulate ad loading
    const timer = setTimeout(() => setAdLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.accent }]}>
      <Text style={styles.adLabel}>ADVERTISEMENT</Text>
      
      {adLoaded ? (
        <View style={styles.adContent}>
          <Text style={styles.adTitle}>🎯 Special Offer!</Text>
          <Text style={styles.adText}>
            Upgrade to Full version to remove ads and unlock premium features.
          </Text>
          <TouchableOpacity
            style={[styles.adButton, { backgroundColor: '#FFFFFF' }]}
            onPress={() => console.log('Ad clicked - upgrade prompt')}
          >
            <Text style={[styles.adButtonText, { color: theme.colors.accent }]}>
              Upgrade Now
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading ad...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    margin: 16,
    minHeight: 120,
    justifyContent: 'center',
  },
  adLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 8,
    textAlign: 'center',
  },
  adContent: {
    alignItems: 'center',
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  adText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  adButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  adButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

