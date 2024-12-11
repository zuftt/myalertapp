import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter(); // Use the router for navigation

  // Navigate to Feedback Screen
  const handleFeedback = () => {
    router.push('/feedback'); // Redirect to feedback screen
  };

  // Navigate to Reports Screen
  const handlePastReports = () => {
    router.push('/reports'); // Redirect to reports screen
  };

  const handleLogout = async () => {
    try {
      await signOut();
      Alert.alert('Logout', 'You have been logged out successfully!');
      router.replace('/login'); // Redirect to login page after logout
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during logout.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Page Title */}
      <Text style={styles.pageTitle}>Profile</Text>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {user?.imageUrl && (
          <Image
            source={{ uri: user.imageUrl }}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.userName}>{user?.fullName}</Text>
        <Text style={styles.userEmail}>{user.primaryEmailAddress?.emailAddress}</Text>
      </View>

      {/* Feedback Button */}
      <TouchableOpacity style={styles.button} onPress={handleFeedback}>
        <Text style={styles.buttonText}>Give Feedback</Text>
      </TouchableOpacity>

      {/* Past Reports Button */}
      <TouchableOpacity style={styles.button} onPress={handlePastReports}>
        <Text style={styles.buttonText}>Past Reports</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  pageTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  userName: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#d9534f', // Red for logout
  },
});
