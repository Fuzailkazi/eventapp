import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from "react-native";
import {
  ArrowLeft,
  Bell,
  MessageCircle,
  Calendar,
  Users,
} from "lucide-react-native";
import { router } from "expo-router";

export default function NotificationSettingsScreen() {
  const [settings, setSettings] = useState({
    newMessages: true,
    eventReminders: true,
    newAttendees: false,
    eventUpdates: true,
    marketingEmails: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const notificationTypes = [
    {
      key: "newMessages",
      title: "New Messages",
      description: "Get notified when someone sends a message in event chats",
      icon: MessageCircle,
      color: "#3B82F6",
    },
    {
      key: "eventReminders",
      title: "Event Reminders",
      description: "Receive reminders before your events start",
      icon: Calendar,
      color: "#10B981",
    },
    {
      key: "newAttendees",
      title: "New Attendees",
      description: "Know when someone joins your hosted events",
      icon: Users,
      color: "#F59E0B",
    },
    {
      key: "eventUpdates",
      title: "Event Updates",
      description: "Get notified about changes to events you're attending",
      icon: Bell,
      color: "#8B5CF6",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Push Notifications</Text>

        {notificationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <View key={type.key} style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: type.color + "20" },
                  ]}
                >
                  <Icon size={20} color={type.color} />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{type.title}</Text>
                  <Text style={styles.settingDescription}>
                    {type.description}
                  </Text>
                </View>
              </View>
              <Switch
                value={settings[type.key as keyof typeof settings]}
                onValueChange={(value) => updateSetting(type.key, value)}
                trackColor={{ false: "#E5E7EB", true: type.color + "40" }}
                thumbColor={
                  settings[type.key as keyof typeof settings]
                    ? type.color
                    : "#FFFFFF"
                }
              />
            </View>
          );
        })}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email Notifications</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View
                style={[styles.iconContainer, { backgroundColor: "#EF444420" }]}
              >
                <Bell size={20} color="#EF4444" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Marketing Emails</Text>
                <Text style={styles.settingDescription}>
                  Receive updates about new features and events
                </Text>
              </View>
            </View>
            <Switch
              value={settings.marketingEmails}
              onValueChange={(value) => updateSetting("marketingEmails", value)}
              trackColor={{ false: "#E5E7EB", true: "#EF444440" }}
              thumbColor={settings.marketingEmails ? "#EF4444" : "#FFFFFF"}
            />
          </View>
        </View>
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
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 18,
  },
});
