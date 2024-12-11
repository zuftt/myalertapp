import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { collection, addDoc, Timestamp,doc, getDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '@clerk/clerk-expo';
import { db } from './../../app/config/FirebaseConfig'; // Adjust the import based on your project structure

export default function NewReport() {
    const { user } = useUser();
    const [name, setName] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [gender, setGender] = useState('male');
    const [caseType, setCaseType] = useState('Crimes');
    const [caseDetails, setCaseDetails] = useState('');
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    

    // Function to fetch the user's location and reverse geocode to get address
    const fetchLocation = async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            const locationData = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = locationData.coords;
            setLocation({ latitude, longitude });

            // Reverse geocode to get the address
            const addressData = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (addressData.length > 0) {
                const { name, street, city, region, postalCode, country } = addressData[0];
                setAddress(`${name || ''} ${street || ''}, ${city || ''}, ${region || ''} ${postalCode || ''}, ${country || ''}`);
            }
        } catch (error) {
            setErrorMsg('Error fetching location');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        if (!name || !identificationNumber || !contactNumber || !caseDetails || !location) {
            Alert.alert('Error', 'Please fill in all fields and fetch location');
            return;
        }
    
        try {
            // Save report to Firestore
            const reportRef = await addDoc(collection(db, 'Reports'), {
                name,
                identificationNumber,
                contactNumber,
                gender,
                caseType,
                caseDetails,
                location, // Store location as { latitude, longitude }
                address, // Store the address
                createdAt: Timestamp.fromDate(new Date()),
                isOpened: false, // Default to false
                verified: false, // Default to false
                user: {
                    name: user.fullName || 'Anonymous', // Use user name if available, fallback to 'Anonymous'
                    email: user.primaryEmailAddress?.emailAddress || 'No Email',
                }
            });
    
            // Assuming you save the user's push token in Firestore and it's linked to the user
            const userTokenRef = await getDoc(doc(db, 'Users', user.id));
            const userToken = userTokenRef.data()?.pushToken; // Get the user's push token from Firestore
    
            // Send a push notification to the user after report submission
            if (userToken) {
                await sendPushNotification(userToken, 'Report Submitted', 'Your report has been successfully submitted.');
            }
    
            Alert.alert('Success', 'Report created successfully!');
            resetForm();
        } catch (error) {
            console.error('Error creating report: ', error);
            Alert.alert('Error', 'Failed to create report');
        }
    };

    // Function to reset form fields
    const resetForm = () => {
        setName('');
        setIdentificationNumber('');
        setContactNumber('');
        setGender('male');
        setCaseType('Crimes');
        setCaseDetails('');
        setLocation(null);
        setAddress('');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Identification Number</Text>
            <TextInput style={styles.input} value={identificationNumber} onChangeText={setIdentificationNumber} />

            <Text style={styles.label}>Contact Number</Text>
            <TextInput
                style={styles.input}
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={gender} style={styles.picker} onValueChange={setGender}>
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                </Picker>
            </View>

            <Text style={styles.label}>Case Type</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={caseType} style={styles.picker} onValueChange={setCaseType}>
                    <Picker.Item label="Crimes" value="Crimes" />
                    <Picker.Item label="Natural Disasters" value="Natural Disasters" />
                    <Picker.Item label="Health" value="Health" />
                    <Picker.Item label="Others" value="Others" />
                </Picker>
            </View>

            <Text style={styles.label}>Case Details</Text>
            <TextInput
                style={styles.inputLarge}
                value={caseDetails}
                onChangeText={setCaseDetails}
                multiline
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Get Location" onPress={fetchLocation} color="blue" />
            )}

            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
            {location && (
                <Text style={styles.locationText}>
                    Location: Latitude {location.latitude}, Longitude {location.longitude}
                </Text>
            )}
            {address ? <Text style={styles.addressText}>Address: {address}</Text> : null}

            <Button title="Submit Report" onPress={handleSubmit} color="orange" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 10,
    },
    inputLarge: {
        height: 80,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 10,
    },
    pickerContainer: {
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    locationText: {
        fontSize: 14,
        color: 'green',
        marginBottom: 15,
    },
    addressText: {
        fontSize: 14,
        color: 'blue',
        marginBottom: 15,
    },
});
