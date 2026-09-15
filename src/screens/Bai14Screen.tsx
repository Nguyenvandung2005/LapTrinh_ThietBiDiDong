import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { API } from '../api';

type Product = {
  id: number;
  title: string;
  price: number;
};

interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}

type DummyResponse = {
  products: Product[];
  total: number;
};

export default function Bai14Screen() {
  const [page, setPage] = useState(1);

  const [result, setResult] =
    useState<ApiResponse<Product> | null>(null);

  const [loading, setLoading] = useState(false);

  const limit = 5;

  const loadProducts = async (
    pageNumber: number
  ): Promise<void> => {
    try {
      setLoading(true);

      const skip = (pageNumber - 1) * limit;

      const response = await fetch(
        `${API.PRODUCTS}?limit=${limit}&skip=${skip}`
      );

      const data =
        (await response.json()) as DummyResponse;

      setResult({
        data: data.products,
        total: data.total,
        page: pageNumber,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const nextPage = () => {
    if (result && page * limit < result.total) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Generic Interface
      </Text>

      <Text style={styles.page}>
        Trang: {page}
      </Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={result?.data ?? []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>
                {item.title}
              </Text>

              <Text>${item.price}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.buttons}>
        <Button
          title="Trang trước"
          onPress={previousPage}
          disabled={page === 1}
        />

        <Button
          title="Trang sau"
          onPress={nextPage}
          disabled={
            !result ||
            page * limit >= result.total
          }
        />
      </View>
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
    marginBottom: 10,
  },

  page: {
    marginBottom: 15,
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
    flex: 1,
    marginRight: 10,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
  },
});