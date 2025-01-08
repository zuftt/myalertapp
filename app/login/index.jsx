import {
  View,
  Text,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import Colors from "./../../constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";


export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LogInScreen() {
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // Request notification permissions
  const requestNotificationPermission = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // If permission has not been granted, ask for it
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Check the final status
    if (finalStatus !== "granted") {
      console.error("Notification permission not granted");
      Alert.alert(
        "Permission required",
        "Please enable notifications to stay updated."
      );
      return false;
    }

    // Notifications permission granted
    console.log("Notification permission granted");
    return true;
  };

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
      } else if (signIn) {
        await setActive(signIn.createdSessionId);
      } else if (signUp) {
        await setActive(signUp.createdSessionId);
      }

      // Ask for notification permissions after sign-in
      const notificationGranted = await requestNotificationPermission();
      if (notificationGranted) {
        console.log("Notifications enabled successfully!");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow]);

  const onAdminPress = () => {
    router.push("/admin"); // Navigate to the /admin route
  };

  return (
    <ImageBackground
      source={require("./../../assets/images/background.jpg")} // Background image
      style={{
        flex: 1, // Full screen background
        justifyContent: "flex-start", // Align content at the top
      }}
      resizeMode="cover" // Ensure the image covers the entire background
    >
      <View
        style={{
          paddingTop: 120, // Space from the top of the screen
          alignItems: "center", // Horizontally center the content
        }}
      >
        <Image
          source={require("./../../assets/images/login.png")}
          style={{
            width: "80%",
            height: 300,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            textAlign: "center",
            color: "#ffffff", // White text for contrast
            marginTop: 20, // Space above the text
          }}
        >
          Your safety is our priority
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 15,
            textAlign: "center",
            color: "#ffffff", // White text for contrast
            marginTop: 20, // Space above the text
          }}
        >
          Let's help build a safer community
        </Text>

        {/* Updated Pressable Button */}
        <Pressable
          onPress={onPress}
          style={{
            padding: 15,
            marginTop: 40,
            backgroundColor: "#ff8c00", // More vibrant orange color
            width: "80%",
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000", // Shadow color
            shadowOffset: { width: 0, height: 4 }, // Shadow offset
            shadowOpacity: 0.1, // Shadow opacity
            shadowRadius: 6, // Shadow blur radius
            elevation: 5, // Elevation for Android shadow effect
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 22, // Slightly larger text
              textAlign: "center",
              color: "#ffffff", // White text for contrast
            }}
          >
            Get started
          </Text>
        </Pressable>
        <TouchableOpacity onPress={onAdminPress}>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 14,
              textAlign: "center",
              color: "#ffffff", // White text for contrast
              textDecorationLine: "underline", // Underline text
              marginTop: 30, // Add some space above the admin text
            }}
          >
            Admin
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
