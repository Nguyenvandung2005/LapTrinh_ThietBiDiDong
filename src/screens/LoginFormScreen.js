import React, { useReducer } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const initialState = {
  email: '',
  password: '',
  error: '',
  isSubmitting: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload, error: '' };

    case 'SET_PASSWORD':
      return { ...state, password: action.payload, error: '' };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isSubmitting: false };

    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, error: '' };

    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default function LoginFormScreen() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleLogin = () => {
    const trimmedEmail = state.email.trim();
    const trimmedPassword = state.password.trim();

    // 1. Kiểm tra bỏ trống
    if (!trimmedEmail || !trimmedPassword) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Vui lòng nhập đầy đủ thông tin.',
      });
      return;
    }

    // 2. Kiểm tra email có chứa ký tự @
    if (!trimmedEmail.includes('@')) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Email không hợp lệ (phải chứa ký tự @).',
      });
      return;
    }

    // 3. Kiểm tra mật khẩu có ít nhất 6 ký tự
    if (trimmedPassword.length < 6) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Mật khẩu phải có ít nhất 6 ký tự.',
      });
      return;
    }

    // 4. Kích hoạt trạng thái isSubmitting để giả lập gửi request
    dispatch({ type: 'SUBMIT_START' });

    setTimeout(() => {
      dispatch({ type: 'SUBMIT_SUCCESS' });
      Alert.alert('Đăng nhập thành công', `Xin chào: ${trimmedEmail}`);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập Hệ Thống</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          value={state.email}
          onChangeText={(text) =>
            dispatch({ type: 'SET_EMAIL', payload: text })
          }
          placeholder="Ví dụ: example@gmail.com"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!state.isSubmitting}
          style={styles.input}
        />

        <Text style={styles.label}>Mật khẩu:</Text>
        <TextInput
          value={state.password}
          onChangeText={(text) =>
            dispatch({ type: 'SET_PASSWORD', payload: text })
          }
          placeholder="Tối thiểu 6 ký tự..."
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          editable={!state.isSubmitting}
          style={styles.input}
        />

        {state.error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {state.error}</Text>
          </View>
        ) : null}

        {state.isSubmitting && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color="#2563EB" />
            <Text style={styles.loadingText}>Đang xử lý đăng nhập...</Text>
          </View>
        )}

        <View style={styles.buttonGroup}>
          <Button
            title={state.isSubmitting ? 'Đang gửi...' : 'Đăng nhập'}
            color="#2563EB"
            onPress={handleLogin}
            disabled={state.isSubmitting}
          />

          <Button
            title="Đặt lại"
            color="#6B7280"
            onPress={() => dispatch({ type: 'RESET' })}
            disabled={state.isSubmitting}
          />
        </View>
      </View>
    </View>
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
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#F9FAFB',
  },
  errorBox: {
    marginTop: 14,
    padding: 10,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  loadingText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonGroup: {
    marginTop: 20,
    gap: 10,
  },
});