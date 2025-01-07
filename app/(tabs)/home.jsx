import { View, Text, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'

export default function Home() {
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Header />
      <Slider />
      
      {/* Add image here */}
      <Image 
        source={require('./../../assets/images/home.png')}  // Adjust the path if necessary
        style={{ width: '100%', height: 400, marginVertical: 20 }}  // Adjust the style as needed
      />
      <Text style={{ alignContent: 'center',fontSize: 16, fontWeight: 'bold', marginBottom: 15,paddingLeft: 10 }}>Let's make our community a better place</Text>
    </View>
  )
}
