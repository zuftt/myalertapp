import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
export default function Home() {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      console.log("token :", token)
    );
  }, []);
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Header />
      <Slider />

      {/* Add image here */}
      <Image
        source={require("./../../assets/images/home.png")} // Adjust the path if necessary
        style={{ width: "100%", height: 400, marginVertical: 20 }} // Adjust the style as needed
      />
      <Text
        style={{
          alignContent: "center",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 15,
          paddingLeft: 10,
        }}
      >
        Let's make our community a better place
      </Text>
    </View>
  );
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("myNotificationChannel", {
      name: "A channel is needed for the permissions prompt to appear",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    try {
      const projectId = "89665ab8-5cc5-4a99-ba65-05396124f0f8";
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
