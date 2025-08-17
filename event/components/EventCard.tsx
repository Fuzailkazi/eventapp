import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MapPin, Calendar, Users, Heart, Star } from "lucide-react-native";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    attendees: number;
    maxAttendees: number;
    category: string;
    image: string;
    host: {
      name: string;
      avatar: string;
      rating: number;
    };
    rating: number;
    isFavorite: boolean;
  };
  onPress: () => void;
  onToggleFavorite: () => void;
}

export function EventCard({
  event,
  onPress,
  onToggleFavorite,
}: EventCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: event.image }} style={styles.image} />

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={onToggleFavorite}
      >
        <Heart
          size={20}
          color={event.isFavorite ? "#EF4444" : "#FFFFFF"}
          fill={event.isFavorite ? "#EF4444" : "transparent"}
        />
      </TouchableOpacity>

      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{event.category}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {event.description}
        </Text>

        <View style={styles.info}>
          <View style={styles.infoRow}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Calendar size={16} color="#6B7280" />
            <Text style={styles.infoText}>
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Users size={16} color="#6B7280" />
            <Text style={styles.infoText}>
              {event.attendees}/{event.maxAttendees} attending
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.host}>
            <Image
              source={{ uri: event.host.avatar }}
              style={styles.hostAvatar}
            />
            <View>
              <Text style={styles.hostName}>Hosted by {event.host.name}</Text>
              <View style={styles.rating}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.ratingText}>{event.host.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.attendeeProgress}>
            <View
              style={[
                styles.progressBar,
                { width: `${(event.attendees / event.maxAttendees) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#F3F4F6",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#3B82F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  info: {
    gap: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#6B7280",
  },
  footer: {
    gap: 12,
  },
  host: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hostAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  hostName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
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
  attendeeProgress: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#10B981",
  },
});
