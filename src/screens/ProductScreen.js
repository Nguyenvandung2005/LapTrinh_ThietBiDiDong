import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

const ProductItem = memo(function ProductItem({ item, onSelect }) {
  return (
    <View style={styles.itemWrapper}>
      <Button
        title={`${item.name} - ${item.price.toLocaleString('vi-VN')}đ`}
        onPress={() => onSelect(item)}
      />
    </View>
  );
});

export default function ProductScreen() {
  const [keyword, setKeyword] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const products = useMemo(
    () => [
      { id: '1', name: 'Điện thoại', price: 12000000 },
      { id: '2', name: 'Máy tính bảng', price: 9000000 },
      { id: '3', name: 'Tai nghe', price: 1500000 },
      { id: '4', name: 'Đồng hồ thông minh', price: 3500000 },
      { id: '5', name: 'Bàn phím cơ', price: 1800000 },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return products.filter((product) =>
      product.name.toLowerCase().includes(normalizedKeyword)
    );
  }, [keyword, products]);

  const handleSelectProduct = useCallback((product) => {
    setSelectedName(product.name);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lọc sản phẩm (useMemo & useCallback)</Text>

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập tên sản phẩm để tìm..."
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />

      <View style={styles.selectedBox}>
        <Text style={styles.selectedText}>
          Sản phẩm đã chọn: {selectedName || 'Chưa chọn'}
        </Text>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={handleSelectProduct} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9FAFB',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
  },
  selectedBox: {
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  selectedText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  itemWrapper: {
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 20,
    fontStyle: 'italic',
  },
});