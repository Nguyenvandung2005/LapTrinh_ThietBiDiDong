import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Book, formatPrice } from "../data";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: book.image }}
        style={styles.image}
      />

      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={2}>
            {book.name}
          </Text>

          <Text style={styles.author}>{book.author}</Text>
        </View>

        <Text style={styles.price}>
          {formatPrice(book.price)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 12,
    marginBottom: 12,
    borderRadius: 16,
    gap: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  info: {
    flex: 1,
    height: 110,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  author: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 13,
  },
  price: {
    color: "#4F46E5",
    fontSize: 17,
    fontWeight: "bold",
  },
});