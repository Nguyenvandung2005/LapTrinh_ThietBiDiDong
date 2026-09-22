import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import Header from "../components/Header";
import BookCard from "../components/BookCard";
import CategoryChips from "../components/CategoryChips";
import BookGrid from "../components/BookGrid";
import FloatingCart from "../components/FloatingCart";
import { books } from "../data";

type Props = {
  showExercises?: boolean;
};

export default function HomeScreen({
  showExercises = false,
}: Props) {
  return (
    <View style={styles.container}>
      {/* HEADER CỐ ĐỊNH */}
      <Header />

      {/* NỘI DUNG CUỘN */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {showExercises ? (
          <>
            {/* GIỜ 1 */}
            <Text style={styles.title}>
              Giờ 1 - Danh sách sách
            </Text>

            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}

            {/* GIỜ 2 */}
            <Text style={styles.title}>
              Giờ 2 - Danh mục
            </Text>

            <CategoryChips />

            <Text style={styles.title}>
              Giờ 2 - Lưới 2 cột
            </Text>

            <BookGrid columns={2} />

            <Text style={styles.title}>
              Thử thách - Lưới 3 cột
            </Text>

            <BookGrid columns={3} />

            {/* GIỜ 3 */}
            <Text style={styles.title}>
              Giờ 3 - Lưới có Badge
            </Text>

            <BookGrid columns={2} />
          </>
        ) : (
          <>
            {/* HOME HOÀN CHỈNH - GIỜ 4 */}
            <Text style={styles.title}>
              Danh mục sách
            </Text>

            <CategoryChips />

            <Text style={styles.title}>
              Sách nổi bật
            </Text>

            <BookGrid columns={2} />
          </>
        )}
      </ScrollView>

      {/* NÚT NỔI KHÔNG CUỘN */}
      <FloatingCart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F9FAFB",
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 110,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 12,
    marginBottom: 16,
  },
});