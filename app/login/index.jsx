import { useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Image, ImageBackground, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [navigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    if (rootNavigationState?.key) {
      setNavigationReady(true);
    }
  }, [rootNavigationState]);

  // Wait for navigation to be ready
  if (!navigationReady) {
    return <Text>Loading navigation...</Text>;
  }

  return (
    <ImageBackground
      source={require("./../../assets/images/background.jpg")} // Background image
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 120,
      }}
      resizeMode="cover"
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
          color: "#ffffff",
          marginTop: 20,
        }}
      >
        Your safety is our priority
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 15,
          textAlign: "center",
          color: "#ffffff",
          marginTop: 20,
        }}
      >
        Let’s help build a safer community
      </Text>

      {/* Orange Button */}
      <Pressable
        onPress={() => router.replace("/login/login")} // Redirect to login page
        style={{
          padding: 15,
          marginTop: 40,
          backgroundColor: "#ff8c00", // Orange color
          width: "80%",
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000", // Shadow for button
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 22,
            textAlign: "center",
            color: "#ffffff", // White text
          }}
        >
          Log In
        </Text>
      </Pressable>
    </ImageBackground>
  );
}
