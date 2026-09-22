import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { books, formatPrice } from "../data";

type Props = {
  columns?: 2 | 3;
};

export default function BookGrid({ columns = 2 }: Props) {
  const isThree = columns === 3;

  return (
    <View style={[styles.grid, isThree && styles.gridThree]}>
      {books.map((book) => (
        <View
          key={book.id}
          style={[
            styles.card,
            isThree ? styles.cardThree : styles.cardTwo,
          ]}
        >
          {/* ẢNH BÌA + BADGE */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: book.image }}
              style={styles.image}
            />

            {book.discount && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {book.discount}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.name} numberOfLines={2}>
            {book.name}
          </Text>

          <Text style={styles.price}>
            {formatPrice(book.price)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridThree: {
    justifyContent: "flex-start",
    gap: "2%",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  cardTwo: {
    width: "48%",
    marginBottom: 12,
  },

  cardThree: {
    width: "32%",
    marginBottom: 12,
  },

  // VIEW CHA CỦA BADGE
  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },

  // BADGE ĐÈ LÊN ẢNH
  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#F43F5E",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "900",
  },

  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 8,
    minHeight: 36,
  },

  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4F46E5",
    marginTop: 4,
  },
});