import { useUser, ClerkLoaded } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();
  const [navigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    if (rootNavigationState?.key) {
      setNavigationReady(true);
    }
  }, [rootNavigationState]);

  // Wait for both navigation and Clerk to be ready
  if (!navigationReady) {
    return <Text>Loading navigation...</Text>;
  }

  return (
    <ClerkLoaded>
      <View style={{ flex: 1 }}>
        {user ? (
          <Redirect href="/(tabs)/home" /> // Redirect to home if user is logged in
        ) : (
          <Redirect href="/login" /> // Redirect to login if user is not authenticated
        )}
      </View>
    </ClerkLoaded>
  );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           