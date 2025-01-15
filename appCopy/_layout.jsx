import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        screens={{
          Home: "(tabs)/home",
          Inbox: "(tabs)/inbox",
          Maps: "(tabs)/maps",
          Profile: "(tabs)/profile",
          Reports: "(tabs)/reports",
          Admin: "admin",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
