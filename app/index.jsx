import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Index() {
  const router = useRouter(); // Initialize the router for navigation
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    const auth = getAuth();

    // Listen for changes to the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Once authentication is checked, stop loading

      if (user) {
        // Redirect to home if the user is logged in
        router.replace("/(tabs)/home");
      } else {
        // Redirect to login if the user is not logged in
        router.replace("/login");
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <Text>Loading navigation...</Text>; // Display a loading message while preparing navigation
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Redirecting...</Text> {/* Fallback UI (optional) */}
    </View>
  );
}
