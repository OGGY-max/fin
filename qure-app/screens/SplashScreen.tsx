import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Qure</Text>
        <Text style={styles.tagline}>Verified by Real People. Trusted by Qure.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: theme.fontSizes.xxlarge + 16,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: theme.spacing.large,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.white,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: theme.spacing.large,
  },
});

export default SplashScreen;