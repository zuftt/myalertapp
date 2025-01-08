import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Alert, Text } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "@/components/notifications";
import * as Clipboard from "expo-clipboard";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Token cache for Clerk
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("SecureStore set item error: ", err);
    }
  },
};

// Make sure the publishable key is properly set in your environment variables
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  // Show loading message until fonts are fully loaded
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log("token :", token);
      Alert.alert(
        "Push Notification Token",
        `Your token is: ${token}`,
        [
          { text: "Copy Token", onPress: () => Clipboard.setString(token) },
          { text: "OK", onPress: () => console.log("Alert dismissed") },
        ],
        { cancelable: true }
      );
    });
  }, []);
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="new_report/index"
          options={{
            title: "Make a new report",
          }}
        />
        <Stack.Screen
          name="feedback/index"
          options={{
            title: "Submit your feedback",
          }}
        />
        <Stack.Screen
          name="admin/index"
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="admin/create_alert"
          options={{
            title: "Create an alert",
          }}
        />
      </Stack>
    </ClerkProvider>
  );
}
