import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HealthRecord() {
  const [images, setImages] = useState({
    insuranceCard: "",
    driversLicense: "",
    medicalHistory: "", // New field for Medical History
  });

  useEffect(() => {
    const loadImages = async () => {
      try {
        const savedImages = await AsyncStorage.getItem("uploadedImages");
        if (savedImages) {
          setImages(JSON.parse(savedImages));
        }
      } catch (error) {
        console.error("Failed to load images", error);
      }
    };
    loadImages();
  }, []);

  // Function to pick image from the library
  const pickImage = async (
    type: "insuranceCard" | "driversLicense" | "medicalHistory"
  ) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera roll permission is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImages((prev) => ({ ...prev, [type]: uri }));
    }
  };

  // Function to take a photo with the camera
  const takePhoto = async (
    type: "insuranceCard" | "driversLicense" | "medicalHistory"
  ) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImages((prev) => ({ ...prev, [type]: uri }));
    }
  };

  // Function to save the images to AsyncStorage
  const saveImages = async () => {
    try {
      await AsyncStorage.setItem("uploadedImages", JSON.stringify(images));
      Alert.alert("Success", "Images saved successfully!");
    } catch (error) {
      console.error("Failed to save images", error);
      Alert.alert("Error", "Failed to save images.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Documents</Text>

      {/* Insurance Card Section */}
      <View style={styles.uploadSection}>
        <Text style={styles.label}>Insurance Card</Text>
        {images.insuranceCard ? (
          <Image source={{ uri: images.insuranceCard }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>No image selected</Text>
        )}
        <Button
          title="Upload Insurance Card from Library"
          onPress={() => pickImage("insuranceCard")}
        />
        <Button
          title="Take Photo of Insurance Card"
          onPress={() => takePhoto("insuranceCard")}
        />
      </View>

      {/* Driver’s License Section */}
      <View style={styles.uploadSection}>
        <Text style={styles.label}>Driver's License</Text>
        {images.driversLicense ? (
          <Image source={{ uri: images.driversLicense }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>No image selected</Text>
        )}
        <Button
          title="Upload Driver's License from Library"
          onPress={() => pickImage("driversLicense")}
        />
        <Button
          title="Take Photo of Driver's License"
          onPress={() => takePhoto("driversLicense")}
        />
      </View>

      {/* Medical History Section */}
      <View style={styles.uploadSection}>
        <Text style={styles.label}>Medical History</Text>
        {images.medicalHistory ? (
          <Image source={{ uri: images.medicalHistory }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>No image selected</Text>
        )}
        <Button
          title="Upload Medical History from Library"
          onPress={() => pickImage("medicalHistory")}
        />
        <Button
          title="Take Photo of Medical History"
          onPress={() => takePhoto("medicalHistory")}
        />
      </View>

      {/* Save Button */}
      <View style={styles.saveButton}>
        <Button title="Save Documents" onPress={saveImages} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7290b5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  uploadSection: {
    marginBottom: 30,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 120,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  placeholder: {
    color: "#ccc",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#406080",
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 10,
  },
});
