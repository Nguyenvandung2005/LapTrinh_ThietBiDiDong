import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { API } from '../api';

type ApiError = {
  message: string;
};

export default function Bai12Screen() {
  const [message, setMessage] = useState(
    'Chưa kiểm tra API'
  );

  const [loading, setLoading] = useState(false);

  const checkApi = async (): Promise<void> => {
    try {
      setLoading(true);
      setMessage('Đang kiểm tra...');

      const response = await fetch(API.WRONG_API);

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status}`
        );
      }

      setMessage('API hoạt động bình thường');
    } catch (error) {
      const apiError = error as ApiError;

      setMessage('Có lỗi xảy ra');

      Alert.alert(
        'Lỗi',
        apiError.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Xử lý lỗi API
      </Text>

      <Text style={styles.message}>
        {message}
      </Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title="Kiểm tra API"
          onPress={checkApi}
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
    marginBottom: 20,
  },

  message: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 20,
  },
});