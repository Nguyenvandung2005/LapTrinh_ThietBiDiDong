import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import InfoRow from '@/src/components/InfoRow';
import { StudentCard } from '@/src/components/StudentCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Smart Campus</Text>
          <Text style={styles.headerSubtitle}>Minh chứng Task 2 & Task 3</Text>
        </View>

        {/* --- DEMO TASK 2: Component InfoRow độc lập --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>TASK 2: COMPONENT INFOROW</Text>
          <View style={styles.divider} />
          <InfoRow label="Mã SV" value="23657251" emphasized />
          <InfoRow label="Họ và tên" value="Nguyễn Văn Dụng" />
          <InfoRow label="Ngành học" value="Kỹ thuật Phần mềm" />
        </View>

        {/* --- DEMO TASK 3: Thẻ Sinh Viên & Layout Stress Test --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleHeader}>TASK 3: STUDENT CARD (STRESS TEST)</Text>
        </View>
        <StudentCard
          student={{
            id: '23657251',
            name: 'Nguyễn Văn Dụng',
            major: 'Kỹ thuật Phần mềm & Trí tuệ Nhân tạo Ứng dụng Chuyên sâu', // Stress test: 55+ ký tự
            academicYear: '2023 - 2028',
            class: 'DHKTPM19A',
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
  },
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  sectionTitleHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
});


