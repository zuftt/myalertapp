import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Profile() {
  const [user, setUser] = useState(null); // Store the current user
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user from Firebase Auth
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Navigate to Feedback Screen
  const handleFeedback = () => {
    router.push("/feedback");
  };

  // Navigate to Reports Screen
  const handlePastReports = () => {
    router.push("/reports");
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      Alert.alert("Logout", "You have been logged out successfully!");
      router.replace("/login"); // Redirect to login page after logout
    } catch (error) {
      Alert.alert("Error", "Something went wrong during logout.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Page Title */}
      <Text style={styles.pageTitle}>Profile</Text>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require("./../../assets/images/default.jpg") // Local placeholder image
          }
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user?.displayName || "Guest User"}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
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
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  pageTitle: {
    fontFamily: "outfit-medium",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Ensures the image is circular
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#FFD580", // Optional border for better styling
  },
  userName: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  userEmail: {
    fontFamily: "outfit",
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: "outfit-medium",
    fontSize: 16,
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#d9534f", // Red for logout
  },
});
