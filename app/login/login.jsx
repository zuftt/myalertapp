import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router"; // Import useRouter

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize router

  const handleSignIn = async () => {
    const auth = getAuth();

    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", `Welcome, ${userCredential.user.email}!`);
      router.replace("/(tabs)/home"); // Redirect to /home after successful login
    } catch (error) {
      console.error("Login error", error);
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleSignUpRedirect = () => {
    router.push("/login/new_user"); // Redirect to new_user.jsx
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Log In Button */}
        <Pressable onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>

        {/* Sign Up Button */}
        <Pressable onPress={handleSignUpRedirect} style={[styles.button, styles.signUpButton]}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#ff8c00",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: "#4caf50", // Green color for the sign-up button
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
