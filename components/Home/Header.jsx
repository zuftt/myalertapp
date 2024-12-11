import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function Header() {
  const { user } = useUser();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Update the key whenever the user changes or component remounts
    setKey((prevKey) => prevKey + 1);
  }, [user]);

  // Split the full name into parts (first and second word)
  const nameParts = user?.fullName?.split(' ');
  const firstName = nameParts?.[0];
  const secondName = nameParts?.[1] || '';

  return (
    <View key={key} style={styles.container}>
      <View>
        <Text style={styles.greetingText}>Welcome,</Text>
        <Text style={styles.nameText}>
          {firstName} {secondName}
        </Text>
      </View>

      {user?.imageUrl && (
        <Image
          source={{ uri: user.imageUrl }}
          style={styles.profileImage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    fontFamily: 'outfit',
    fontSize: 18,
  },
  nameText: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 99,
  },
});
