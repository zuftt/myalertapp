import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons,AntDesign,MaterialCommunityIcons,FontAwesome,FontAwesome6 } from '@expo/vector-icons'

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor:'black'
    }}>
        <Tabs.Screen name='home'
        options={{
            title:'Home',
            headerShown: false,
            tabBarIcon:({black})=><Ionicons name="home-sharp" size={24} color="black" />
          }}
          />

          

        <Tabs.Screen 
        options={{
          title:'Reports',
            headerShown: false,
            tabBarIcon:({black})=><FontAwesome name="file-text" size={24} color="black" />
        }}
        name='reports'/>

<Tabs.Screen 
        options={{
          title:'Maps',
            headerShown: false,
            tabBarIcon:({black})=><FontAwesome6 name="map-location" size={24} color="black" />
        }}
        name='maps'/>

        <Tabs.Screen 
        options={{
          headerShown: false,
          tabBarIcon:({black})=><Ionicons name="file-tray" size={24} color="black" />
        }}name='inbox'/>
        
        <Tabs.Screen 
        options={{
          headerShown: false,
          tabBarIcon:({black})=><Ionicons name="person" size={24} color="black" />
        }}
        name='profile'/>
    </Tabs>
  )
}