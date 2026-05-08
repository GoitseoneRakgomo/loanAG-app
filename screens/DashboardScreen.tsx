import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';

const palette = {
  background: '#f5f2e4',
  surface: '#ffffff',
  primary: '#88caa8',
  accent: '#4b6755',
  slate: '#3a434e',
  text: '#000000',
  muted: '#566063',
  progressBg: '#d9e3d6',
};

const activity = [
  { label: 'Grocery Store', amount: '$25' },
  { label: 'Campus Market', amount: '$12' },
  { label: 'Fresh Foods', amount: '$18' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const { user, initializing, logout, loading } = useAuth();

  useEffect(() => {
    if (!initializing && !user) {
      try {
        router.replace('/login');
      } catch (err) {
        console.warn('[DashboardScreen] Navigation error:', err);
      }
    }
  }, [initializing, router, user]);

  const handleLogout = async () => {
    try {
      await logout();
      try {
        router.replace('/');
      } catch (navErr) {
        console.warn('[DashboardScreen] Navigation error:', navErr);
      }
    } catch (err) {
      console.warn('[DashboardScreen] Logout error:', err);
    }
  };

  if (initializing || (!user && loading)) {
    return (
      <SafeAreaView style={styles.loaderPage}>
        <ActivityIndicator size="large" color={palette.primary} />
      </SafeAreaView>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome, {user}</Text>
          <Text style={styles.subheading}>Here’s your account overview</Text>
        </View>

        <View style={styles.creditCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>Credit limit</Text>
            <Text style={styles.cardLabel}>Live</Text>
          </View>
          <Text style={styles.cardAmount}>$120</Text>
          <Text style={styles.cardMeta}>Available credit</Text>
          <View style={styles.creditStats}>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>$120</Text>
              <Text style={styles.statLabel}>Available</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statValue}>$200</Text>
              <Text style={styles.statLabel}>Limit</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressLabel}>60% used • $80 spent</Text>
        </View>

        <View style={styles.quickActions}> 
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <View style={styles.actionGrid}>
            <Pressable style={styles.actionTile} onPress={() => console.log('Shop Groceries')}>
              <Text style={styles.actionText}>Shop Groceries</Text>
            </Pressable>
            <Pressable style={styles.actionTile} onPress={() => console.log('View Transactions')}>
              <Text style={styles.actionText}>View Transactions</Text>
            </Pressable>
            <Pressable style={styles.actionTile} onPress={() => console.log('Repay Balance')}>
              <Text style={styles.actionText}>Repay Balance</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
          <View style={styles.activityCard}>
            {activity.map((item) => (
              <View key={item.label} style={styles.activityRow}>
                <Text style={styles.activityLabel}>{item.label}</Text>
                <Text style={styles.activityAmount}>{item.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: palette.background,
  },
  loaderPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.background,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  welcome: {
    color: palette.slate,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subheading: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  creditCard: {
    backgroundColor: palette.surface,
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  cardLabel: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardAmount: {
    color: palette.text,
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 6,
  },
  cardMeta: {
    color: palette.muted,
    fontSize: 15,
    marginBottom: 22,
  },
  creditStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statBlock: {
    flex: 1,
  },
  statValue: {
    color: palette.slate,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: palette.muted,
    fontSize: 13,
  },
  progressTrack: {
    width: '100%',
    height: 10,
    backgroundColor: palette.progressBg,
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    width: '60%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: palette.primary,
  },
  progressLabel: {
    color: palette.muted,
    fontSize: 13,
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: palette.slate,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionTile: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
    marginBottom: 12,
  },
  actionText: {
    color: palette.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  activitySection: {
    marginBottom: 28,
  },
  activityCard: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e8efe7',
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  activityLabel: {
    color: palette.slate,
    fontSize: 15,
    fontWeight: '700',
  },
  activityAmount: {
    color: palette.muted,
    fontSize: 15,
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d9e3d6',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  logoutText: {
    color: palette.slate,
    fontSize: 16,
    fontWeight: '700',
  },
});
