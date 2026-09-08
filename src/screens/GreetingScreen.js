import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function GreetingScreen() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');

  const handleReset = () => {
    setFullName('');
    setAge('');
  };

  const numericAge = parseInt(age, 10);
  const isUnder18 = !isNaN(numericAge) && numericAge < 18;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Form Thông Tin Cá Nhân</Text>

      <Text style={styles.label}>Họ và tên:</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nhập họ tên..."
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />

      <Text style={styles.label}>Tuổi:</Text>
      <TextInput
        value={age}
        onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ''))}
        placeholder="Nhập số tuổi..."
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
        style={styles.input}
      />

      {isUnder18 && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ Cảnh báo: Bạn chưa đủ 18 tuổi!
          </Text>
        </View>
      )}

      <View style={styles.resultBox}>
        <Text style={styles.greeting}>
          {fullName.trim()
            ? `Xin chào, ${fullName.trim()}! ${age ? `(${age} tuổi)` : ''}`
            : 'Vui lòng nhập họ tên'}
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Xóa toàn bộ dữ liệu"
          color="#DC2626"
          onPress={handleReset}
          disabled={!fullName && !age}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
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
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: '#111827',
  },
  warningBox: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  warningText: {
    fontSize: 13,
    color: '#B91C1C',
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D4ED8',
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: 20,
  },
});