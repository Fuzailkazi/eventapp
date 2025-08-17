import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    timestamp: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    isCurrentUser: boolean;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <View
      style={[
        styles.container,
        message.isCurrentUser
          ? styles.currentUserContainer
          : styles.otherUserContainer,
      ]}
    >
      {!message.isCurrentUser && (
        <Image source={{ uri: message.user.avatar }} style={styles.avatar} />
      )}

      <View
        style={[
          styles.messageContainer,
          message.isCurrentUser
            ? styles.currentUserMessage
            : styles.otherUserMessage,
        ]}
      >
        {!message.isCurrentUser && (
          <Text style={styles.userName}>{message.user.name}</Text>
        )}
        <Text
          style={[
            styles.messageText,
            message.isCurrentUser
              ? styles.currentUserText
              : styles.otherUserText,
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            message.isCurrentUser
              ? styles.currentUserTimestamp
              : styles.otherUserTimestamp,
          ]}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  currentUserContainer: {
    justifyContent: "flex-end",
  },
  otherUserContainer: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageContainer: {
    maxWidth: "75%",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currentUserMessage: {
    backgroundColor: "#3B82F6",
    borderBottomRightRadius: 4,
  },
  otherUserMessage: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  userName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  currentUserText: {
    color: "#FFFFFF",
  },
  otherUserText: {
    color: "#111827",
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  currentUserTimestamp: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  otherUserTimestamp: {
    color: "#9CA3AF",
  },
});
