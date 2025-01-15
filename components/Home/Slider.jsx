import { View, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { FlatList } from 'react-native';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    setSliderList([]);
    try {
      const snapshot = await getDocs(collection(db, 'Slider'));
      const sliders = [];
      snapshot.forEach((doc) => {
        sliders.push(doc.data());
      });
      setSliderList(sliders);
    } catch (error) {
      console.error('Error fetching slider data: ', error);
    }
  };

  return (
    <View>
      <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
        data={sliderList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageurl }} style={styles.sliderImage} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get('screen').width * 0.9,
    height: 160,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 10,
    alignSelf: 'center',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
});
