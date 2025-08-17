import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Filter, MapPin, Calendar, Users, Heart } from "lucide-react-native";
import { router } from "expo-router";
import { useEvents } from "@/hooks/useEvents";
import { EventCard } from "@/components/EventCard";
import { FilterModal } from "@/components/FilterModal";

export default function EventsScreen() {
  const { events, loading, refreshEvents, toggleFavorite } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    location: "",
    date: "",
  });

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilters.category === "" ||
        event.category === selectedFilters.category) &&
      (selectedFilters.location === "" ||
        event.location.includes(selectedFilters.location))
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Local Events</Text>
        <Text style={styles.subtitle}>Discover amazing events near you</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Filter size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {selectedFilters.category || selectedFilters.location ? (
        <View style={styles.activeFilters}>
          {selectedFilters.category && (
            <View style={styles.filterChip}>
              <Text style={styles.filterChipText}>
                {selectedFilters.category}
              </Text>
            </View>
          )}
          {selectedFilters.location && (
            <View style={styles.filterChip}>
              <Text style={styles.filterChipText}>
                {selectedFilters.location}
              </Text>
            </View>
          )}
        </View>
      ) : null}

      <ScrollView
        style={styles.eventsList}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshEvents} />
        }
        showsVerticalScrollIndicator={false}
      >
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => router.push(`/event/${event.id}`)}
            onToggleFavorite={() => toggleFavorite(event.id)}
          />
        ))}

        {filteredEvents.length === 0 && !loading && (
          <View style={styles.emptyState}>
            <Calendar size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No events found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={selectedFilters}
        onApplyFilters={setSelectedFilters}
      />
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
    paddingBottom: 16,
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
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeFilters: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    backgroundColor: "#EBF8FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  filterChipText: {
    color: "#3B82F6",
    fontSize: 12,
    fontWeight: "600",
  },
  eventsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
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
  },
});
