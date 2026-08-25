import { Stack } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Course, courses as initialCourses } from '../data/courses';

const CATEGORIES = ['Tất cả', 'Lập trình di động', 'Thiết kế', 'Lập trình web', 'Khoa học máy tính'];

interface CourseCardProps {
  course: Course;
  onPress: (course: Course) => void;
}

function CourseCard({ course, onPress }: CourseCardProps) {
  return (
    <Pressable
      onPress={() => onPress(course)}
      style={({ pressed }) => [
        styles.gridCard,
        pressed && styles.gridCardPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Khóa học ${course.title}`}
    >
      <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
      <Text style={styles.instructor} numberOfLines={1}>GV: {course.instructor}</Text>

      <View style={styles.courseFooter}>
        <Text style={styles.category} numberOfLines={1}>{course.category}</Text>
        <Text style={styles.studentCount}>👥 {course.students} SV</Text>
      </View>
    </Pressable>
  );
}

export default function App() {
  const [dataList, setDataList] = useState<Course[]>(initialCourses);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setDataList(initialCourses);
      setQuery('');
      setSelectedCategory('Tất cả');
      setSortOrder('none');
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || dataList.length >= 15) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextBatch: Course[] = [
        {
          id: `course-${Date.now()}-1`,
          title: 'Cấu trúc dữ liệu & Giải thuật',
          instructor: 'Trần Văn Bình',
          category: 'Khoa học máy tính',
          students: 65,
        },
        {
          id: `course-${Date.now()}-2`,
          title: 'NodeJS & Backend API',
          instructor: 'Lê Thu Hà',
          category: 'Lập trình web',
          students: 50,
        },
      ];
      setDataList((prev) => [...prev, ...nextBatch]);
      setLoadingMore(false);
    }, 1200);
  };

  const processedCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('vi');
    
    let result = dataList.filter((course) => {
      const matchesQuery = !normalizedQuery || 
        `${course.title} ${course.instructor} ${course.category}`
          .toLocaleLowerCase('vi')
          .includes(normalizedQuery);

      const matchesCategory = selectedCategory === 'Tất cả' || course.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });

    if (sortOrder === 'asc') {
      result = [...result].sort((a, b) => a.students - b.students);
    } else if (sortOrder === 'desc') {
      result = [...result].sort((a, b) => b.students - a.students);
    }

    return result;
  }, [dataList, query, selectedCategory, sortOrder]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <FlatList
        data={processedCourses}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <CourseCard course={item} onPress={(course) => setSelectedCourse(course)} />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.screenTitle} accessibilityRole="header">
              Course Catalog
            </Text>
            <Text style={styles.subtitle}>Khám phá các khóa học đang mở</Text>

            <View style={styles.searchWrapper}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Tìm theo tên, GV, danh mục..."
                placeholderTextColor="#8A8F98"
                returnKeyType="search"
                style={styles.searchInput}
              />
              {query.length > 0 && (
                <Pressable
                  onPress={() => setQuery('')}
                  style={styles.clearBtn}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Xóa nội dung tìm kiếm"
                >
                  <Text style={styles.clearBtnText}>✕</Text>
                </Pressable>
              )}
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={CATEGORIES}
              keyExtractor={(cat) => cat}
              contentContainerStyle={styles.categoryList}
              renderItem={({ item: cat }) => {
                const isSelected = selectedCategory === cat;
                return (
                  <Pressable
                    onPress={() => setSelectedCategory(cat)}
                    style={[
                      styles.categoryChip,
                      isSelected && styles.categoryChipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        isSelected && styles.categoryChipTextSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                );
              }}
            />

            <View style={styles.controlsRow}>
              <Text style={styles.resultText}>
                Tìm thấy {processedCourses.length} khóa học
              </Text>

              <Pressable
                onPress={() => {
                  setSortOrder((prev) => (prev === 'none' ? 'desc' : prev === 'desc' ? 'asc' : 'none'));
                }}
                style={styles.sortBtn}
              >
                <Text style={styles.sortBtnText}>
                  {sortOrder === 'none'
                    ? '⚡ Sắp xếp SV: Mặc định'
                    : sortOrder === 'desc'
                    ? '🔽 SV: Cao ➔ Thấp'
                    : '🔼 SV: Thấp ➔ Cao'}
                </Text>
              </Pressable>
            </View>
          </View>
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#0284C7" />
              <Text style={styles.footerLoaderText}>Đang tải thêm khóa học...</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Không tìm thấy khóa học</Text>
            <Text style={styles.emptyText}>Hãy thử thay đổi từ khóa hoặc bộ lọc danh mục.</Text>
          </View>
        }
      />

      <Modal
        visible={selectedCourse !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedCourse(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalHeader}>Thông tin chi tiết</Text>
            <Text style={styles.modalCourseTitle}>{selectedCourse?.title}</Text>
            <View style={styles.modalDivider} />

            <Text style={styles.modalInfoText}>👤 <Text style={styles.modalBold}>Giảng viên:</Text> {selectedCourse?.instructor}</Text>
            <Text style={styles.modalInfoText}>🏷️ <Text style={styles.modalBold}>Danh mục:</Text> {selectedCourse?.category}</Text>
            <Text style={styles.modalInfoText}>👥 <Text style={styles.modalBold}>Số sinh viên:</Text> {selectedCourse?.students} học viên</Text>

            <Pressable
              style={styles.modalCloseBtn}
              onPress={() => setSelectedCourse(null)}
            >
              <Text style={styles.modalCloseBtnText}>ĐÓNG</Text>
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
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  header: {
    marginBottom: 16,
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
    marginBottom: 16,
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
  categoryList: {
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  categoryChipSelected: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  categoryChipText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  resultText: {
    color: '#4E5665',
    fontSize: 13,
    fontWeight: '600',
  },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
  },
  sortBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  gridCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E1E5EC',
    justifyContent: 'space-between',
    minHeight: 140,
  },
  gridCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  courseTitle: {
    color: '#182035',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  instructor: {
    color: '#686F7D',
    fontSize: 12,
    marginBottom: 8,
  },
  courseFooter: {
    gap: 4,
  },
  category: {
    color: '#0369A1',
    fontSize: 11,
    fontWeight: '600',
    backgroundColor: '#E0F2FE',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  studentCount: {
    color: '#596171',
    fontSize: 12,
    marginTop: 2,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLoaderText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
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
  modalCourseTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  modalInfoText: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 6,
  },
  modalBold: {
    fontWeight: 'bold',
  },
  modalCloseBtn: {
    marginTop: 14,
    backgroundColor: '#0284C7',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});