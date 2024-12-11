import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const options = {
  headerShown: false, // Disable the header for this screen
};

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      {/* Report Verification Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('admin/report_verification')}
      >
        <Text style={styles.buttonText}>Report Verification</Text>
      </TouchableOpacity>

      {/* Broadcast Alert Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('admin/broadcast_alert')}
      >
        <Text style={styles.buttonText}>Broadcast Alert</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light grey background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    marginBottom: 30,
    color: '#333', // Dark grey text
  },
  button: {
    backgroundColor: '#4CAF50', // Green button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    shadowColor: '#000', // Shadow effect
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Elevation for Android shadow
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    color: '#fff',
  },
});
