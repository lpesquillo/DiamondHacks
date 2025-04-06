// app/profile.tsx
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [inputs, setInputs] = useState({
    Name: '',
    DOB: '',
    Phone: '',
    Address: '',
    EmContact: '',
  });

  useEffect(() => {
    const loadInputs = async () => {
      try {
        const savedInputs = await AsyncStorage.getItem('profileInputs');
        if (savedInputs) {
          setInputs(JSON.parse(savedInputs));
        }
      } catch (error) {
        console.error('Failed to load profile inputs', error);
      }
    };
    loadInputs();
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem('profileInputs', JSON.stringify(inputs));
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.error('Failed to save profile inputs', error);
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          value={inputs.Name}
          onChangeText={(text) => handleInputChange('Name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          placeholderTextColor="#888"
          value={inputs.DOB}
          onChangeText={(text) => handleInputChange('DOB', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={inputs.Phone}
          onChangeText={(text) => handleInputChange('Phone', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#888"
          value={inputs.Address}
          onChangeText={(text) => handleInputChange('Address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Emergency Contact"
          placeholderTextColor="#888"
          value={inputs.EmContact}
          onChangeText={(text) => handleInputChange('EmContact', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f9fc',
  },
  container: {
    padding: 24,
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d0e1f9',
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1e3a5f',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
