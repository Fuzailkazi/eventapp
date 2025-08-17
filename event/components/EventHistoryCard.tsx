import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, Users, Star, Clock } from "lucide-react-native";

interface EventHistoryCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    attendees: number;
    rating?: number;
    status: "completed" | "upcoming" | "cancelled";
  };
  type: string;
}

export function EventHistoryCard({ event, type }: EventHistoryCardProps) {
  const getStatusColor = () => {
    switch (event.status) {
      case "completed":
        return "#10B981";
      case "upcoming":
        return "#3B82F6";
      case "cancelled":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStatusText = () => {
    switch (event.status) {
      case "completed":
        return "Completed";
      case "upcoming":
        return "Upcoming";
      case "cancelled":
        return "Cancelled";
      default:
        return event.status;
    }
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor() + "20" },
          ]}
        >
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detail}>
          <Calendar size={14} color="#6B7280" />
          <Text style={styles.detailText}>
            {new Date(event.date).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.detail}>
          <Users size={14} color="#6B7280" />
          <Text style={styles.detailText}>{event.attendees} attendees</Text>
        </View>

        {event.rating && (
          <View style={styles.detail}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.detailText}>{event.rating}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  details: {
    flexDirection: "row",
    gap: 16,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: "#6B7280",
  },
});
