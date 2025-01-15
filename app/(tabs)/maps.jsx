import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust path as necessary

export default function Maps() {
  const [cases, setCases] = useState([]);
  const [alerts, setAlerts] = useState([]); // New state for Alerts
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch case data from Firestore
      const caseQuerySnapshot = await getDocs(collection(db, "Reports"));
      const casesData = caseQuerySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((caseItem) => caseItem.verified); // Filter to include only verified cases
      setCases(casesData);

      // Fetch alerts data from Firestore
      const alertQuerySnapshot = await getDocs(collection(db, "Alerts"));
      const alertsData = alertQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlerts(alertsData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }

    // Get user's location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow location permissions to display your location."
      );
      setLoading(false);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          latitude: userLocation ? userLocation.latitude : 2.92825,
          longitude: userLocation ? userLocation.longitude : 101.778944,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {/* Case Markers */}
        {cases.map(
          (caseItem) =>
            caseItem.location && (
              <Marker
                key={caseItem.id}
                coordinate={{
                  latitude: caseItem.location.latitude,
                  longitude: caseItem.location.longitude,
                }}
                title={caseItem.caseType}
                description={`${caseItem.caseDetails}`}
                pinColor="blue" // Set distinct pin color for Reports
              />
            )
        )}

        {/* Alerts Markers */}
        {alerts.map((alertItem) => {
          // Ensure latitude and longitude are available
          const latitude =
            alertItem.latitude ||
            (alertItem.location && alertItem.location.latitude);
          const longitude =
            alertItem.longitude ||
            (alertItem.location && alertItem.location.longitude);

          // Render marker only if valid coordinates are available
          if (latitude && longitude) {
            return (
              <Marker
                key={alertItem.id}
                coordinate={{
                  latitude,
                  longitude,
                }}
                title={alertItem.title || "No Title"} // Fallback for missing title
                description={alertItem.description || "No Description"} // Fallback for missing description
                pinColor="red" // Distinct color for Alerts
              />
            );
          }

          // Skip if no valid coordinates
          return null;
        })}
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
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -75 }],
    width: 150,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    padding: 10,
    elevation: 5,
  },
});
