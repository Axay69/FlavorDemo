/**
 * Sample React Native App with Flavor Support
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { getAppFlavor } from './src/config/flavor';
import { FEATURES, isFeatureEnabled } from './src/config/features';
import { getTheme } from './src/config/theme';
import { getApiConfig } from './src/config/api';
import { FeatureList } from './src/components/FeatureCard';
import { VideoEditor } from './src/components/VideoEditor';
import { AdBanner } from './src/components/AdBanner';

function App() {
  const theme = getTheme();

  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={theme.colors.primary}
      />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const theme = getTheme();
  const flavor = getAppFlavor();
  const apiConfig = getApiConfig();
  const [activeTab, setActiveTab] = useState<'home' | 'features' | 'api'>('home');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header with flavor badge */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View>
          <Text style={styles.headerTitle}>
            {flavor === 'lite' ? 'FlavourDemo Lite' : 'FlavourDemo Premium'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {theme.name} • {apiConfig.environment}
          </Text>
        </View>
        <View style={[styles.flavorBadge, { backgroundColor: theme.colors.accent }]}>
          <Text style={styles.flavorText}>{flavor.toUpperCase()}</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={[styles.tabs, { backgroundColor: theme.colors.surface }]}>
        <TabButton
          label="Home"
          active={activeTab === 'home'}
          onPress={() => setActiveTab('home')}
          theme={theme}
        />
        <TabButton
          label="Features"
          active={activeTab === 'features'}
          onPress={() => setActiveTab('features')}
          theme={theme}
        />
        <TabButton
          label="API Config"
          active={activeTab === 'api'}
          onPress={() => setActiveTab('api')}
          theme={theme}
        />
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'home' && (
          <View>
            {/* Welcome Section */}
            <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Welcome to {flavor === 'lite' ? 'Lite' : 'Premium'} Version
              </Text>
              <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
                {flavor === 'lite' 
                  ? 'Enjoy our free version with essential features. Upgrade to remove ads and unlock premium features.'
                  : 'You have access to all premium features including video editing, advanced analytics, and more.'}
              </Text>
            </View>

            {/* Flavor-specific components */}
            {isFeatureEnabled('videoEditor') && (
              <VideoEditor />
            )}

            {isFeatureEnabled('ads') && (
              <AdBanner />
            )}

            {/* API Info Card */}
            <View style={[styles.apiCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.apiTitle, { color: theme.colors.primary }]}>
                🔌 API Configuration
              </Text>
              <InfoRow label="Base URL" value={apiConfig.baseUrl} theme={theme} />
              <InfoRow label="Environment" value={apiConfig.environment} theme={theme} />
              <InfoRow label="Timeout" value={`${apiConfig.timeout}ms`} theme={theme} />
              <InfoRow label="Logging" value={apiConfig.enableLogging ? 'Enabled' : 'Disabled'} theme={theme} />
            </View>
          </View>
        )}

        {activeTab === 'features' && (
          <FeatureList />
        )}

        {activeTab === 'api' && (
          <View style={styles.apiDetails}>
            <View style={[styles.apiCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.apiTitle, { color: theme.colors.primary }]}>
                API Configuration Details
              </Text>
              <InfoRow label="Flavor" value={flavor} theme={theme} />
              <InfoRow label="Base URL" value={apiConfig.baseUrl} theme={theme} />
              <InfoRow label="API Key" value={apiConfig.apiKey.substring(0, 10) + '...'} theme={theme} />
              <InfoRow label="Environment" value={apiConfig.environment} theme={theme} />
              <InfoRow label="Timeout" value={`${apiConfig.timeout}ms`} theme={theme} />
              <InfoRow label="Logging" value={apiConfig.enableLogging ? 'Enabled' : 'Disabled'} theme={theme} />
              
              <Text style={[styles.apiNote, { color: theme.colors.textSecondary }]}>
                💡 In production, API keys and endpoints should be set via BuildConfig/Info.plist
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const TabButton: React.FC<{
  label: string;
  active: boolean;
  onPress: () => void;
  theme: any;
}> = ({ label, active, onPress, theme }) => (
  <TouchableOpacity
    style={[
      styles.tabButton,
      active && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 },
    ]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.tabText,
        { color: active ? theme.colors.primary : theme.colors.textSecondary },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const InfoRow: React.FC<{ label: string; value: string; theme: any }> = ({
  label,
  value,
  theme,
}) => (
  <View style={styles.infoRow}>
    <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
      {label}:
    </Text>
    <Text style={[styles.infoValue, { color: theme.colors.text }]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  flavorBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  flavorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  apiCard: {
    padding: 20,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  apiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  apiNote: {
    fontSize: 12,
    marginTop: 16,
    fontStyle: 'italic',
  },
  apiDetails: {
    padding: 16,
  },
});

export default App;
