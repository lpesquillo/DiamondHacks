import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>MakeHealthEZ</Text>
        <Text style={styles.subtitle}>
          Skip the ER Paperwork. Save Time. Save Lives.
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/PhoneAuth")}
        >
          <Ionicons name="call-outline" size={28} color="#007AFF" />
          <Text style={styles.cardText}>Phone Authentication</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/qr")}
        >
          <Ionicons name="qr-code-outline" size={28} color="#007AFF" />
          <Text style={styles.cardText}>Show QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person-circle-outline" size={28} color="#007AFF" />
          <Text style={styles.cardText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/healthrecord")}
        >
          <Ionicons name="document-text-outline" size={28} color="#007AFF" />
          <Text style={styles.cardText}>Important Documents</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f9fc",
  },
  scrollContainer: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 40,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
    marginBottom: 32,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardText: {
    marginLeft: 12,
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
});
