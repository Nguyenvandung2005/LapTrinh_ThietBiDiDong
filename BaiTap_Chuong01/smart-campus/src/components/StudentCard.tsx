import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InfoRow from './InfoRow';

export interface StudentInfo {
  id: string;
  name: string;
  major: string;
  academicYear: string;
  class: string;
}

interface StudentCardProps {
  student?: StudentInfo;
}

const defaultStudent: StudentInfo = {
  id: '23657251',
  name: 'Nguyễn Văn Dụng',
  major: 'Kỹ thuật Phần mềm ',
  academicYear: '2023 - 2028',
  class: 'DHKTPM19A',
};

export const StudentCard: React.FC<StudentCardProps> = ({ student = defaultStudent }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>THẺ SINH VIÊN</Text>
      <View style={styles.divider} />
      <InfoRow label="Họ và tên" value={student.name} emphasized />
      <InfoRow label="Mã SV" value={student.id} emphasized />
      <InfoRow label="Ngành học" value={student.major} />
      <InfoRow label="Lớp" value={student.class} />
      <InfoRow label="Niên khóa" value={student.academicYear} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
});

export default StudentCard;
