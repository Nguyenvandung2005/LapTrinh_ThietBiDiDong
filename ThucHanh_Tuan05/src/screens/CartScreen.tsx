import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import Header from "../components/Header";
import { books, formatPrice } from "../data";

const cartItems = [
  { book: books[0], quantity: 2 },
  { book: books[1], quantity: 1 },
  { book: books[2], quantity: 1 },
  { book: books[3], quantity: 1 },
];

export default function CartScreen() {
  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.book.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      {/* HEADER CỐ ĐỊNH */}
      <Header />

      <Text style={styles.title}>
        Giỏ hàng của bạn
      </Text>

      {/* DANH SÁCH CUỘN */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item) => (
          <View
            key={item.book.id}
            style={styles.cartItem}
          >
            <Image
              source={{ uri: item.book.image }}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text
                style={styles.name}
                numberOfLines={2}
              >
                {item.book.name}
              </Text>

              <Text style={styles.quantity}>
                Số lượng: {item.quantity}
              </Text>
            </View>

            <Text style={styles.price}>
              {formatPrice(
                item.book.price * item.quantity
              )}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* TỔNG TIỀN CỐ ĐỊNH */}
      <View style={styles.checkout}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            Tổng tiền
          </Text>

          <Text style={styles.totalPrice}>
            {formatPrice(total)}
          </Text>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Thanh toán
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    padding: 16,
  },

  content: {
    flex: 1,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  image: {
    width: 55,
    height: 75,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
  },

  quantity: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
  },

  price: {
    width: 90,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
    color: "#4F46E5",
  },

  checkout: {
    backgroundColor: "white",
    padding: 16,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B5563",
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: "900",
    color: "#F43F5E",
  },

  button: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});