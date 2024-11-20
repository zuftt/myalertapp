import { View, Text, Image, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LogInScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        // Handle successful session creation
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [startOAuthFlow]);

  return (
    <ImageBackground
      source={require('./../../assets/images/background.jpg')} // Background image
      style={{
        flex: 1, // Full screen background
        justifyContent: 'flex-start', // Align content at the top
      }}
      resizeMode="cover" // Ensure the image covers the entire background
    >
      <View
        style={{
          paddingTop: 120, // Space from the top of the screen
          alignItems: 'center', // Horizontally center the content
        }}
      >
        <Image
          source={require('./../../assets/images/login.png')}
          style={{
            width: '80%',
            height: 300,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 30,
            textAlign: 'center',
            color: '#ffffff', // White text for contrast
            marginTop: 20, // Space above the text
          }}
        >
          Your safety is our priority
        </Text>
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 15,
            textAlign: 'center',
            color: '#ffffff', // White text for contrast
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
            marginTop: 100,
            backgroundColor: '#ff8c00', // More vibrant orange color
            width: '80%',
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000', // Shadow color
            shadowOffset: { width: 0, height: 4 }, // Shadow offset
            shadowOpacity: 0.1, // Shadow opacity
            shadowRadius: 6, // Shadow blur radius
            elevation: 5, // Elevation for Android shadow effect
          }}
        >
          <Text
            style={{
              fontFamily: 'outfit-bold',
              fontSize: 22, // Slightly larger text
              textAlign: 'center',
              color: '#ffffff', // White text for contrast
            }}
          >
            Get started
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
