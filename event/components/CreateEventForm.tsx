import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Camera,
  Plus,
  Tag,
  X,
} from "lucide-react-native";

interface CreateEventFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  loading: boolean;
  onPickImage: () => void;
}

export function CreateEventForm({
  formData,
  setFormData,
  onSubmit,
  loading,
  onPickImage,
}: CreateEventFormProps) {
  const [newTag, setNewTag] = useState("");

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
    "Other",
  ];

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev: { tags: any }) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev: { tags: any[] }) => ({
      ...prev,
      tags: prev.tags.filter((tag: string) => tag !== tagToRemove),
    }));
  };

  return (
    <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <TouchableOpacity style={styles.imageUpload} onPress={onPickImage}>
          {formData.image ? (
            <Image
              source={{ uri: formData.image }}
              style={styles.uploadedImage}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Camera size={32} color="#9CA3AF" />
              <Text style={styles.imageUploadText}>Add Event Photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Event Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) =>
            setFormData((prev: any) => ({ ...prev, title: text }))
          }
          placeholder="Enter event title"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) =>
            setFormData((prev: any) => ({ ...prev, description: text }))
          }
          placeholder="Describe your event..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                formData.category === category && styles.selectedCategoryChip,
              ]}
              onPress={() =>
                setFormData((prev: any) => ({ ...prev, category }))
              }
            >
              <Text
                style={[
                  styles.categoryChipText,
                  formData.category === category &&
                    styles.selectedCategoryChipText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Location *</Text>
        <View style={styles.inputContainer}>
          <MapPin size={20} color="#9CA3AF" />
          <TextInput
            style={styles.inputWithIcon}
            value={formData.location}
            onChangeText={(text) =>
              setFormData((prev: any) => ({ ...prev, location: text }))
            }
            placeholder="Enter location"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.label}>Date *</Text>
          <View style={styles.inputContainer}>
            <Calendar size={20} color="#9CA3AF" />
            <TextInput
              style={styles.inputWithIcon}
              value={formData.date}
              onChangeText={(text) =>
                setFormData((prev: any) => ({ ...prev, date: text }))
              }
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.label}>Time</Text>
          <View style={styles.inputContainer}>
            <Clock size={20} color="#9CA3AF" />
            <TextInput
              style={styles.inputWithIcon}
              value={formData.time}
              onChangeText={(text) =>
                setFormData((prev: any) => ({ ...prev, time: text }))
              }
              placeholder="HH:MM"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Max Attendees</Text>
        <View style={styles.inputContainer}>
          <Users size={20} color="#9CA3AF" />
          <TextInput
            style={styles.inputWithIcon}
            value={formData.maxAttendees}
            onChangeText={(text) =>
              setFormData((prev: any) => ({ ...prev, maxAttendees: text }))
            }
            placeholder="Enter max attendees"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Tags</Text>
        <View style={styles.tagContainer}>
          <View style={styles.addTagContainer}>
            <Tag size={20} color="#9CA3AF" />
            <TextInput
              style={styles.tagInput}
              value={newTag}
              onChangeText={setNewTag}
              placeholder="Add a tag"
              placeholderTextColor="#9CA3AF"
              onSubmitEditing={addTag}
            />
            <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
              <Plus size={16} color="#3B82F6" />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsDisplay}>
            {formData.tags.map(
              (
                tag:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactPortal
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                  <TouchableOpacity onPress={() => removeTag(tag)}>
                    <X size={14} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              )
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabledButton]}
        onPress={onSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? "Creating Event..." : "Create Event"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  textArea: {
    height: 100,
    paddingVertical: 12,
    textAlignVertical: "top",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 48,
  },
  inputWithIcon: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  imageUpload: {
    height: 200,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    overflow: "hidden",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
  },
  imageUploadText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
  },
  categoryScroll: {
    maxHeight: 50,
  },
  categoryChip: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  selectedCategoryChip: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  selectedCategoryChipText: {
    color: "#FFFFFF",
  },
  tagContainer: {
    gap: 12,
  },
  addTagContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 48,
  },
  tagInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  addTagButton: {
    padding: 4,
  },
  tagsDisplay: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF8FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3B82F6",
    gap: 6,
  },
  tagText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
