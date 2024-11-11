import { View, Text, Image } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function Header() {
  const { user } = useUser();

  // Split the full name into parts (first and second word)
  const nameParts = user?.fullName?.split(' ');
  const firstName = nameParts?.[0];
  const secondName = nameParts?.[1] || ''; // Safely handle if there's no second word

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 18,
          }}
        >
          Welcome,
        </Text>

        <Text
          style={{
            fontFamily: 'outfit-medium',
            fontSize: 18,
          }}
        >
          {firstName} {secondName} {/* Display both the first and second names */}
        </Text>
      </View>
      
      {user?.imageUrl && (
        <Image
          source={{ uri: user.imageUrl }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 99,
          }}
        />
      )}
    </View>
  );
}
