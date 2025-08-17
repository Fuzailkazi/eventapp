import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MessageCircle, Users } from "lucide-react-native";

interface ChatPreviewCardProps {
  chat: {
    id: string;
    eventTitle: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    participants: number;
    eventImage: string;
    type: "group" | "direct";
  };
  onPress: () => void;
}

export function ChatPreviewCard({ chat, onPress }: ChatPreviewCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: chat.eventImage }} style={styles.eventImage} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {chat.eventTitle}
          </Text>
          <Text style={styles.timestamp}>{chat.lastMessageTime}</Text>
        </View>

        <Text style={styles.lastMessage} numberOfLines={2}>
          {chat.lastMessage}
        </Text>

        <View style={styles.footer}>
          <View style={styles.participants}>
            <Users size={14} color="#6B7280" />
            <Text style={styles.participantsText}>
              {chat.participants} participants
            </Text>
          </View>

          {chat.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: "#F3F4F6",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  lastMessage: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  participants: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  participantsText: {
    fontSize: 12,
    color: "#6B7280",
  },
  unreadBadge: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
