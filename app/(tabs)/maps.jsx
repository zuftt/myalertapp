import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../app/config/FirebaseConfig'; // Adjust path as necessary

export default function Maps() {
  const [cases, setCases] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch case data from Firestore
      const querySnapshot = await getDocs(collection(db, 'Reports'));
      const casesData = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(caseItem => caseItem.verified); // Filter to include only verified cases
  
      setCases(casesData);
    } catch (error) {
      console.error("Error fetching case data: ", error);
    }
  
    // Get user's location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "Allow location permissions to display your location.");
      setLoading(false); // Stop loading if permission is denied
      return;
    }
  
    try {
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location");
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on initial render

  // Show loading indicator while fetching user's location and cases
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 2.928250,
          longitude: userLocation ? userLocation.longitude : 101.778944,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true} // Enable built-in user location marker
      >
        {/* Case Markers */}
        {cases.map(caseItem => (
          caseItem.location && (
            <Marker
              key={caseItem.id}
              coordinate={{
                latitude: caseItem.location.latitude,
                longitude: caseItem.location.longitude,
              }}
              title={caseItem.caseType}
              description={`${caseItem.caseDetails} `}
            />
          )
        ))}
      </MapView>

      {/* Refresh Button */}
      <View style={styles.buttonContainer}>
        <Button title="Refresh" onPress={fetchData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -75 }],
    width: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
  },
});
