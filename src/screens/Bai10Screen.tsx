import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { API } from '../api';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export default function Bai10Screen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(API.USER);

      const data = (await response.json()) as User;

      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>

      {user ? (
        <View>
          <Text style={styles.name}>
            {user?.name}
          </Text>

          <Text style={styles.text}>
            Username: {user?.username}
          </Text>

          <Text style={styles.text}>
            Email: {user?.email}
          </Text>

          <Text style={styles.text}>
            Phone: {user?.phone}
          </Text>

          <Text style={styles.text}>
            Website: {user?.website}
          </Text>
        </View>
      ) : (
        <Text>Không có dữ liệu người dùng.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  text: {
    fontSize: 15,
    marginBottom: 12,
  },
});