import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  input2: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    minHeight: 100,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  switchButton: {
    backgroundColor: '#6366f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: '#dc2626',
    marginBottom: 12,
    fontSize: 14,
  },
  successText: {
    color: '#059669',
    marginBottom: 12,
    fontSize: 14,
  },
  linkText: {
    color: '#2563eb',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e5e7eb',
  },
  toggleButtonActive: {
    flex: 1,
    padding: 10,
    backgroundColor: '#3b82f6',
  },
  toggleButtonText: {
    textAlign: 'center',
    color: '#374151',
    fontWeight: '600',
  },
  toggleButtonTextActive: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default function LoginScreen({ navigation }: any) {
  const [loginType, setLoginType] = useState<'email' | 'nif'>('email');
  const [email, setEmail] = useState('provider@test.com');
  const [nif, setNif] = useState('');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, loginByNif } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      setError('');
    }, [])
  );

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      if (loginType === 'email') {
        if (!email || !password) {
          setError('Email and password are required');
          setIsLoading(false);
          return;
        }
        await login(email, password);
      } else {
        if (!nif || !password) {
          setError('NIF and password are required');
          setIsLoading(false);
          return;
        }
        await loginByNif(nif, password);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🎯 Service Booking</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.label}>Login Method</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={loginType === 'email' ? styles.toggleButtonActive : styles.toggleButton}
            onPress={() => setLoginType('email')}
          >
            <Text
              style={
                loginType === 'email'
                  ? styles.toggleButtonTextActive
                  : styles.toggleButtonText
              }
            >
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={loginType === 'nif' ? styles.toggleButtonActive : styles.toggleButton}
            onPress={() => setLoginType('nif')}
          >
            <Text
              style={
                loginType === 'nif' ? styles.toggleButtonTextActive : styles.toggleButtonText
              }
            >
              NIF
            </Text>
          </TouchableOpacity>
        </View>

        {loginType === 'email' ? (
          <>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!isLoading}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>NIF</Text>
            <TextInput
              style={styles.input}
              placeholder="123.456.789-00"
              value={nif}
              onChangeText={setNif}
              editable={!isLoading}
            />
          </>
        )}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => navigation.navigate('Register')}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>

        <Text style={styles.linkText}>Demo: provider@test.com / 123456</Text>
      </View>
    </ScrollView>
  );
}
