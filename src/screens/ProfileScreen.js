import React, { useContext, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

function UserProfile() {
  const { user, logout } = useContext(UserContext);

  if (!user) {
    return (
      <View style={styles.card}>
        <Text style={styles.loggedOutText}>Bạn chưa đăng nhập</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Đăng xuất" color="#DC2626" onPress={logout} />
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  });

  const logout = () => {
    setUser(null);
  };

  const loginDefault = () => {
    setUser({
      name: 'Nguyễn Văn An',
      email: 'nguyenvanan@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    });
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      <View style={styles.container}>
        <Text style={styles.title}>Hồ sơ cá nhân</Text>
        <UserProfile />

        {!user && (
          <View style={styles.loginBtn}>
            <Button title="Đăng nhập lại" color="#0284C7" onPress={loginDefault} />
          </View>
        )}
      </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    backgroundColor: '#E5E7EB',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  loggedOutText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    paddingVertical: 16,
  },
  loginBtn: {
    marginTop: 16,
  },
});