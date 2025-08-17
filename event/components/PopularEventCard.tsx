import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MapPin, Users, Star } from "lucide-react-native";

interface PopularEventCardProps {
  event: {
    id: string;
    title: string;
    location: string;
    attendees: number;
    rating: number;
    image: string;
  };
  compact?: boolean;
}

export function PopularEventCard({
  event,
  compact = false,
}: PopularEventCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, compact ? styles.compactCard : styles.fullCard]}
    >
      <Image
        source={{ uri: event.image }}
        style={[styles.image, compact ? styles.compactImage : styles.fullImage]}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={compact ? 1 : 2}>
          {event.title}
        </Text>

        <View style={styles.location}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.locationText} numberOfLines={1}>
            {event.location}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.attendees}>
            <Users size={14} color="#6B7280" />
            <Text style={styles.attendeesText}>{event.attendees}</Text>
          </View>

          <View style={styles.rating}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{event.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  fullCard: {
    width: 280,
  },
  compactCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: "row",
  },
  image: {
    backgroundColor: "#F3F4F6",
  },
  fullImage: {
    width: "100%",
    height: 160,
  },
  compactImage: {
    width: 80,
    height: 80,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attendees: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  attendeesText: {
    fontSize: 12,
    color: "#6B7280",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "600",
  },
});
