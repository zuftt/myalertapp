import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { db } from './../../app/config/FirebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export default function Reports() {
  const [pastReports, setPastReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchReports = async () => {
    setLoading(true);
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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReports();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handlePressReport = (rpt) => {
    console.log("Selected Report ID:", rpt);

    const formattedDate = rpt.createdAt.toDate().toLocaleString(); // Format the createdAt date
    const { latitude, longitude } = rpt.location;

    console.log("Formatted Date:", formattedDate);
    console.log("Location - Latitude:", latitude, "Longitude:", longitude);

    // Update the isOpened status to true in Firebase
    const reportRef = doc(db, 'Reports', rpt.id);
    updateDoc(reportRef, { isOpened: true });

    // Navigate to the verification details screen
    router.push({
      pathname: '/admin/verify_details', // Use the full path here
      params: {
        ...rpt,
        formattedDate,
        latitude,
        longitude,
      },
    });
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
            <TouchableOpacity onPress={() => handlePressReport(item)}>
              <View style={styles.reportItem}>
                <Text style={styles.reportText}>Case Type: {item.caseType}</Text>
                <Text style={styles.reportText}>Created At: {item.createdAt.toDate().toString()}</Text>
                {/* Display Verified status */}
                <Text
                  style={[
                    styles.reportText,
                    { color: item.verified ? 'blue' : 'red' },  // Change color based on verification status
                  ]}
                >
                  Verified: {item.verified ? 'True' : 'False'}
                </Text>
                {/* Display opened/unopened text */}
                <Text
                  style={[ 
                    styles.statusText, item.isOpened && { color: 'blue' }, // Apply blue color for "Opened"
                  ]}
                >
                   {item.isOpened ? 'Opened' : 'Unopened'}
                </Text>

              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.noReportsText}>No previous reports</Text>
          }
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
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
  reportText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  statusText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#FF5733',  // Color for 'Unopened'
    fontWeight: 'bold',
    marginTop: 4,
  },

  openedStatusText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#4CAF50',  // Color for 'Opened'
    fontWeight: 'bold',
    marginTop: 4,
  },
});
