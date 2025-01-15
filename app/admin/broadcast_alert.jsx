import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function BroadcastAlert() {
  const [pastAlerts, setPastAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Fetch alerts from Firestore
  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Alerts'));
      const alertsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPastAlerts(alertsData);
    } catch (error) {
      console.error('Error fetching alerts: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh alerts
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAlerts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Navigate to Create Alert page
  const handleAddAlert = () => {
    router.push('admin/create_alert');
  };

  // Handle alert item press
  const handlePressAlert = (alert) => {
    console.log("Selected Alert ID:", alert.id);
    router.push({
      pathname: '/alert_details',
      params: { ...alert },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sliderTitle}>Past Alerts</Text>
      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <FlatList
          data={pastAlerts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePressAlert(item)}>
              <View style={styles.alertItem}>
                <Text style={styles.alertText}>Title: {item.title}</Text>
                <Text style={styles.alertText}>
                  Created At: {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleString() : 'N/A'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.noAlertsText}>No previous alerts</Text>}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddAlert}>
        <Text style={styles.addButtonText}>+ Add New Alert</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontFamily: 'outfit',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sliderTitle: {
    fontFamily: 'outfit',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noAlertsText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  alertItem: {
    padding: 15,
    backgroundColor: '#FFF5E4',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD580',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  alertText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
});
