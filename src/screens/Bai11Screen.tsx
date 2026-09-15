import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { API } from '../api';

type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductResponse = {
  products: Product[];
  total: number;
};

export default function Bai11Screen() {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const searchProducts = async (
    keyword: string,
    limit: number
  ): Promise<void> => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API.PRODUCT_SEARCH}?q=${encodeURIComponent(
          keyword
        )}&limit=${limit}`
      );

      const data =
        (await response.json()) as ProductResponse;

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tìm kiếm sản phẩm
      </Text>

      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập tên sản phẩm"
      />

      <Button
        title="Tìm kiếm"
        onPress={() => searchProducts(keyword, 10)}
      />

      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>
                {item.title}
              </Text>

              <Text>
                ${item.price}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Chưa có kết quả
            </Text>
          }
        />
      )}
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
    marginBottom: 10,
  },

  loading: {
    marginTop: 20,
  },

  list: {
    marginTop: 15,
  },

  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    flex: 1,
    marginRight: 10,
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777777',
  },
});