import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Số lượng: {count}</Text>

      <View style={styles.buttonGroup}>
        <Button
          title="Tăng (+1)"
          onPress={() => setCount((prev) => prev + 1)}
        />
        <Button
          title="Giảm (-1)"
          color="#DC2626"
          onPress={() => setCount((prev) => Math.max(0, prev - 1))}
        />
        <Button
          title="Đặt lại (Reset)"
          color="#4B5563"
          onPress={() => setCount(0)}
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
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1D4ED8',
  },
  buttonGroup: {
    gap: 10,
  },
});