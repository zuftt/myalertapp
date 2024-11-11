import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { db } from './../../app/config/FirebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

export default function Reports() {
  const [pastReports, setPastReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const router = useRouter();

  // Function to fetch reports from Firestore
  const fetchReports = async () => {
    setLoading(true); // Start loading when fetching reports
    try {
      const querySnapshot = await getDocs(collection(db, 'Reports'));
      const reportsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPastReports(reportsData);
    } catch (error) {
      console.error('Error fetching reports: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReports(); // Fetch new reports
    setRefreshing(false); // Stop refreshing
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleAddReport = () => {
    router.push('/new_report');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sliderTitle}>Past Reports</Text>
      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <FlatList
          data={pastReports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reportItem}>
              <Text style={styles.reportText}>Case Type: {item.caseType}</Text>
              <Text style={styles.reportText}>Created At: {item.createdAt.toDate().toString()}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.noReportsText}>No previous reports</Text> // Display message when no reports
          }
          refreshing={refreshing} // Show refreshing state
          onRefresh={onRefresh} // Handle refresh action
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddReport}>
        <Text style={styles.addButtonText}>+ Add New Report</Text>
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
  noReportsText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  reportItem: {
    padding: 15,
    backgroundColor: '#FDF6E4',
    marginBottom: 10,
    borderRadius: 8,
  },
  reportText: {
    fontSize: 14,
  },
});
