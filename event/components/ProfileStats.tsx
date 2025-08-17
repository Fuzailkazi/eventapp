import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProfileStatsProps {
  stats: {
    eventsHosted: number;
    eventsAttended: number;
    rating: number;
    reviews: number;
    followers: number;
    following: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statsGrid}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{stats.eventsHosted}</Text>
          <Text style={styles.statLabel}>Hosted</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{stats.eventsAttended}</Text>
          <Text style={styles.statLabel}>Attended</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{stats.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statsGrid: {
    flexDirection: "row",
    alignItems: "center",
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
  },
});
