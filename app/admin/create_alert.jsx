import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './../../app/config/FirebaseConfig'; // Adjust the import according to your project structure

const CreateAlert = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateAlert = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Validation Error', 'Please provide both title and description.');
      return;
    }

    setLoading(true);
    try {
      // Add the alert to the "Alerts" collection in Firestore
      await addDoc(collection(db, 'Alerts'), {
        title: title.trim(),
        description: description.trim(),
        location: location ? {
          address: location.address,
          latitude: location.latitude,
          longitude: location.longitude,
        } : null,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Alert created successfully!', [
        { text: 'OK', onPress: () => router.push('admin/admin-dashboard') },
      ]);
    } catch (error) {
      console.error('Error creating alert: ', error);
      Alert.alert('Error', 'Failed to create alert. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setLocation({
            address: data.description,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: 'AIzaSyDdBR53v_s8j1pKPkS--VGT32URgc2cusc',
          language: 'en',
        }}
        fetchDetails={true}
        styles={{
          textInput: styles.input,
        }}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          
          <TextInput
            style={styles.input}
            placeholder="Enter alert title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter alert description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />
          {location && (
            <View style={styles.locationContainer}>
              <Text style={styles.locationText} >Location: {location.address}</Text>
              <Text style={styles.locationText}>Latitude: {location.latitude}</Text>
              <Text style={styles.locationText}>Longitude: {location.longitude}</Text>
            </View>
          )}

          <GooglePlacesInput />

          

          {loading ? (
            <ActivityIndicator size="large" color="orange" />
          ) : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCreateAlert}>
              <Text style={styles.buttonText}>Create Alert</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('admin/broadcast_alert')}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  textArea: {
    height: 100,
  },
  locationContainer: {
    
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    color: 'blue'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  locationText: {
    color: 'blue',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CreateAlert;