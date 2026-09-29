import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Switch, StyleSheet, Alert, RefreshControl } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ProductCard, { Product } from './components/ProductCard';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isTile, setIsTile] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      // SV thay the URL API cua minh vao day (Vi du tu mockapi.io hoac mockaroo)
      const response = await fetch('https://64a106f30079ce56e2db34b9.mockapi.io/api/v1/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setProducts(fallbackData);
      }
    } catch (error) {
      console.error(error);
      setProducts(fallbackData);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, []);

  const handleSelectProduct = useCallback((id: string) => {
    const p = products.find(prod => prod.id === id);
    if (p) {
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(`Sản phẩm đã chọn: ${p.name}`);
      } else {
        Alert.alert('Sản phẩm đã chọn', p.name);
      }
    }
  }, [products]);

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      layout={isTile ? 'tile' : 'row'}
      onSelect={handleSelectProduct}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Product App</Text>
            <View style={styles.switchContainer}>
              <Text>Dạng lưới</Text>
              <Switch value={isTile} onValueChange={setIsTile} />
            </View>
          </View>

          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <FlatList
              data={products}
              key={isTile ? '2-columns' : '1-column'}
              keyExtractor={(item) => item.id}
              numColumns={isTile ? 2 : 1}
              renderItem={renderItem}
              columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 8,
  }
});

const fallbackData: Product[] = [
  { id: '1', name: 'Product 1', category: 'Category A', price: 10, rating: 8.5, image: 'https://via.placeholder.com/150', inStock: true },
  { id: '2', name: 'Product 2', category: 'Category B', price: 20, rating: 9.0, image: 'https://via.placeholder.com/150', inStock: false },
  { id: '3', name: 'Product 3', category: 'Category C', price: 30, rating: 7.5, image: 'https://via.placeholder.com/150', inStock: true },
  { id: '4', name: 'Product 4', category: 'Category A', price: 40, rating: 6.0, image: 'https://via.placeholder.com/150', inStock: true },
  { id: '5', name: 'Product 5', category: 'Category B', price: 50, rating: 8.0, image: 'https://via.placeholder.com/150', inStock: false },
];
