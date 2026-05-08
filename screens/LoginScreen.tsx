import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';

const palette = {
  background: '#f5f2e4',
  surface: '#ffffff',
  primary: '#88caa8',
  slate: '#3a434e',
  text: '#000000',
  muted: '#566063',
  error: '#b54b4b',
};

export default function LoginScreen() {
  const router = useRouter();
  const { login, user, initializing, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!initializing && user) {
      try {
        router.replace('/dashboard');
      } catch (err) {
        console.warn('[LoginScreen] Navigation error:', err);
      }
    }
  }, [initializing, router, user]);

  const handleSubmit = async () => {
    setError('');
    try {
      await login(username, password);
      try {
        router.replace('/dashboard');
      } catch (navErr) {
        console.warn('[LoginScreen] Navigation error:', navErr);
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Unable to sign in';
      console.warn('[LoginScreen] Login error:', errMsg);
      setError(errMsg);
    }
  };

  const canSubmit = username.trim().length > 0 && password.length > 0 && !loading;

  if (initializing) {
    return (
      <SafeAreaView style={styles.loaderPage}>
        <ActivityIndicator size="large" color={palette.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.headline}>Sign in to continue</Text>
          <Text style={styles.description}>Use your student account to access credit for groceries.</Text>

          <View style={styles.formCard}>
            <Text style={styles.fieldLabel}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="groot"
              placeholderTextColor="rgba(85, 96, 99, 0.4)"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              editable={!loading}
            />

            <Text style={[styles.fieldLabel, { marginTop: 20 }]}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="rgba(85, 96, 99, 0.4)"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              onSubmitEditing={handleSubmit}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Pressable
              style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!canSubmit}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.submitButtonText}>Log In</Text>
              )}
            </Pressable>
          </View>

          <Pressable onPress={() => router.replace('/')} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to landing</Text>
          </Pressable>

          <View style={styles.hintCard}>
            <Text style={styles.hintTitle}>Try the secure demo login</Text>
            <Text style={styles.hintDescription}>Username: groot · Password: 1234groot</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
    justifyContent: 'center',
  },
  greeting: {
    color: palette.slate,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  headline: {
    color: palette.text,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  fieldLabel: {
    color: palette.slate,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f7f5f1',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: palette.slate,
    fontSize: 16,
  },
  submitButton: {
    marginTop: 28,
    backgroundColor: palette.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#b1d6c2',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  backButtonText: {
    color: palette.slate,
    fontSize: 15,
    fontWeight: '600',
  },
  hintCard: {
    marginTop: 28,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8e2',
  },
  hintTitle: {
    color: palette.slate,
    fontWeight: '700',
    marginBottom: 8,
  },
  hintDescription: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    marginTop: 16,
    color: palette.error,
    fontSize: 14,
    fontWeight: '600',
  },
});
