import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Camera,
  Plus,
  Tag,
} from "lucide-react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { CreateEventForm } from "@/components/CreateEventForm";
import { useEvents } from "@/hooks/useEvents";

export default function CreateScreen() {
  const { createEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    time: "",
    maxAttendees: "",
    tags: [],
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.date
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await createEvent(formData);
      Alert.alert("Success", "Event created successfully!", [
        { text: "OK", onPress: () => router.push("/(tabs)/") },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Event</Text>
        <Text style={styles.subtitle}>Share your event with the community</Text>
      </View>

      <CreateEventForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreateEvent}
        loading={loading}
        onPickImage={pickImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
});
