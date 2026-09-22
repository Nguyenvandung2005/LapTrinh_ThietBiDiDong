import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import CartScreen from "./src/screens/CartScreen";
import CategoryChips from "./src/components/CategoryChips";
import BottomTab, {
  Tab,
} from "./src/components/BottomTab";

type Screen = "home" | "detail" | "exercises";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [screen, setScreen] = useState<Screen>("home");

  const changeTab = (nextTab: Tab) => {
    setTab(nextTab);
    setScreen("home");
  };

  return (
    <SafeAreaView style={styles.container}>
      {tab === "home" && (
        <View style={styles.menu}>
          <Pressable
            onPress={() => setScreen("home")}
          >
            <Text style={styles.menuText}>
              Home
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setScreen("detail")}
          >
            <Text style={styles.menuText}>
              Detail
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setScreen("exercises")}
          >
            <Text style={styles.menuText}>
              Bài tập
            </Text>
          </Pressable>
        </View>
      )}

      <View style={styles.content}>
        {tab === "home" && (
          <>
            {screen === "home" && (
              <HomeScreen />
            )}

            {screen === "detail" && (
              <DetailScreen />
            )}

            {screen === "exercises" && (
              <HomeScreen showExercises />
            )}
          </>
        )}

        {tab === "category" && (
          <View style={styles.simpleScreen}>
            <Text style={styles.title}>
              Danh mục sách
            </Text>

            <CategoryChips />
          </View>
        )}

        {tab === "cart" && (
          <CartScreen />
        )}

        {tab === "account" && (
          <View style={styles.simpleScreen}>
            <Text style={styles.title}>
              Tài khoản
            </Text>

            <Text>
              Nguyễn Trọng Đạt
            </Text>
          </View>
        )}
      </View>

      <BottomTab
        activeTab={tab}
        onChange={changeTab}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F46E5",
  },

  menu: {
    height: 48,
    backgroundColor: "#4338CA",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  menuText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  content: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  simpleScreen: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },
});