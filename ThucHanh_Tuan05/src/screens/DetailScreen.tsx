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

export default function DetailScreen() {
  const book = books[0];

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
        {/* ẢNH BÌA CĂN GIỮA */}
        <Image
          source={{ uri: book.image }}
          style={styles.image}
        />

        <Text style={styles.name}>
          {book.name}
        </Text>

        <Text style={styles.author}>
          Tác giả: {book.author}
        </Text>

        <Text style={styles.price}>
          {formatPrice(book.price)}
        </Text>

        <Text style={styles.heading}>
          Giới thiệu sách
        </Text>

        <Text style={styles.description}>
          {book.name} là một cuốn sách mang đến
          những câu chuyện và bài học thú vị cho
          người đọc.
          {"\n\n"}
          Nội dung sách giúp người đọc khám phá
          thêm những góc nhìn mới về cuộc sống,
          suy nghĩ và những lựa chọn của bản thân.
          {"\n\n"}
          Cuốn sách được trình bày dễ hiểu,
          phù hợp với những người yêu thích
          đọc sách và muốn mở rộng kiến thức.
          {"\n\n"}
          Đây là phần mô tả dài dùng để kiểm tra
          ScrollView trong React Native.
          {"\n\n"}
          Khi nội dung tăng lên, người dùng có
          thể cuộn để xem toàn bộ thông tin.
          Thanh thêm vào giỏ bên dưới vẫn phải
          đứng yên.
          {"\n\n"}
          Nội dung bổ sung để kiểm tra bố cục
          trên các thiết bị có chiều cao khác nhau.
        </Text>
      </ScrollView>

      {/* THANH DƯỚI CỐ ĐỊNH */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>
            Giá bán
          </Text>

          <Text style={styles.bottomPrice}>
            {formatPrice(book.price)}
          </Text>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            + Thêm vào giỏ
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

  content: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },

  image: {
    alignSelf: "center",
    width: 190,
    aspectRatio: 3 / 4,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  name: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
  },

  author: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 8,
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F43F5E",
    marginTop: 12,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 24,
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 25,
  },

  // THANH CỐ ĐỊNH NGOÀI SCROLLVIEW
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  priceLabel: {
    color: "#6B7280",
    fontSize: 13,
  },

  bottomPrice: {
    color: "#F43F5E",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 4,
  },

  button: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});