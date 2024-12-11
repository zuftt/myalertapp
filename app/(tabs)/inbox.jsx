import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './../../app/config/FirebaseConfig'; // Adjust path as necessary

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial alerts from Firestore
  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Alerts'));
      const alertsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(alertsData);
    } catch (error) {
      console.error('Error fetching alerts: ', error);
      Alert.alert('Error', 'Failed to load notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Listen for real-time updates on the Alerts collection
  const listenForNewAlerts = () => {
    const unsubscribe = onSnapshot(collection(db, 'Alerts'), (querySnapshot) => {
      const newAlerts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(newAlerts);
    }, (error) => {
      console.error('Error listening to alerts: ', error);
    });

    return unsubscribe; // Cleanup the listener when the component is unmounted
  };

  useEffect(() => {
    fetchAlerts();
    const unsubscribe = listenForNewAlerts();

    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component is unmounted
    };
  }, []);

  const handleNotificationPress = (notification) => {
    Alert.alert(notification.title, notification.description);
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationContainer}
      onPress={() => handleNotificationPress(item)}
    >
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10 }}
          ListEmptyComponent={
            <Text style={styles.noNotificationsText}>
              No notifications to display.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  notificationContainer: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
  },
});
