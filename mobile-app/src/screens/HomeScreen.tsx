import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  userInfo: {
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  userGreeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  userText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 4,
  },
  buttonGrid: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#10b981',
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
  logoutButton: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
});

export default function HomeScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome! 👋</Text>
          <Text style={styles.subtitle}>
            {user.role === 'CLIENT'
              ? 'Browse and book services'
              : 'Create and manage your services'}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userGreeting}>{user.name}</Text>
          <Text style={styles.userText}>Role: {user.role}</Text>
          <Text style={styles.userText}>
            Balance: R${user.balance.toFixed(2)}
          </Text>
        </View>

        <View style={styles.buttonGrid}>
          {user.role === 'CLIENT' ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Services')}
              >
                <Text style={styles.buttonText}>Browse Services</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => navigation.navigate('History')}
              >
                <Text style={styles.buttonText}>My Bookings</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MyServices')}
              >
                <Text style={styles.buttonText}>My Services</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => navigation.navigate('CreateService')}
              >
                <Text style={styles.buttonText}>Create Service</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('History')}
              >
                <Text style={styles.buttonText}>Earnings</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
