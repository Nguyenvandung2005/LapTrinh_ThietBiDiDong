import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductCard, { Product } from '../components/ProductCard';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  category: 'Test Category',
  price: 99.9,
  rating: 8,
  image: 'https://test.com/image.jpg',
  inStock: true,
};

describe('ProductCard Component', () => {
  it('renders correctly and displays right format for rating', () => {
    const { getByText } = render(<ProductCard product={mockProduct} onSelect={() => {}} />);
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('⭐ 8.0')).toBeTruthy();
  });

  it('displays category in row layout and hides in tile layout', () => {
    // layout="row"
    const { getByText, queryByText, rerender } = render(
      <ProductCard product={mockProduct} layout="row" onSelect={() => {}} />
    );
    expect(getByText('Test Category')).toBeTruthy();

    // layout="tile"
    rerender(<ProductCard product={mockProduct} layout="tile" onSelect={() => {}} />);
    expect(queryByText('Test Category')).toBeNull();
  });

  it('displays correct stock status', () => {
    // inStock: true -> ✅
    const { getByText, rerender } = render(
      <ProductCard product={mockProduct} onSelect={() => {}} />
    );
    expect(getByText('✅ Còn hàng')).toBeTruthy();

    // inStock: false -> ❌
    const outOfStockProduct = { ...mockProduct, inStock: false };
    rerender(<ProductCard product={outOfStockProduct} onSelect={() => {}} />);
    expect(getByText('❌ Hết hàng')).toBeTruthy();
  });

  it('calls onSelect with product id when pressed', () => {
    const onSelectMock = jest.fn();
    const { getByTestId } = render(
      <ProductCard product={mockProduct} onSelect={onSelectMock} />
    );
    
    const card = getByTestId('product-card');
    fireEvent.press(card);
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(mockProduct.id);
  });
});
