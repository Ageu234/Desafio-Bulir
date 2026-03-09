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
  errorText: {
    color: '#dc2626',
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
  roleContainer: {
    marginVertical: 16,
  },
  roleOption: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  roleOptionSelected: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  roleDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default function RegisterScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    name: '',
    nif: '',
    email: '',
    password: '',
    role: 'CLIENT' as 'CLIENT' | 'SERVICE_PROVIDER',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();

  const handleRegister = async () => {
    setError('');
    setIsLoading(true);

    if (!formData.name || !formData.nif || !formData.email || !formData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      Alert.alert('Success', 'Account created successfully!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our service community</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={formData.name}
            onChangeText={(text: string) => setFormData({ ...formData, name: text })}
          editable={!isLoading}
        />

        <Text style={styles.label}>NIF</Text>
        <TextInput
          style={styles.input}
          placeholder="123.456.789-00"
          value={formData.nif}
            onChangeText={(text: string) => setFormData({ ...formData, nif: text })}
          editable={!isLoading}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="your@email.com"
          value={formData.email}
            onChangeText={(text: string) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          editable={!isLoading}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="At least 6 characters"
          value={formData.password}
            onChangeText={(text: string) => setFormData({ ...formData, password: text })}
          secureTextEntry
          editable={!isLoading}
        />

        <Text style={styles.label}>Account Type</Text>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={
              formData.role === 'CLIENT' ? styles.roleOptionSelected : styles.roleOption
            }
            onPress={() => setFormData({ ...formData, role: 'CLIENT' })}
            disabled={isLoading}
          >
            <Text style={styles.roleTitle}>👤 Client</Text>
            <Text style={styles.roleDescription}>Browse and book services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              formData.role === 'SERVICE_PROVIDER'
                ? styles.roleOptionSelected
                : styles.roleOption
            }
            onPress={() => setFormData({ ...formData, role: 'SERVICE_PROVIDER' })}
            disabled={isLoading}
          >
            <Text style={styles.roleTitle}>🛠️ Service Provider</Text>
            <Text style={styles.roleDescription}>Offer services to clients</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Creating Account...' : 'Register'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          disabled={isLoading}
        >
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
