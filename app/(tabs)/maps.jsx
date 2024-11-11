import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Updated coordinates
const mapLat = 2.928250; // Latitude in decimal
const mapLong = 101.778944; // Longitude in decimal

export default function Maps() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mapLat,
          longitude: mapLong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Example Marker */}
        <Marker
          coordinate={{ latitude: mapLat, longitude: mapLong }}
          title={"The Troublers"} // Optional title for the marker
          description={"Hi, there!"} // Optional description
        />
      </MapView>
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
});
