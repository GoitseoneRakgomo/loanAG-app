import { ThemedText } from '@/components/themed-text';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#0a0c0f',
  surface: '#131619',
  surfaceElevated: '#1a1e23',
  border: '#232830',
  borderLight: '#2e3540',
  accent: '#7fffb2',          // electric mint
  accentDim: '#2dff7a1a',     // mint glow bg
  accentMuted: '#3a5c47',
  textPrimary: '#f0f4f8',
  textSecondary: '#7a8a9a',
  textTertiary: '#4a5668',
  white: '#ffffff',
  danger: '#ff6b6b',
};

/* ─── Animated Fade-In wrapper ─── */
const FadeIn: React.FC<{ delay?: number; children: React.ReactNode }> = ({
  delay = 0,
  children,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};

/* ─── Pill badge ─── */
const Pill: React.FC<{ label: string }> = ({ label }) => (
  <View style={styles.pill}>
    <View style={styles.pillDot} />
    <ThemedText style={styles.pillText}>{label}</ThemedText>
  </View>
);

/* ─── Primary CTA ─── */
const PrimaryButton: React.FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.primaryButton, { transform: [{ scale }] }]}>
        <ThemedText style={styles.primaryButtonText}>{title}</ThemedText>
        <ThemedText style={styles.primaryButtonArrow}>→</ThemedText>
      </Animated.View>
    </Pressable>
  );
};

/* ─── Ghost button ─── */
const GhostButton: React.FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => (
  <Pressable style={({ pressed }) => [styles.ghostButton, pressed && { opacity: 0.6 }]} onPress={onPress}>
    <ThemedText style={styles.ghostButtonText}>{title}</ThemedText>
  </Pressable>
);

/* ─── Stat chip ─── */
const StatChip: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <View style={styles.statChip}>
    <ThemedText style={styles.statValue}>{value}</ThemedText>
    <ThemedText style={styles.statLabel}>{label}</ThemedText>
  </View>
);

/* ─── Feature row ─── */
const FeatureRow: React.FC<{
  icon: string;
  title: string;
  description: string;
  tag?: string;
}> = ({ icon, title, description, tag }) => (
  <View style={styles.featureRow}>
    <View style={styles.featureIconWrap}>
      <ThemedText style={styles.featureIcon}>{icon}</ThemedText>
    </View>
    <View style={styles.featureText}>
      <View style={styles.featureTitleRow}>
        <ThemedText style={styles.featureTitle}>{title}</ThemedText>
        {tag && (
          <View style={styles.featureTag}>
            <ThemedText style={styles.featureTagText}>{tag}</ThemedText>
          </View>
        )}
      </View>
      <ThemedText style={styles.featureDescription}>{description}</ThemedText>
    </View>
    <ThemedText style={styles.featureChevron}>›</ThemedText>
  </View>
);

/* ─── Main Screen ─── */
export default function HomeScreen() {
  const handleGetStarted = () => console.log('Get Started pressed');
  const handleLogIn = () => console.log('Log In pressed');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Top nav bar */}
        <FadeIn delay={0}>
          <View style={styles.navbar}>
            <ThemedText style={styles.navLogo}>AG</ThemedText>
            <GhostButton title="Log in" onPress={handleLogIn} />
          </View>
        </FadeIn>

        {/* Hero */}
        <FadeIn delay={80}>
          <View style={styles.hero}>
            <Pill label="Now available for students" />

            <ThemedText style={styles.heroHeadline}>
              Groceries now,{'\n'}
              <ThemedText style={styles.heroAccent}>pay later.</ThemedText>
            </ThemedText>

            <ThemedText style={styles.heroBody}>
              Loan AG gives students instant credit for groceries — flexible repayment, zero stress.
            </ThemedText>

            <PrimaryButton title="Get started" onPress={handleGetStarted} />
          </View>
        </FadeIn>

        {/* Stats strip */}
        <FadeIn delay={180}>
          <View style={styles.statsStrip}>
            <StatChip value="0%" label="Interest" />
            <View style={styles.statDivider} />
            <StatChip value="R2 000" label="Credit limit" />
            <View style={styles.statDivider} />
            <StatChip value="30 day" label="Repayment" />
          </View>
        </FadeIn>

        {/* Hero visual card */}
        <FadeIn delay={260}>
          <View style={styles.heroCard}>
            <View style={styles.heroCardHeader}>
              <View style={styles.heroCardDot} />
              <ThemedText style={styles.heroCardLabel}>Active credit</ThemedText>
              <View style={styles.heroCardBadge}>
                <ThemedText style={styles.heroCardBadgeText}>● Live</ThemedText>
              </View>
            </View>

            <ThemedText style={styles.heroCardAmount}>R 850.00</ThemedText>
            <ThemedText style={styles.heroCardSub}>Available balance</ThemedText>

            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '57%' }]} />
            </View>
            <View style={styles.progressLabels}>
              <ThemedText style={styles.progressLabel}>R 1 150 used</ThemedText>
              <ThemedText style={styles.progressLabel}>R 2 000 total</ThemedText>
            </View>

            {/* Mini transaction list */}
            <View style={styles.txList}>
              {[
                { store: 'Pick n Pay', amount: '-R 312', time: 'Today' },
                { store: 'Woolworths Food', amount: '-R 489', time: 'Yesterday' },
                { store: 'Checkers', amount: '-R 349', time: '3 days ago' },
              ].map((tx) => (
                <View key={tx.store} style={styles.txRow}>
                  <View style={styles.txLeft}>
                    <View style={styles.txIcon}>
                      <ThemedText style={styles.txIconEmoji}>🛒</ThemedText>
                    </View>
                    <View>
                      <ThemedText style={styles.txStore}>{tx.store}</ThemedText>
                      <ThemedText style={styles.txTime}>{tx.time}</ThemedText>
                    </View>
                  </View>
                  <ThemedText style={styles.txAmount}>{tx.amount}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </FadeIn>

        {/* Features */}
        <FadeIn delay={340}>
          <View style={styles.section}>
            <ThemedText style={styles.sectionLabel}>BUILT FOR YOU</ThemedText>
            <ThemedText style={styles.sectionTitle}>Everything you need</ThemedText>

            <View style={styles.featureList}>
              <FeatureRow
                icon="⚡"
                title="Instant approval"
                description="Apply in under 2 minutes with your student ID"
                tag="New"
              />
              <View style={styles.featureDivider} />
              <FeatureRow
                icon="📆"
                title="Flexible repayment"
                description="Pay weekly or monthly — your choice"
              />
              <View style={styles.featureDivider} />
              <FeatureRow
                icon="🔒"
                title="Spend controls"
                description="Set limits per store and category"
              />
            </View>
          </View>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn delay={420}>
          <View style={styles.bottomCta}>
            <ThemedText style={styles.bottomCtaTitle}>
              Ready to stop stressing about groceries?
            </ThemedText>
            <PrimaryButton title="Create your account" onPress={handleGetStarted} />
            <ThemedText style={styles.bottomCtaNote}>
              No credit history required · Students only
            </ThemedText>
          </View>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={480}>
          <View style={styles.footer}>
            <ThemedText style={styles.footerBrand}>Loan AG</ThemedText>
            <View style={styles.footerLinks}>
              <Pressable onPress={() => console.log('Terms')}>
                <ThemedText style={styles.footerLink}>Terms</ThemedText>
              </Pressable>
              <ThemedText style={styles.footerSep}>·</ThemedText>
              <Pressable onPress={() => console.log('Privacy')}>
                <ThemedText style={styles.footerLink}>Privacy</ThemedText>
              </Pressable>
              <ThemedText style={styles.footerSep}>·</ThemedText>
              <Pressable onPress={() => console.log('Help')}>
                <ThemedText style={styles.footerLink}>Help</ThemedText>
              </Pressable>
            </View>
          </View>
        </FadeIn>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingBottom: 48,
  },

  /* Navbar */
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  navLogo: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 2,
  },

  /* Ghost button */
  ghostButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ghostButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },

  /* Pill */
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.accentMuted,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accent,
    letterSpacing: 0.3,
  },

  /* Hero */
  hero: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  heroHeadline: {
    fontSize: 44,
    fontWeight: '800',
    color: COLORS.textPrimary,
    lineHeight: 52,
    letterSpacing: -1.5,
    marginBottom: 16,
  },
  heroAccent: {
    color: COLORS.accent,
  },
  heroBody: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 26,
    marginBottom: 32,
    maxWidth: 320,
  },

  /* Primary button */
  primaryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 17,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    alignSelf: 'stretch',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.bg,
    letterSpacing: 0.2,
  },
  primaryButtonArrow: {
    fontSize: 18,
    color: COLORS.bg,
    fontWeight: '600',
  },

  /* Stats strip */
  statsStrip: {
    flexDirection: 'row',
    marginHorizontal: 24,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statChip: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 2,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.border,
  },

  /* Hero card */
  heroCard: {
    marginHorizontal: 24,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    marginBottom: 36,
  },
  heroCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  heroCardDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
  heroCardLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
    flex: 1,
  },
  heroCardBadge: {
    backgroundColor: '#1a2e1f',
    borderRadius: 100,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.accentMuted,
  },
  heroCardBadgeText: {
    fontSize: 11,
    color: COLORS.accent,
    fontWeight: '700',
  },
  heroCardAmount: {
    fontSize: 38,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -1,
    marginBottom: 4,
  },
  heroCardSub: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginBottom: 20,
    fontWeight: '500',
  },
  progressBarBg: {
    height: 5,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 100,
    marginBottom: 8,
  },
  progressBarFill: {
    height: 5,
    backgroundColor: COLORS.accent,
    borderRadius: 100,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  progressLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
    fontWeight: '500',
  },

  /* Transaction list */
  txList: {
    gap: 16,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txIconEmoji: {
    fontSize: 18,
  },
  txStore: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  txTime: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 1,
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },

  /* Section */
  section: {
    paddingHorizontal: 24,
    marginBottom: 36,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textTertiary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 24,
  },

  /* Feature list */
  featureList: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  featureDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 20,
  },
  featureIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureIcon: {
    fontSize: 22,
  },
  featureText: {
    flex: 1,
  },
  featureTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  featureTag: {
    backgroundColor: COLORS.accentDim,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: COLORS.accentMuted,
  },
  featureTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.accent,
    letterSpacing: 0.3,
  },
  featureDescription: {
    fontSize: 13,
    color: COLORS.textTertiary,
    lineHeight: 18,
  },
  featureChevron: {
    fontSize: 22,
    color: COLORS.textTertiary,
    fontWeight: '300',
  },

  /* Bottom CTA */
  bottomCta: {
    marginHorizontal: 24,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 28,
    marginBottom: 36,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'stretch',
  },
  bottomCtaTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 20,
    lineHeight: 30,
  },
  bottomCtaNote: {
    fontSize: 12,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginTop: 14,
    fontWeight: '500',
  },

  /* Footer */
  footer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
    gap: 12,
  },
  footerBrand: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textTertiary,
    letterSpacing: 1,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerLink: {
    fontSize: 12,
    color: COLORS.textTertiary,
    fontWeight: '500',
  },
  footerSep: {
    color: COLORS.textTertiary,
    fontSize: 12,
  },
});