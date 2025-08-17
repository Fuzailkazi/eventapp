import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { ArrowLeft, Star } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function ReviewScreen() {
  const { eventId } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hostRating, setHostRating] = useState(0);
  const [hostReview, setHostReview] = useState("");

  const handleSubmitReview = () => {
    if (rating === 0) {
      Alert.alert("Error", "Please provide a rating for the event");
      return;
    }

    Alert.alert("Review Submitted", "Thank you for your feedback!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const StarRating = ({
    rating,
    onRatingChange,
    size = 32,
  }: {
    rating: number;
    onRatingChange: (rating: number) => void;
    size?: number;
  }) => (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onRatingChange(star)}
          style={styles.starButton}
        >
          <Star
            size={size}
            color={star <= rating ? "#F59E0B" : "#E5E7EB"}
            fill={star <= rating ? "#F59E0B" : "transparent"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.title}>Leave a Review</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rate the Event</Text>
          <Text style={styles.sectionDescription}>
            How was your overall experience?
          </Text>

          <StarRating rating={rating} onRatingChange={setRating} />

          <TextInput
            style={styles.textArea}
            placeholder="Share your thoughts about the event..."
            value={review}
            onChangeText={setReview}
            multiline
            numberOfLines={4}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rate the Host</Text>
          <Text style={styles.sectionDescription}>
            How well did the host organize and manage the event?
          </Text>

          <StarRating rating={hostRating} onRatingChange={setHostRating} />

          <TextInput
            style={styles.textArea}
            placeholder="Share feedback about the host..."
            value={hostReview}
            onChangeText={setHostReview}
            multiline
            numberOfLines={4}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitReview}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  textArea: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
