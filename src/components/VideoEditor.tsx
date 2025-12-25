/**
 * Video Editor Component
 * 
 * This component is only available in the FULL flavor.
 * It demonstrates lazy loading and feature gating.
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getTheme } from '../config/theme';

export const VideoEditor: React.FC = () => {
  const theme = getTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        🎬 Video Editor
      </Text>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        Premium video editing features available only in Full version.
      </Text>
      
      <View style={styles.features}>
        <FeatureItem icon="✂️" text="Trim & Cut" theme={theme} />
        <FeatureItem icon="🎨" text="Filters & Effects" theme={theme} />
        <FeatureItem icon="🎵" text="Music & Sound" theme={theme} />
        <FeatureItem icon="📐" text="Aspect Ratios" theme={theme} />
        <FeatureItem icon="✨" text="Transitions" theme={theme} />
        <FeatureItem icon="📊" text="Analytics" theme={theme} />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => console.log('Video editor opened')}
      >
        <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
          Open Editor
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const FeatureItem: React.FC<{ icon: string; text: string; theme: any }> = ({
  icon,
  text,
  theme,
}) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={[styles.featureText, { color: theme.colors.text }]}>
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  featureItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

