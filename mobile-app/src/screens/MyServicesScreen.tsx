import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { servicesAPI } from '@/lib/api';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6b7280' },
  createButton: {
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  serviceTitle: { fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4 },
  servicePrice: { fontSize: 16, fontWeight: 'bold', color: '#10b981', marginBottom: 12 },
  buttonGroup: { flexDirection: 'row', gap: 8 },
  deleteButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontWeight: '600', fontSize: 14 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', color: '#6b7280', paddingVertical: 32 },
});

export default function MyServicesScreen({ navigation }: any) {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadServices();
    }, [])
  );

  const loadServices = async () => {
    try {
      const response = await servicesAPI.getMyServices();
      setServices(response.data);
    } catch (error) {
      console.error('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await servicesAPI.delete(id);
      await loadServices();
    } catch (error) {
      console.error('Failed to delete service');
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
          <Text style={styles.title}>My Services</Text>
          <Text style={styles.subtitle}>Manage your services</Text>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateService')}
        >
          <Text style={styles.buttonText}>+ Create New Service</Text>
        </TouchableOpacity>

        {services.length === 0 ? (
          <Text style={styles.emptyText}>No services yet</Text>
        ) : (
          services.map((service: any) => (
            <View key={service.id} style={styles.serviceCard}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.servicePrice}>R${service.price.toFixed(2)}</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(service.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
