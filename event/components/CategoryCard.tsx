import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: string;
    count: number;
  };
  selected: boolean;
  onPress: () => void;
}

export function CategoryCard({
  category,
  selected,
  onPress,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selectedCard]}
      onPress={onPress}
    >
      <Text style={styles.icon}>{category.icon}</Text>
      <Text style={[styles.name, selected && styles.selectedName]}>
        {category.name}
      </Text>
      <Text style={[styles.count, selected && styles.selectedCount]}>
        {category.count} events
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  selectedCard: {
    backgroundColor: "#EBF8FF",
    borderColor: "#3B82F6",
  },
  icon: {
    fontSize: 28,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    marginBottom: 4,
  },
  selectedName: {
    color: "#3B82F6",
  },
  count: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  selectedCount: {
    color: "#3B82F6",
  },
});
