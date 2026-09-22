import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>📚 BookStore</Text>

      <View style={styles.icons}>
        <Text style={styles.icon}>⌕</Text>
        <Text style={styles.icon}>🛒</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#4F46E5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  logo: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  icons: {
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
  },
  icon: {
    color: "white",
    fontSize: 22,
  },
});