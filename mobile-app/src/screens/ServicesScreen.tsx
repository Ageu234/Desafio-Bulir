import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { servicesAPI, reservationsAPI, usersAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6b7280' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: '#dc2626', padding: 12, backgroundColor: '#fee2e2', borderRadius: 8 },
  success: { color: '#059669', padding: 12, backgroundColor: '#dcfce7', borderRadius: 8 },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  serviceTitle: { fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4 },
  serviceDesc: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
  servicePrice: { fontSize: 18, fontWeight: 'bold', color: '#10b981', marginBottom: 8 },
  providerName: { fontSize: 13, color: '#6b7280', marginBottom: 12 },
  button: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontWeight: '600' },
  emptyText: { textAlign: 'center', color: '#6b7280', paddingVertical: 32 },
});

export default function ServicesScreen({ navigation }: any) {
  const { user, refreshBalance } = useAuth();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      loadServices();
    }, [])
  );

  const loadServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServices(response.data);
      setError('');
    } catch (err: any) {
      setError('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBook = async (serviceId: string) => {
    if (user?.role !== 'CLIENT') return;

    try {
      await reservationsAPI.create({ serviceId });
      await refreshBalance();
      setSuccess('Service booked successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to book service');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Available Services</Text>
          <Text style={styles.subtitle}>Browse and book services</Text>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>{success}</Text>}

        {services.length === 0 ? (
          <Text style={styles.emptyText}>No services available</Text>
        ) : (
          services.map((service: any) => (
            <View key={service.id} style={styles.serviceCard}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDesc}>{service.description}</Text>
              <Text style={styles.servicePrice}>R${service.price.toFixed(2)}</Text>
              <Text style={styles.providerName}>Provider: {service.provider.name}</Text>
              {user?.role === 'CLIENT' && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleBook(service.id)}
                >
                  <Text style={styles.buttonText}>Book Now</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
