import { Stack } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Modal,
    Pressable,
    SafeAreaView,
    SectionList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Student, StudentStatus, studentSections as initialSections } from '../data/students';

const STATUS_FILTERS: Array<'Tất cả' | StudentStatus> = ['Tất cả', 'Đang học', 'Bảo lưu'];

const SECTION_THEMES: Record<string, { badgeBg: string; text: string; border: string }> = {
  'Công nghệ thông tin': { badgeBg: '#E0F2FE', text: '#0369A1', border: '#0284C7' },
  'Kinh tế': { badgeBg: '#FEF3C7', text: '#B45309', border: '#F59E0B' },
  'Ngôn ngữ Anh': { badgeBg: '#F3E8FF', text: '#7E22CE', border: '#A855F7' },
};

function getInitials(fullName: string) {
  const words = fullName.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

function getLastName(fullName: string) {
  const words = fullName.trim().split(/\s+/);
  return words[words.length - 1] || '';
}

interface StudentRowProps {
  student: Student;
  sectionTitle: string;
  onPress: (student: Student) => void;
}

function StudentRow({ student, sectionTitle, onPress }: StudentRowProps) {
  const isActive = student.status === 'Đang học';
  const theme = SECTION_THEMES[sectionTitle] || { border: '#E1E5EC' };

  return (
    <Pressable
      onPress={() => onPress(student)}
      style={({ pressed }) => [
        styles.studentCard,
        { borderLeftColor: theme.border, borderLeftWidth: 4 },
        pressed && styles.studentCardPressed,
      ]}
      accessibilityRole="button"
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(student.fullName)}</Text>
      </View>

      <View style={styles.studentContent}>
        <Text style={styles.studentName}>{student.fullName}</Text>
        <Text style={styles.studentMeta}>
          {student.studentId} · {student.className}
        </Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          isActive ? styles.activeBadge : styles.pausedBadge,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            isActive ? styles.activeText : styles.pausedText,
          ]}
        >
          {student.status}
        </Text>
      </View>
    </Pressable>
  );
}

export default function StudentDirectoryScreen() {
  const [sectionsData, setSectionsData] = useState(initialSections);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tất cả' | StudentStatus>('Tất cả');
  const [groupBy, setGroupBy] = useState<'faculty' | 'alphabet'>('faculty');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setSectionsData(initialSections);
      setQuery('');
      setStatusFilter('Tất cả');
      setCollapsedSections({});
      setRefreshing(false);
    }, 1000);
  }, []);

  const processedSections = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('vi');
    let allStudents: Student[] = [];

    sectionsData.forEach((sec) => {
      allStudents.push(...sec.data);
    });

    let currentSections = [];

    if (groupBy === 'alphabet') {
      const groups: Record<string, Student[]> = {};
      allStudents.forEach((student) => {
        const firstLetter = getLastName(student.fullName).charAt(0).toUpperCase() || '#';
        if (!groups[firstLetter]) groups[firstLetter] = [];
        groups[firstLetter].push(student);
      });

      currentSections = Object.keys(groups)
        .sort()
        .map((letter) => ({
          title: `Nhóm chữ cái: ${letter}`,
          data: groups[letter],
        }));
    } else {
      currentSections = sectionsData;
    }

    return currentSections
      .map((section) => {
        const matchesSectionTitle = section.title
          .toLocaleLowerCase('vi')
          .includes(normalizedQuery);

        let filtered = section.data.filter((student) => {
          const matchesQuery =
            matchesSectionTitle ||
            !normalizedQuery ||
            `${student.fullName} ${student.studentId} ${student.className}`
              .toLocaleLowerCase('vi')
              .includes(normalizedQuery);

          const matchesStatus =
            statusFilter === 'Tất cả' || student.status === statusFilter;

          return matchesQuery && matchesStatus;
        });

        filtered.sort((a, b) => {
          const nameA = getLastName(a.fullName);
          const nameB = getLastName(b.fullName);
          return sortOrder === 'asc'
            ? nameA.localeCompare(nameB, 'vi')
            : nameB.localeCompare(nameA, 'vi');
        });

        const isCollapsed = collapsedSections[section.title];

        return {
          title: section.title,
          totalCount: filtered.length,
          data: isCollapsed ? [] : filtered,
        };
      })
      .filter((section) => section.totalCount > 0);
  }, [sectionsData, query, statusFilter, groupBy, sortOrder, collapsedSections]);

  const totalStudents = useMemo(() => {
    return processedSections.reduce((total, sec) => total + sec.totalCount, 0);
  }, [processedSections]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <SectionList
        sections={processedSections}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        stickySectionHeadersEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, section }) => (
          <StudentRow
            student={item}
            sectionTitle={section.title}
            onPress={setSelectedStudent}
          />
        )}
        renderSectionHeader={({ section }) => {
          const isCollapsed = collapsedSections[section.title];
          const theme = SECTION_THEMES[section.title];

          return (
            <Pressable
              onPress={() => toggleSection(section.title)}
              style={[
                styles.sectionHeader,
                theme && { backgroundColor: theme.badgeBg },
              ]}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  theme && { color: theme.text },
                ]}
              >
                {isCollapsed ? '▶' : '▼'} {section.title}
              </Text>
              <Text style={styles.sectionBadge}>
                {section.totalCount} sinh viên
              </Text>
            </Pressable>
          );
        }}
        renderSectionFooter={({ section }) => (
          <View style={styles.sectionFooter}>
            <Text style={styles.sectionFooterText}>
              ── Hết danh sách {section.title} ──
            </Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.screenTitle} accessibilityRole="header">
              Student Directory
            </Text>
            <Text style={styles.subtitle}>Danh bạ sinh viên nâng cao</Text>

            <View style={styles.searchWrapper}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Tìm tên, mã sinh viên, lớp hoặc khoa..."
                placeholderTextColor="#8A8F98"
                returnKeyType="search"
                autoCorrect={false}
                style={styles.searchInput}
              />
              {query.length > 0 && (
                <Pressable
                  onPress={() => setQuery('')}
                  style={styles.clearBtn}
                  hitSlop={8}
                >
                  <Text style={styles.clearBtnText}>✕</Text>
                </Pressable>
              )}
            </View>

            <View style={styles.filterRow}>
              {STATUS_FILTERS.map((st) => {
                const isSelected = statusFilter === st;
                return (
                  <Pressable
                    key={st}
                    onPress={() => setStatusFilter(st)}
                    style={[
                      styles.chip,
                      isSelected && styles.chipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextSelected,
                      ]}
                    >
                      {st}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.controlsRow}>
              <Pressable
                onPress={() =>
                  setGroupBy((prev) => (prev === 'faculty' ? 'alphabet' : 'faculty'))
                }
                style={styles.btnAction}
              >
                <Text style={styles.btnActionText}>
                  🗂️ Nhóm: {groupBy === 'faculty' ? 'Theo Khoa' : 'Theo Tên (A-Z)'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                }
                style={styles.btnAction}
              >
                <Text style={styles.btnActionText}>
                  {sortOrder === 'asc' ? '🔽 Tên A➔Z' : '🔼 Tên Z➔A'}
                </Text>
              </Pressable>

              <Pressable onPress={onRefresh} style={styles.btnAction}>
                <Text style={styles.btnActionText}>🔄 Làm mới</Text>
              </Pressable>
            </View>

            {refreshing && (
              <View style={styles.refreshIndicator}>
                <ActivityIndicator size="small" color="#0284C7" />
                <Text style={styles.refreshText}>Đang làm mới dữ liệu...</Text>
              </View>
            )}

            <Text style={styles.resultText}>
              Tổng số tìm thấy: {totalStudents} sinh viên
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Không tìm thấy sinh viên</Text>
            <Text style={styles.emptyText}>
              Không có sinh viên phù hợp với từ khóa và bộ lọc hiện tại.
            </Text>
          </View>
        }
      />

      <Modal
        visible={selectedStudent !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedStudent(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalHeader}>Thông tin sinh viên</Text>
            <Text style={styles.modalName}>{selectedStudent?.fullName}</Text>
            <View style={styles.modalDivider} />

            <Text style={styles.modalText}>
              🆔 <Text style={styles.bold}>MSSV:</Text> {selectedStudent?.studentId}
            </Text>
            <Text style={styles.modalText}>
              🏫 <Text style={styles.bold}>Lớp:</Text> {selectedStudent?.className}
            </Text>
            <Text style={styles.modalText}>
              📌 <Text style={styles.bold}>Trạng thái:</Text> {selectedStudent?.status}
            </Text>

            <Pressable
              style={styles.modalBtn}
              onPress={() => setSelectedStudent(null)}
            >
              <Text style={styles.modalBtnText}>ĐÓNG</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  header: {
    marginBottom: 12,
  },
  screenTitle: {
    color: '#182035',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#697080',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 14,
  },
  searchWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    minHeight: 48,
    color: '#182035',
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE1E8',
    borderRadius: 12,
    paddingLeft: 14,
    paddingRight: 40,
  },
  clearBtn: {
    position: 'absolute',
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearBtnText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  chipSelected: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  chipText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  controlsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  btnAction: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
  },
  btnActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  refreshIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  refreshText: {
    fontSize: 12,
    color: '#0284C7',
  },
  resultText: {
    color: '#4E5665',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  sectionBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  sectionFooter: {
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionFooterText: {
    fontSize: 11,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E1E5EC',
  },
  studentCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.99 }],
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#0284C7',
    fontWeight: 'bold',
    fontSize: 13,
  },
  studentContent: {
    flex: 1,
    marginLeft: 10,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#182035',
  },
  studentMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activeBadge: {
    backgroundColor: '#DCFCE7',
  },
  pausedBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  activeText: {
    color: '#15803D',
  },
  pausedText: {
    color: '#B91C1C',
  },
  separator: {
    height: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: '#182035',
    fontSize: 17,
    fontWeight: '700',
  },
  emptyText: {
    color: '#747B88',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
  modalBtn: {
    marginTop: 14,
    backgroundColor: '#0284C7',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});