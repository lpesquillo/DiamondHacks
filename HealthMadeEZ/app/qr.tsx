import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QRScreen() {
  const [qrValue, setQrValue] = useState('');

  const loadProfileAndGenerateQR = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('profileInputs');
      if (savedProfile) {
        // setQrValue(savedProfile);
           let payload =
          "https://nandiraju.github.io/qr_scanner/index.html?data=" +
          encodeURIComponent(savedProfile);
        setQrValue(payload);
      } else {
        alert('No profile data found!');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your ER QuickPass</Text>

      <TouchableOpacity style={styles.button} onPress={loadProfileAndGenerateQR}>
        <Text style={styles.buttonText}>Show QR Code</Text>
      </TouchableOpacity>

      {qrValue ? (
        <View style={styles.qrContainer}>
          <QRCode value={qrValue} size={200} />
        </View>
      ) : (
        <Text style={styles.hint}>Tap the button to generate your QR code.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#1A237E',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
  },
  hint: {
    color: '#7c8a9f',
    fontSize: 16,
    marginTop: 20,
  },
  qrContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    backgroundColor: '#1A73E8',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});