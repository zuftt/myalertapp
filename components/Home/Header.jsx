import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState(null); // State to store the current user

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user from Firebase Auth
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const displayName = user?.displayName || user?.email || "Guest"; // Use name or email or fallback to 'Guest'

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greetingText}>Welcome,</Text>
        <Text style={styles.nameText}>{displayName}</Text>
      </View>

      {user?.photoURL && (
        <Image
          source={{ uri: user.photoURL }}
          style={styles.profileImage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  greetingText: {
    fontFamily: 'outfit',
    fontSize: 18,
  },
  nameText: {
    fontFamily: "outfit-medium", // Use 'outfit-medium' font
    fontSize: 18,
    fontWeight: "bold",
    
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 99,
  },
});
