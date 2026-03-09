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
import { reservationsAPI, transactionsAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6b7280' },
  tabContainer: { flexDirection: 'row', marginBottom: 20, gap: 8 },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
  },
  tabActive: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  tabText: { fontWeight: '600', color: '#374151' },
  tabTextActive: { fontWeight: '600', color: '#ffffff' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardRow: { marginBottom: 6 },
  label: { fontSize: 12, color: '#6b7280', fontWeight: '600' },
  value: { fontSize: 14, color: '#1f2937', marginBottom: 4 },
  price: { fontSize: 14, fontWeight: 'bold', color: '#10b981' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', color: '#6b7280', paddingVertical: 32 },
});

export default function HistoryScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'reservations' | 'transactions'>('reservations');
  const [reservations, setReservations] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const [resRes, txRes] = await Promise.all([
        reservationsAPI.getHistory(),
        transactionsAPI.getMyTransactions(),
      ]);
      setReservations(resRes.data);
      setTransactions(txRes.data);
    } catch (error) {
      console.error('Failed to load history');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  const data =
    activeTab === 'reservations' ? reservations : transactions;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>Your transactions</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={
              activeTab === 'reservations' ? styles.tabActive : styles.tab
            }
            onPress={() => setActiveTab('reservations')}
          >
            <Text
              style={
                activeTab === 'reservations'
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              Reservations
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === 'transactions' ? styles.tabActive : styles.tab
            }
            onPress={() => setActiveTab('transactions')}
          >
            <Text
              style={
                activeTab === 'transactions'
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              Transactions
            </Text>
          </TouchableOpacity>
        </View>

        {data.length === 0 ? (
          <Text style={styles.emptyText}>No history</Text>
        ) : (
          data.map((item: any, index: any) => (
            <View key={item.id || index} style={styles.card}>
              {activeTab === 'reservations' ? (
                <>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>Service</Text>
                    <Text style={styles.value}>{item.service.title}</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>Status</Text>
                    <Text style={styles.value}>{item.status}</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>Price</Text>
                    <Text style={styles.price}>R${item.price.toFixed(2)}</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>Service</Text>
                    <Text style={styles.value}>{item.service.title}</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={styles.label}>Amount</Text>
                    <Text style={styles.price}>R${item.amount.toFixed(2)}</Text>
                  </View>
                </>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
