import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import CounterScreen from './src/screens/CounterScreen';
import GreetingScreen from './src/screens/GreetingScreen';
import TimerScreen from './src/screens/TimerScreen';
import ConnectionStatusScreen from './src/screens/ConnectionStatusScreen';
import ThemeScreen from './src/screens/ThemeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CartScreen from './src/screens/CartScreen';
import LoginFormScreen from './src/screens/LoginFormScreen';
import ProductScreen from './src/screens/ProductScreen';
import ProductTotalScreen from './src/screens/ProductTotalScreen';
import TodoAppScreen from './src/screens/TodoAppScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen !== 'menu' && (
        <Pressable
          onPress={() => setCurrentScreen('menu')}
          style={styles.backButton}
        >
          <Text style={styles.backText}>⬅ Quay lại Menu bài tập</Text>
        </Pressable>
      )}

      {currentScreen === 'menu' && (
        <ScrollView contentContainerStyle={styles.menuContainer}>
          <Text style={styles.menuTitle}>BÀI TẬP TUẦN 03 - REACT HOOKS</Text>
          <Text style={styles.menuSubtitle}>Danh sách các bài thực hành:</Text>

          <Pressable
            style={styles.menuBtn}
            onPress={() => setCurrentScreen('counter')}
          >
            <Text style={styles.menuBtnText}>1. useState: Bộ đếm số lượng</Text>
          </Pressable>

          <Pressable
            style={[styles.menuBtn, styles.menuBtnGreen]}
            onPress={() => setCurrentScreen('greeting')}
          >
            <Text style={styles.menuBtnText}>2. useState: Form nhập họ tên</Text>
          </Pressable>

          <Pressable
            style={[styles.menuBtn, styles.menuBtnPurple]}
            onPress={() => setCurrentScreen('timer')}
          >
            <Text style={styles.menuBtnText}>3. useEffect: Đồng hồ đếm giây</Text>
          </Pressable>

          <Pressable
            style={[styles.menuBtn, styles.menuBtnOrange]}
            onPress={() => setCurrentScreen('connection')}
          >
            <Text style={styles.menuBtnText}>4. useEffect: Theo dõi kết nối</Text>
          </Pressable>

          <Pressable
            style={[styles.menuBtn, styles.menuBtnDark]}
            onPress={() => setCurrentScreen('theme')}
          >
            <Text style={styles.menuBtnText}>5. useContext: Chế độ sáng / tối</Text>
          </Pressable>

          <Pressable
            style={[styles.menuBtn, styles.menuBtnTeal]}
            onPress={() => setCurrentScreen('profile')}
          >
            <Text style={styles.menuBtnText}>6. useContext: Chia sẻ thông tin</Text>
          </Pressable>

          <Pressable
            style={[styles.menuBtn, styles.menuBtnIndigo]}
            onPress={() => setCurrentScreen('cart')}
          >
            <Text style={styles.menuBtnText}>7. useReducer: Quản lý giỏ hàng</Text>
          </Pressable>

          <Pressable
            style={[styles.menuBtn, styles.menuBtnRose]}
            onPress={() => setCurrentScreen('login')}
          >
            <Text style={styles.menuBtnText}>8. useReducer: Form đăng nhập</Text>
          </Pressable>

          <Pressable
            style={[styles.menuBtn, styles.menuBtnCyan]}
            onPress={() => setCurrentScreen('product')}
          >
            <Text style={styles.menuBtnText}>9. useMemo/useCallback: Lọc sản phẩm</Text>
          </Pressable>

          <Pressable
            style={[styles.menuBtn, styles.menuBtnEmerald]}
            onPress={() => setCurrentScreen('productTotal')}
          >
            <Text style={styles.menuBtnText}>10. useMemo/useCallback: Tính tổng giá</Text>
          </Pressable>

          <Pressable
            style={[styles.menuBtn, styles.menuBtnSpecial]}
            onPress={() => setCurrentScreen('todoApp')}
          >
            <Text style={styles.menuBtnText}>⭐ 11. BÀI TỔNG HỢP: Todo App</Text>
          </Pressable>
        </ScrollView>
      )}

      {currentScreen === 'counter' && <CounterScreen />}
      {currentScreen === 'greeting' && <GreetingScreen />}
      {currentScreen === 'timer' && <TimerScreen />}
      {currentScreen === 'connection' && <ConnectionStatusScreen />}
      {currentScreen === 'theme' && <ThemeScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}
      {currentScreen === 'cart' && <CartScreen />}
      {currentScreen === 'login' && <LoginFormScreen />}
      {currentScreen === 'product' && <ProductScreen />}
      {currentScreen === 'productTotal' && <ProductTotalScreen />}
      {currentScreen === 'todoApp' && <TodoAppScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  backButton: {
    padding: 12,
    backgroundColor: '#E5E7EB',
    margin: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  menuContainer: {
    padding: 24,
    gap: 10,
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  menuBtn: {
    backgroundColor: '#0284C7',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  menuBtnGreen: { backgroundColor: '#059669' },
  menuBtnPurple: { backgroundColor: '#7C3AED' },
  menuBtnOrange: { backgroundColor: '#D97706' },
  menuBtnDark: { backgroundColor: '#1F2937' },
  menuBtnTeal: { backgroundColor: '#0D9488' },
  menuBtnIndigo: { backgroundColor: '#4F46E5' },
  menuBtnRose: { backgroundColor: '#E11D48' },
  menuBtnCyan: { backgroundColor: '#0891B2' },
  menuBtnEmerald: { backgroundColor: '#10B981' },
  menuBtnSpecial: {
    backgroundColor: '#8B5CF6',
    borderWidth: 2,
    borderColor: '#6D28D9',
  },
  menuBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});