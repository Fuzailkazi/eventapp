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
  Settings,
  Star,
  Calendar,
  Users,
  CreditCard as Edit3,
  Camera,
  Heart,
  Award,
  MapPin,
} from "lucide-react-native";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { ProfileStats } from "@/components/ProfileStats";
import { EventHistoryCard } from "@/components/EventHistoryCard";

export default function ProfileScreen() {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("hosted");

  const stats = {
    eventsHosted: 12,
    eventsAttended: 28,
    rating: 4.8,
    reviews: 24,
    followers: 156,
    following: 89,
  };

  const userEvents = [
    {
      id: "1",
      title: "Morning Yoga Session",
      date: "2024-01-15",
      attendees: 15,
      rating: 4.9,
      status: "completed",
    },
    {
      id: "2",
      title: "Coffee & Code Meetup",
      date: "2024-01-20",
      attendees: 22,
      rating: 4.7,
      status: "completed",
    },
    {
      id: "3",
      title: "Weekend Hiking Adventure",
      date: "2024-01-25",
      attendees: 8,
      status: "upcoming",
    },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/settings")}
            >
              <Settings size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri:
                    user?.avatar ||
                    "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
                }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.name}>{user?.name || "John Doe"}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color="#6B7280" />
              <Text style={styles.location}>San Francisco, CA</Text>
            </View>

            <Text style={styles.bio}>
              Event enthusiast who loves bringing people together. Passionate
              about yoga, tech meetups, and outdoor adventures.
            </Text>

            <View style={styles.ratingContainer}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.rating}>{stats.rating}</Text>
              <Text style={styles.ratingCount}>({stats.reviews} reviews)</Text>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push("/edit-profile")}
            >
              <Edit3 size={16} color="#3B82F6" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ProfileStats stats={stats} />

        <View style={styles.section}>
          <View style={styles.tabBar}>
            {[
              { key: "hosted", label: "Hosted", icon: Calendar },
              { key: "attended", label: "Attended", icon: Users },
              { key: "favorites", label: "Favorites", icon: Heart },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.tab,
                    activeTab === tab.key && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <Icon
                    size={18}
                    color={activeTab === tab.key ? "#3B82F6" : "#6B7280"}
                  />
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab.key && styles.activeTabText,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.eventsContainer}>
            {userEvents.map((event) => (
              <EventHistoryCard key={event.id} event={event} type={activeTab} />
            ))}
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementGrid}>
            <View style={styles.achievement}>
              <Award size={24} color="#F59E0B" />
              <Text style={styles.achievementText}>Super Host</Text>
            </View>
            <View style={styles.achievement}>
              <Users size={24} color="#10B981" />
              <Text style={styles.achievementText}>Community Builder</Text>
            </View>
            <View style={styles.achievement}>
              <Star size={24} color="#8B5CF6" />
              <Text style={styles.achievementText}>Top Rated</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
    paddingBottom: 24,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: "#6B7280",
  },
  bio: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F59E0B",
  },
  ratingCount: {
    fontSize: 14,
    color: "#6B7280",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#EBF8FF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3B82F6",
    gap: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B82F6",
  },
  section: {
    marginTop: 24,
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 6,
  },
  activeTab: {
    backgroundColor: "#EBF8FF",
    borderColor: "#3B82F6",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#3B82F6",
  },
  eventsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  achievementGrid: {
    flexDirection: "row",
    gap: 12,
  },
  achievement: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  achievementText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },
  actions: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  logoutButton: {
    backgroundColor: "#FEF2F2",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC2626",
  },
});
