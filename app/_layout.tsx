import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/home" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/inbox" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/profile" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/maps" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/reports" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ headerShown: false }} />
    </Stack>
  );
}
