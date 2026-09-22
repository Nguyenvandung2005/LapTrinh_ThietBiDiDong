import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FloatingCart() {
  return (
    <View style={styles.cart}>
      <Text style={styles.icon}>🛒</Text>

      <View style={styles.countBadge}>
        <Text style={styles.countText}>4</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // NÚT GIỎ HÀNG NỔI
  cart: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F43F5E",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#F43F5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    zIndex: 10,
  },

  icon: {
    fontSize: 26,
    color: "white",
  },

  // BADGE SỐ LƯỢNG
  countBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "white",
  },

  countText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});