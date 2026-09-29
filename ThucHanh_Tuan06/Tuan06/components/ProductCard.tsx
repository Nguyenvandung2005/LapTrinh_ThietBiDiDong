import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
};

export type ProductCardProps = {
  product: Product;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'row', onSelect }) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity 
      testID="product-card"
      style={[styles.card, isTile && styles.cardTile]} 
      onPress={() => onSelect(product.id)}
    >
      <View style={isTile ? styles.imageContainerTile : styles.imageContainerRow}>
        <Image source={{ uri: product.image }} style={isTile ? styles.imageTile : styles.imageRow} />
        {isTile && (
          <View style={styles.ratingBadgeTile}>
            <Text style={styles.ratingText}>⭐ {product.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
      <View style={[styles.infoContainer, isTile && styles.infoContainerTile]}>
        <Text style={styles.name} numberOfLines={isTile ? 1 : undefined}>{product.name}</Text>
        
        {!isTile && <Text style={styles.category}>{product.category}</Text>}
        {!isTile && (
          <View style={styles.rowInfo}>
             <Text style={styles.ratingTextRow}>⭐ {product.rating.toFixed(1)}</Text>
             <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
        )}
        
        <Text style={styles.status}>
          {product.inStock ? '✅ Còn hàng' : '❌ Hết hàng'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardTile: {
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 8,
    padding: 0,
    overflow: 'hidden',
  },
  imageContainerRow: {
    marginRight: 12,
  },
  imageContainerTile: {
    width: '100%',
    aspectRatio: 2/3,
    position: 'relative',
  },
  imageRow: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },
  imageTile: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingBadgeTile: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingTextRow: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  infoContainerTile: {
    padding: 8,
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E53935',
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  }
});

export default React.memo(ProductCard);
