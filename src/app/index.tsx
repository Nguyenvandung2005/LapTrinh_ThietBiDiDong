import { Link, Stack } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeMenu() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Danh sách bài thực hành' }} />
      <View style={styles.content}>
        <Text style={styles.title}>CHỌN BÀI THỰC HÀNH</Text>

        <Link href="/course" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>1. Course Catalog (FlatList)</Text>
          </Pressable>
        </Link>

        <Link href="/student" asChild>
          <Pressable style={styles.buttonGreen}>
            <Text style={styles.buttonText}>2. Student Directory (SectionList)</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0284C7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonGreen: {
    backgroundColor: '#0D9488',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});