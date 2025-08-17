import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  Heart,
  Share,
  MessageCircle,
  Star,
} from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEvents } from "@/hooks/useEvents";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const { events, joinEvent, leaveEvent } = useEvents();
  const [isJoined, setIsJoined] = useState(false);

  // Find the event by ID
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleJoinEvent = async () => {
    if (isJoined) {
      Alert.alert("Leave Event", "Are you sure you want to leave this event?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave",
          style: "destructive",
          onPress: () => {
            setIsJoined(false);
            leaveEvent(event.id);
          },
        },
      ]);
    } else {
      setIsJoined(true);
      joinEvent(event.id);
      Alert.alert("Success", "You have joined the event!");
    }
  };

  const handleShare = () => {
    Alert.alert("Share Event", "Share functionality coming soon!");
  };

  const handleChat = () => {
    if (isJoined) {
      router.push(`/chat/${event.id}`);
    } else {
      Alert.alert(
        "Join Required",
        "You need to join the event to access the chat"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.image} />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Share size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.hostInfo}>
            <Image
              source={{ uri: event.host.avatar }}
              style={styles.hostAvatar}
            />
            <View style={styles.hostDetails}>
              <Text style={styles.hostName}>Hosted by {event.host.name}</Text>
              <View style={styles.hostRating}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.ratingText}>{event.host.rating}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <MapPin size={20} color="#6B7280" />
              <Text style={styles.detailText}>{event.location}</Text>
            </View>

            <View style={styles.detailRow}>
              <Calendar size={20} color="#6B7280" />
              <Text style={styles.detailText}>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Clock size={20} color="#6B7280" />
              <Text style={styles.detailText}>{event.time}</Text>
            </View>

            <View style={styles.detailRow}>
              <Users size={20} color="#6B7280" />
              <Text style={styles.detailText}>
                {event.attendees}/{event.maxAttendees} attending
              </Text>
            </View>
          </View>

          <View style={styles.attendeeProgress}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Event Capacity</Text>
              <Text style={styles.progressPercentage}>
                {Math.round((event.attendees / event.maxAttendees) * 100)}%
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${(event.attendees / event.maxAttendees) * 100}%` },
                ]}
              />
            </View>
          </View>

          {event.tags && event.tags.length > 0 && (
            <View style={styles.tagsSection}>
              <Text style={styles.tagsLabel}>Tags</Text>
              <View style={styles.tags}>
                {event.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={handleChat}
          disabled={!isJoined}
        >
          <MessageCircle size={20} color={isJoined ? "#3B82F6" : "#9CA3AF"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.joinButton,
            isJoined ? styles.leaveButton : styles.primaryButton,
          ]}
          onPress={handleJoinEvent}
        >
          <Text
            style={[
              styles.joinButtonText,
              isJoined ? styles.leaveButtonText : styles.primaryButtonText,
            ]}
          >
            {isJoined ? "Leave Event" : "Join Event"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    position: "relative",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F3F4F6",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  shareButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryBadge: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#3B82F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    lineHeight: 34,
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  hostDetails: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  hostRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#F59E0B",
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 24,
  },
  details: {
    gap: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
  },
  attendeeProgress: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10B981",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#10B981",
  },
  tagsSection: {
    marginBottom: 24,
  },
  tagsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#EBF8FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  tagText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 12,
  },
  chatButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  joinButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
  },
  leaveButton: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButtonText: {
    color: "#FFFFFF",
  },
  leaveButtonText: {
    color: "#DC2626",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
  },
});
