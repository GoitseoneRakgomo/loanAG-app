import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';

const palette = {
  background: '#f5f2e4',
  surface: '#ffffff',
  primary: '#88caa8',
  primaryDark: '#4b6755',
  text: '#000000',
  muted: '#566063',
  border: '#d9e3d6',
};

export default function LandingScreen() {
  const router = useRouter();
  const { user, initializing } = useAuth();

  useEffect(() => {
    if (!initializing && user) {
      try {
        router.replace('/dashboard');
      } catch (err) {
        console.warn('[LandingScreen] Navigation error:', err);
      }
    }
  }, [initializing, router, user]);

  if (initializing) {
    return (
      <SafeAreaView style={styles.page}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.content}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Loan AG</Text>
        </View>

        <Text style={styles.title}>Groceries now,{`\n`}pay later.</Text>
        <Text style={styles.subtitle}>
          A safe student credit experience for campus essentials.
        </Text>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={() => router.push('/login')}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => router.push('/login')}>
            <Text style={styles.secondaryButtonText}>Log In</Text>
          </Pressable>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Built for campus life</Text>
          <Text style={styles.featureDescription}>
            Track spending, view activity, and access soft credit for groceries with a modern, protected flow.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: palette.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  heroBadgeText: {
    color: 'white',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    color: palette.text,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '800',
    marginBottom: 18,
  },
  subtitle: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 320,
  },
  actions: {
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: palette.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderColor: palette.primaryDark,
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: palette.primaryDark,
    fontSize: 16,
    fontWeight: '700',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
  },
  featureTitle: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  featureDescription: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
  },
});
