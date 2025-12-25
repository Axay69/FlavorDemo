/**
 * Feature Card Component
 * 
 * Displays features available in the current flavor.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTheme } from '../config/theme';
import { FEATURES } from '../config/features';

interface FeatureCardProps {
  title: string;
  description: string;
  available: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  available,
}) => {
  const theme = getTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: available ? theme.colors.primary : theme.colors.textSecondary,
          opacity: available ? 1 : 0.5,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.badge, { color: theme.colors.primary }]}>
          {available ? '✓ Available' : '✗ Not Available'}
        </Text>
      </View>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        {description}
      </Text>
    </View>
  );
};

export const FeatureList: React.FC = () => {
  const theme = getTheme();

  const features = [
    {
      title: 'Video Editor',
      description: 'Professional video editing with filters, transitions, and effects',
      available: FEATURES.videoEditor,
    },
    {
      title: 'Ads',
      description: 'Advertisement banners to support the free version',
      available: FEATURES.ads,
    },
    {
      title: 'Analytics',
      description: 'Track usage and performance metrics',
      available: FEATURES.analytics,
    },
    {
      title: 'Premium Features',
      description: 'Access to all premium content and features',
      available: FEATURES.premiumFeatures,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Available Features
      </Text>
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  badge: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

