import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router';
import { db } from './../../app/config/FirebaseConfig';  // Import your Firebase config
import { doc, updateDoc } from 'firebase/firestore'; // Firebase functions to update data

export default function ReportDetail() {
  const rpt = useLocalSearchParams(); // Get the passed params
  const navigation = useNavigation(); // Use navigation to customize screen options

  // Hide the title but keep the back button
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '', // Hide the title
    });
  }, [navigation]);

  const handleVerification = async (status) => {
    const reportRef = doc(db, 'Reports', rpt.id); // Get reference to the report document
  
    try {
      // If status is true, set verified to true; if status is false, set verified to false
      const updatedStatus = status; // Directly use the status value (true or false)
  
      await updateDoc(reportRef, {
        verified: updatedStatus, // Update the 'verified' field in Firebase
      });
  
      // Show a success message after the update
      Alert.alert('Success', `Report has been ${status ? 'verified' : 'rejected'}.`);
  
      // Optionally, navigate back or update UI to reflect changes
      navigation.goBack();
    } catch (error) {
      console.error('Error updating verification status: ', error);
      Alert.alert('Error', 'Failed to update the report status.');
    }
  };
  
  
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Case Details</Text>
      
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{rpt.name}</Text>

      <Text style={styles.label}>Gender:</Text>
      <Text style={styles.value}>{rpt.gender}</Text>

      <Text style={styles.label}>Identification Number:</Text>
      <Text style={styles.value}>{rpt.identificationNumber}</Text>

      <Text style={styles.label}>Case Type:</Text>
      <Text style={styles.value}>{rpt.caseType}</Text>

      <Text style={styles.label}>Case Details:</Text>
      <Text style={styles.value}>{rpt.caseDetails}</Text>

      <Text style={styles.label}>Address:</Text>
      <Text style={styles.value}>{rpt.address}</Text>

      <Text style={styles.label}>Contact Number:</Text>
      <Text style={styles.value}>{rpt.contactNumber}</Text>

      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>
        Latitude: {rpt.latitude}, Longitude: {rpt.longitude}
      </Text>

      <Text style={styles.label}>Created At:</Text>
      <Text style={styles.value}>{rpt.formattedDate}</Text>

      {/* Verification buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'blue' }]}
          onPress={() => handleVerification(true)} // Verify the report
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => handleVerification(false)} // Reject the report
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF5E4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'outfit',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 10,
    fontFamily: 'outfit',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'outfit',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 20,  // Increased vertical padding for taller buttons
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 50,
  },
  buttonText: {
    fontFamily: 'outfit',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
