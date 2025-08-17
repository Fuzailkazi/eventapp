import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { X, Check } from "lucide-react-native";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: {
    category: string;
    location: string;
    date: string;
  };
  onApplyFilters: (filters: any) => void;
}

export function FilterModal({
  visible,
  onClose,
  filters,
  onApplyFilters,
}: FilterModalProps) {
  const [tempFilters, setTempFilters] = useState(filters);

  const categories = [
    "Technology",
    "Sports",
    "Arts",
    "Music",
    "Food",
    "Business",
    "Health",
    "Education",
    "Travel",
    "Social",
  ];

  const locations = [
    "San Francisco",
    "Oakland",
    "Berkeley",
    "San Jose",
    "Palo Alto",
  ];

  const applyFilters = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters = { category: "", location: "", date: "" };
    setTempFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.optionsGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.option,
                    tempFilters.category === category && styles.selectedOption,
                  ]}
                  onPress={() =>
                    setTempFilters((prev) => ({
                      ...prev,
                      category: prev.category === category ? "" : category,
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      tempFilters.category === category &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {category}
                  </Text>
                  {tempFilters.category === category && (
                    <Check size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.optionsGrid}>
              {locations.map((location) => (
                <TouchableOpacity
                  key={location}
                  style={[
                    styles.option,
                    tempFilters.location === location && styles.selectedOption,
                  ]}
                  onPress={() =>
                    setTempFilters((prev) => ({
                      ...prev,
                      location: prev.location === location ? "" : location,
                    }))
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      tempFilters.location === location &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {location}
                  </Text>
                  {tempFilters.location === location && (
                    <Check size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  clearButton: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 6,
  },
  selectedOption: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  applyButton: {
    backgroundColor: "#3B82F6",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
