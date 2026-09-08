import React, { useReducer } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const initialState = {
  quantity: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, quantity: state.quantity + 1 };

    case 'REMOVE':
      return {
        ...state,
        quantity: Math.max(0, state.quantity - 1),
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default function CartScreen() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ví dụ: useReducer</Text>
      <Text style={styles.title}>Số sản phẩm: {state.quantity}</Text>

      <View style={styles.buttonGroup}>
        <Button
          title="Thêm sản phẩm"
          onPress={() => dispatch({ type: 'ADD' })}
        />

        <Button
          title="Bớt sản phẩm"
          color="#DC2626"
          onPress={() => dispatch({ type: 'REMOVE' })}
        />

        <Button
          title="Xóa giỏ hàng"
          color="#4B5563"
          onPress={() => dispatch({ type: 'RESET' })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: '#374151',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2563EB',
    marginBottom: 16,
  },
  buttonGroup: {
    gap: 12,
  },
});