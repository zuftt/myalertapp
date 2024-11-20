import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router';

export default function ReportDetail() {
  const rpt = useLocalSearchParams(); // Get the passed params
  const navigation = useNavigation(); // Use navigation to customize screen options

  // Hide the title but keep the back button
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '', // Hide the title
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
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
    </View>
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
});
