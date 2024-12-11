import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';

export default function TabLayout() {
  // State to hold the number of notifications
  const [notificationCount, setNotificationCount] = useState(0); // Example count

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="home-sharp" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="file-text" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="maps"
        options={{
          title: 'Maps',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome6 name="map-location" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Notifications',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <Ionicons name="file-tray" size={24} color={color} />
              {notificationCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{notificationCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
