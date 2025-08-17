import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { MessageCircle, Users, Clock } from "lucide-react-native";
import { router } from "expo-router";
import { useChats } from "@/hooks/useChats";
import { ChatPreviewCard } from "@/components/ChatPreviewCard";

export default function ChatsScreen() {
  const { chats, loading } = useChats();
  const [activeTab, setActiveTab] = useState("all");

  const filteredChats = chats.filter((chat) => {
    if (activeTab === "unread") return chat.unreadCount > 0;
    if (activeTab === "group") return chat.type === "group";
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
        <Text style={styles.subtitle}>Stay connected with your events</Text>
      </View>

      <View style={styles.tabBar}>
        {[
          { key: "all", label: "All", count: chats.length },
          {
            key: "unread",
            label: "Unread",
            count: chats.filter((c) => c.unreadCount > 0).length,
          },
          {
            key: "group",
            label: "Groups",
            count: chats.filter((c) => c.type === "group").length,
          },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
            {tab.count > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{tab.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatPreviewCard
            chat={item}
            onPress={() => router.push(`/chat/${item.id}`)}
          />
        )}
        style={styles.chatsList}
        contentContainerStyle={styles.chatsContainer}
        showsVerticalScrollIndicator={false}
      />

      {filteredChats.length === 0 && (
        <View style={styles.emptyState}>
          <MessageCircle size={64} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>No chats yet</Text>
          <Text style={styles.emptySubtitle}>
            Join events to start chatting with other attendees
          </Text>
        </View>
      )}
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
    paddingBottom: 20,
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
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 6,
  },
  activeTab: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  badge: {
    backgroundColor: "#F97316",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  chatsList: {
    flex: 1,
  },
  chatsContainer: {
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
