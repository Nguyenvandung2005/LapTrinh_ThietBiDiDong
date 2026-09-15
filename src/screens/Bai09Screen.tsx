import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { API } from '../api';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Bai09Screen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API.TODOS);

      const data = (await response.json()) as Todo[];

      setTodos(data.slice(0, 10));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách công việc</Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.id}>#{item.id}</Text>

            <View style={styles.info}>
              <Text style={styles.name}>
                {item.title}
              </Text>

              <Text style={styles.status}>
                {item.completed
                  ? 'Đã hoàn thành'
                  : 'Chưa hoàn thành'}
              </Text>
            </View>
          </View>
        )}
      />
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
    marginBottom: 15,
  },

  item: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },

  id: {
    width: 40,
    color: '#777777',
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 15,
  },

  status: {
    fontSize: 12,
    color: '#777777',
    marginTop: 5,
  },
});