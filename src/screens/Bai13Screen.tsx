import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Áo thun',
    price: 200000,
  },
  {
    id: 2,
    name: 'Quần jean',
    price: 450000,
  },
  {
    id: 3,
    name: 'Giày thể thao',
    price: 800000,
  },
  {
    id: 4,
    name: 'Mũ lưỡi trai',
    price: 120000,
  },
];

function filterByName<T extends { name: string }>(
  items: T[],
  keyword: string
): T[] {
  return items.filter((item) =>
    item.name
      .toLowerCase()
      .includes(keyword.trim().toLowerCase())
  );
}

export default function Bai13Screen() {
  const [keyword, setKeyword] = useState('');

  const result = filterByName(
    products,
    keyword
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Generic - Lọc sản phẩm
      </Text>

      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập tên sản phẩm"
      />

      <Text style={styles.count}>
        Có {result.length} sản phẩm
      </Text>

      <FlatList
        data={result}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text>
              {item.price.toLocaleString()}đ
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Không tìm thấy sản phẩm
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    padding: 12,
  },

  count: {
    marginVertical: 15,
    color: '#666666',
  },

  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 15,
  },

  empty: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 30,
  },
});