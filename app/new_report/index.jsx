import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { db } from './../../app/config/FirebaseConfig'; // Adjust the import based on your project structure
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Import Timestamp
import { Picker } from '@react-native-picker/picker'; // Correct import

export default function NewReport() {
    const [name, setName] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [gender, setGender] = useState('male');
    const [caseAddress, setCaseAddress] = useState('');
    const [caseType, setCaseType] = useState('Crimes');
    const [caseDetails, setCaseDetails] = useState('');

    // Function to handle form submission
    const handleSubmit = async () => {
        if (!name || !identificationNumber || !contactNumber || !caseAddress || !caseDetails) {
            Alert.alert('Error', 'Please fill in all fields'); // Simple validation
            return;
        }

        try {
            // Create a new report in Firestore with a timestamp
            await addDoc(collection(db, 'Reports'), {
                name,
                identificationNumber,
                contactNumber,
                gender,
                caseAddress,
                caseType,
                caseDetails,
                createdAt: Timestamp.fromDate(new Date()), // Add a timestamp
            });

            Alert.alert('Success', 'Report created successfully!');
            // Optionally, reset the form
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
        setCaseAddress('');
        setCaseType('Crimes');
        setCaseDetails('');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Identification Number</Text>
            <TextInput
                style={styles.input}
                value={identificationNumber}
                onChangeText={setIdentificationNumber}
            />

            <Text style={styles.label}>Contact Number</Text>
            <TextInput
                style={styles.input}
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={gender}
                    style={styles.picker}
                    onValueChange={(itemValue) => setGender(itemValue)}
                >
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                </Picker>
            </View>

            <Text style={styles.label}>Case Address</Text>
            <TextInput
                style={styles.inputLarge}
                value={caseAddress}
                onChangeText={setCaseAddress}
                multiline
            />

            <Text style={styles.label}>Case Type</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={caseType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setCaseType(itemValue)}
                >
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

            <Button title="Submit Report" onPress={handleSubmit} color="orange" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1, // Make sure the container grows to fit content
        justifyContent: 'center',
        backgroundColor: 'grey', // Set the background color to grey
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'white', // Border color for input fields
        backgroundColor: 'white', // Set the background color to white
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 10,
    },
    inputLarge: {
        height: 80, // Increased height for larger text input
        borderColor: 'white', // Border color for larger input fields
        backgroundColor: 'white', // Set the background color to white
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 10,
    },
    pickerContainer: {
        marginBottom: 15,
    },
    picker: {
        height: 40,
        borderColor: 'white', // Border color for input fields
        backgroundColor: 'white', // Set the background color to white
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 10,
        height: 50,
        width: '100%',
    },
});
