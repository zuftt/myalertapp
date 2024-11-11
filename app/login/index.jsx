import { View, Text, Image, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function LogInScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

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
          paddingTop: 240, // Space from the top of the screen
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
          Your safety is is our priority
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
        <Pressable
        onPress={onPress}
        style={{
          padding:13,
          marginTop:100,
          backgroundColor:'#ffa404',
          width:'80%',
          borderRadius:14

        }}>
          <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            textAlign: 'center',
            color: '#ffffff', // White text for contrast
             // Space above the text
          }}
        >Get started
        </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
