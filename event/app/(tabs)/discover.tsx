import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MapPin, Star, TrendingUp, Users } from "lucide-react-native";
import { CategoryCard } from "@/components/CategoryCard";
import { PopularEventCard } from "@/components/PopularEventCard";
import { useEvents } from "@/hooks/useEvents";

export default function DiscoverScreen() {
  const { events, popularEvents, categories } = useEvents();
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>Find your next adventure</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                selected={selectedCategory === category.name}
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === category.name ? "" : category.name
                  )
                }
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#F97316" />
            <Text style={styles.sectionTitle}>Trending Now</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingContainer}
          >
            {popularEvents.map((event) => (
              <PopularEventCard key={event.id} event={event} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>Near You</Text>
          </View>
          {events.slice(0, 3).map((event) => (
            <View key={event.id} style={styles.nearbyEventCard}>
              <View style={styles.nearbyEventInfo}>
                <Text style={styles.nearbyEventTitle}>{event.title}</Text>
                <Text style={styles.nearbyEventLocation}>{event.location}</Text>
                <View style={styles.nearbyEventMeta}>
                  <View style={styles.nearbyEventRating}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{event.rating}</Text>
                  </View>
                  <View style={styles.nearbyEventAttendees}>
                    <Users size={14} color="#6B7280" />
                    <Text style={styles.attendeesText}>{event.attendees}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.nearbyEventDistance}>
                <Text style={styles.distanceText}>
                  0.{Math.floor(Math.random() * 9) + 1}km
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Based on your interests and past events
          </Text>
          {events.slice(3, 6).map((event) => (
            <PopularEventCard key={event.id} event={event} compact />
          ))}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
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
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  sectionDescription: {
    fontSize: 14,
    color: "#6B7280",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  trendingContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  nearbyEventCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  nearbyEventInfo: {
    flex: 1,
  },
  nearbyEventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  nearbyEventLocation: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  nearbyEventMeta: {
    flexDirection: "row",
    gap: 16,
  },
  nearbyEventRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "600",
  },
  nearbyEventAttendees: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  attendeesText: {
    fontSize: 12,
    color: "#6B7280",
  },
  nearbyEventDistance: {
    backgroundColor: "#EBF8FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  distanceText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "600",
  },
});
