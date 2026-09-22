import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { categories } from "../data";

export default function CategoryChips() {
  return (
    <View style={styles.container}>
      {categories.map((item) => (
        <View key={item} style={styles.chip}>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E0E7FF", // Light Indigo
  },
  text: {
    color: "#4338CA", // Dark Indigo
    fontSize: 13,
    fontWeight: "600",
  },
});