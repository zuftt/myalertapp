import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from './../../app/config/FirebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CreateAlert() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Alert</Text>

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

      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCreateAlert}>
          <Text style={styles.buttonText}>Create Alert</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('admin/broadcast_alert')}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 15,
    padding: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});