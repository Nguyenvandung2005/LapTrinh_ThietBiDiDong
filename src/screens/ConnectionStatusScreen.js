import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function ConnectionStatusScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('Chưa kết nối');
  const [lastConnectedTime, setLastConnectedTime] = useState(null);

  useEffect(() => {
    if (isConnected) {
      setMessage('Thiết bị đã kết nối');
      const now = new Date();
      setLastConnectedTime(now.toLocaleTimeString('vi-VN'));
    } else {
      setMessage('Thiết bị đã ngắt kết nối');
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theo dõi trạng thái kết nối</Text>

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>
            Công tắc kết nối: {isConnected ? 'BẬT' : 'TẮT'}
          </Text>
          <Switch
            value={isConnected}
            onValueChange={setIsConnected}
            thumbColor={isConnected ? '#16A34A' : '#DC2626'}
            trackColor={{ false: '#FECACA', true: '#BBF7D0' }}
          />
        </View>

        <View
          style={[
            styles.messageBox,
            isConnected ? styles.connectedBox : styles.disconnectedBox,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isConnected ? styles.connectedText : styles.disconnectedText,
            ]}
          >
            {message}
          </Text>

          {lastConnectedTime && (
            <Text style={styles.timeText}>
              Kết nối gần nhất lúc: {lastConnectedTime}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  messageBox: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  connectedBox: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  disconnectedBox: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '700',
  },
  connectedText: {
    color: '#16A34A',
  },
  disconnectedText: {
    color: '#DC2626',
  },
  timeText: {
    marginTop: 8,
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
});