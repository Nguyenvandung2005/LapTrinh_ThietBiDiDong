import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export type Tab = "home" | "category" | "cart" | "account";

type Props = {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
};

const tabs: { key: Tab; icon: string; label: string }[] = [
  { key: "home", icon: "⌂", label: "Trang chủ" },
  { key: "category", icon: "▦", label: "Danh mục" },
  { key: "cart", icon: "🛒", label: "Giỏ hàng" },
  { key: "account", icon: "♙", label: "Tài khoản" },
];

export default function BottomTab({ activeTab, onChange }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            style={styles.item}
            onPress={() => onChange(tab.key)}
          >
            <Text style={[styles.icon, active && styles.active]}>
              {tab.icon}
            </Text>

            <Text style={[styles.label, active && styles.active]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  item: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  icon: {
    fontSize: 23,
    color: "#9CA3AF",
  },

  label: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  active: {
    color: "#4F46E5",
    fontWeight: "bold",
  },
});