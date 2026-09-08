import React, { useState, useMemo, useCallback, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';

const products = [
  { id: '1', name: 'Áo thun', price: 200000 },
  { id: '2', name: 'Quần jean', price: 450000 },
  { id: '3', name: 'Giày thể thao', price: 800000 },
  { id: '4', name: 'Áo khoác gió', price: 350000 },
  { id: '5', name: 'Balo laptop', price: 500000 },
];

// 3. Tối ưu component con bằng React.memo kèm log kiểm tra render
const ProductItem = memo(function ProductItem({ item, onSelect }) {
  console.log(`[RENDER] ProductItem: ${item.name}`);

  return (
    <View style={styles.itemWrapper}>
      <Button
        title={`${item.name} - ${item.price.toLocaleString('vi-VN')}đ`}
        onPress={() => onSelect(item)}
      />
    </View>
  );
});

export default function ProductTotalScreen() {
  const [keyword, setKeyword] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('none'); // 'none' | 'asc' | 'desc'
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 1 & 2. Lọc theo tên, mức giá tối đa và sắp xếp bằng useMemo
  const processedProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.name.toLowerCase().includes(keyword.trim().toLowerCase())
    );

    const numericMaxPrice = parseFloat(maxPrice);
    if (!isNaN(numericMaxPrice) && numericMaxPrice > 0) {
      result = result.filter((product) => product.price <= numericMaxPrice);
    }

    if (sortOrder === 'asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [keyword, maxPrice, sortOrder]);

  // Tính tổng giá tiền của danh sách đang hiển thị
  const totalPrice = useMemo(() => {
    return processedProducts.reduce(
      (total, product) => total + product.price,
      0
    );
  }, [processedProducts]);

  // Giữ nguyên tham chiếu hàm bằng useCallback
  const handleSelect = useCallback((product) => {
    setSelectedProduct(product.name);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản Lý & Lọc Sản Phẩm Nâng Cao</Text>

      {/* Bộ lọc tìm kiếm & giá */}
      <View style={styles.filterCard}>
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Tìm theo tên..."
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        <TextInput
          value={maxPrice}
          onChangeText={(text) => setMaxPrice(text.replace(/[^0-9]/g, ''))}
          placeholder="Giá tối đa (VNĐ)..."
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Nút sắp xếp */}
        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>Sắp xếp giá:</Text>
          <View style={styles.sortButtonGroup}>
            <Pressable
              style={[
                styles.sortBtn,
                sortOrder === 'asc' && styles.sortBtnActive,
              ]}
              onPress={() => setSortOrder(sortOrder === 'asc' ? 'none' : 'asc')}
            >
              <Text
                style={[
                  styles.sortBtnText,
                  sortOrder === 'asc' && styles.sortBtnTextActive,
                ]}
              >
                Tăng dần ↑
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.sortBtn,
                sortOrder === 'desc' && styles.sortBtnActive,
              ]}
              onPress={() =>
                setSortOrder(sortOrder === 'desc' ? 'none' : 'desc')
              }
            >
              <Text
                style={[
                  styles.sortBtnText,
                  sortOrder === 'desc' && styles.sortBtnTextActive,
                ]}
              >
                Giảm dần ↓
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Hiển thị sản phẩm đã chọn */}
      <View style={styles.selectedBox}>
        <Text style={styles.selectedText}>
          Sản phẩm đã chọn: {selectedProduct || 'Chưa chọn'}
        </Text>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={processedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={handleSelect} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào</Text>
        }
      />

      {/* Tổng tiền */}
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>
          Tổng giá ({processedProducts.length} sản phẩm):
        </Text>
        <Text style={styles.totalValue}>
          {totalPrice.toLocaleString('vi-VN')}đ
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111827',
  },
  filterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#F9FAFB',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  sortButtonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  sortBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  sortBtnActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  sortBtnText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '600',
  },
  sortBtnTextActive: {
    color: '#FFFFFF',
  },
  selectedBox: {
    padding: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  selectedText: {
    fontSize: 14,
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
  totalBox: {
    marginTop: 'auto',
    padding: 14,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 13,
    color: '#065F46',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#047857',
    marginTop: 2,
  },
});