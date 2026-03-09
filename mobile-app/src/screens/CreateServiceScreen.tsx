import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { servicesAPI } from '@/lib/api';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6b7280', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  input2: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    minHeight: 100,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
  error: { color: '#dc2626', marginBottom: 12 },
  success: { color: '#059669', marginBottom: 12 },
});

export default function CreateServiceScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!formData.title || !formData.description || !formData.price) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);
    try {
      await servicesAPI.create({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
      });
      navigation.navigate('MyServices');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create service');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create New Service</Text>
        <Text style={styles.subtitle}>Add your service to the platform</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <Text style={styles.label}>Service Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., House Cleaning"
          value={formData.title}
          onChangeText={(text: string) => setFormData({ ...formData, title: text })}
          editable={!isLoading}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input2}
          placeholder="Describe your service..."
          value={formData.description}
          onChangeText={(text: string) => setFormData({ ...formData, description: text })}
          multiline
          editable={!isLoading}
        />

        <Text style={styles.label}>Price (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={formData.price}
          onChangeText={(text: string) => setFormData({ ...formData, price: text })}
          keyboardType="decimal-pad"
          editable={!isLoading}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Creating...' : 'Create Service'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
