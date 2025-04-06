import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const imageKeys = ['insuranceCard', 'driversLicense', 'medicalHistory'] as const;
type ImageType = (typeof imageKeys)[number];

export default function UploadMedicalDocuments() {
  const [images, setImages] = useState<{
    insuranceCard: string | null;
    driversLicense: string | null;
    medicalHistory: string | null;
  }>({
    insuranceCard: null,
    driversLicense: null,
    medicalHistory: null,
  });

  const pickImage = async (type: ImageType) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages({ ...images, [type]: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Upload Medical Documents</Text>

        {imageKeys.map((type) => (
          <View key={type} style={styles.card}>
            <Text style={styles.label}>
              {type === 'insuranceCard' && 'Insurance Card'}
              {type === 'driversLicense' && "Driver's License"}
              {type === 'medicalHistory' && 'Medical History'}
            </Text>

            {images[type] ? (
              <Image source={{ uri: images[type] as string }} style={styles.image} />
            ) : (
              <Text style={styles.placeholder}>No image selected</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={() => pickImage(type)}>
              <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>
                Upload{' '}
                {type === 'medicalHistory'
                  ? 'Medical History'
                  : type === 'insuranceCard'
                  ? 'Insurance Card'
                  : "Driver's License"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#007AFF',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#0F172A',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  placeholder: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
