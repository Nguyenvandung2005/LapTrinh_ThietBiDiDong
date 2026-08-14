import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
  Alert,
} from 'react-native';

// ==========================================
// 1. CẤU TRÚC VÀ ĐỊNH KIỂU (TypeScript)
// ==========================================

export interface Announcement {
  id: string; // Dùng làm stable key
  title: string;
  summary: string;
  category: 'academic' | 'event' | 'service';
  publishedAt: string;
}

export type FeedState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; announcements: Announcement[] };

// Mảng dữ liệu mẫu (mock data) gồm 8 bản ghi
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: 'Đăng ký học phần Học kỳ 2', summary: 'Cổng đăng ký sẽ mở vào lúc 8h00 ngày 20/12. Yêu cầu sinh viên hoàn thành học phí học kỳ 1 trước khi đăng ký.', category: 'academic', publishedAt: '2023-12-15' },
  { id: 'a2', title: 'Hội thảo Lập trình React Native', summary: 'Cơ hội tuyệt vời để tìm hiểu về cách xây dựng ứng dụng di động đa nền tảng cùng các chuyên gia trong ngành.', category: 'event', publishedAt: '2023-12-16' },
  { id: 'a3', title: 'Bảo trì hệ thống WiFi Ký túc xá', summary: 'Dịch vụ mạng WiFi tại KTX sẽ tạm ngưng hoạt động từ 22h00 đến 02h00 sáng mai để nâng cấp đường truyền.', category: 'service', publishedAt: '2023-12-17' },
  { id: 'a4', title: 'Thông báo lịch thi cuối kỳ', summary: 'Lịch thi chính thức cho các môn lý thuyết và thực hành đã được cập nhật trên cổng thông tin sinh viên.', category: 'academic', publishedAt: '2023-12-18' },
  { id: 'a5', title: 'Ngày hội Việc làm Job Fair', summary: 'Hơn 50 doanh nghiệp IT sẽ tham gia phỏng vấn và tuyển dụng trực tiếp tại khuôn viên trường. Hãy chuẩn bị CV!', category: 'event', publishedAt: '2023-12-19' },
  { id: 'a6', title: 'Cấp lại Thẻ Sinh viên bị mất', summary: 'Phòng Công tác sinh viên thông báo quy trình cấp lại thẻ sinh viên áp dụng từ tháng 1/2024.', category: 'service', publishedAt: '2023-12-20' },
  { id: 'a7', title: 'Lịch nghỉ Tết Nguyên Đán', summary: 'Sinh viên toàn trường sẽ được nghỉ Tết từ ngày 25 tháng Chạp đến hết ngày mùng 10 tháng Giêng.', category: 'academic', publishedAt: '2023-12-21' },
  { id: 'a8', title: 'Cuộc thi Hackathon Mùa Xuân', summary: 'Đăng ký tham gia cuộc thi lập trình lớn nhất năm với tổng giải thưởng lên đến 100 triệu đồng. Hạn chót: 30/12.', category: 'event', publishedAt: '2023-12-22' },
];

const getCategoryColor = (category: Announcement['category']) => {
  switch (category) {
    case 'academic': return '#3b82f6'; // Xanh dương
    case 'event': return '#10b981'; // Xanh lá
    case 'service': return '#f59e0b'; // Vàng cam
    default: return '#6b7280';
  }
};

const getCategoryLabel = (category: Announcement['category']) => {
  switch (category) {
    case 'academic': return 'Học thuật';
    case 'event': return 'Sự kiện';
    case 'service': return 'Dịch vụ';
    default: return 'Khác';
  }
};

// ==========================================
// 2. CÁC COMPONENT CẦN XÂY DỰNG
// ==========================================

// --- AnnouncementRow ---
const AnnouncementRow = ({ item, onPress }: { item: Announcement; onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8} // Nới rộng vùng bấm
      accessibilityRole="button"
      accessibilityLabel={`Thông báo: ${item.title}`}
      accessibilityHint="Nhấn để xem chi tiết thông báo này"
      style={({ pressed }) => [
        styles.rowContainer,
        pressed && styles.rowPressed, // Đổi màu khi pressed
      ]}
    >
      <View style={styles.rowHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{getCategoryLabel(item.category)}</Text>
        </View>
        <Text style={styles.dateText}>{item.publishedAt}</Text>
      </View>
      {/* numberOfLines={2} và ellipsizeMode="tail" để chống tràn chữ */}
      <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.summaryText} numberOfLines={2} ellipsizeMode="tail">
        {item.summary}
      </Text>
    </Pressable>
  );
};

// --- SearchField ---
const SearchField = ({
  searchQuery,
  onChangeText,
  onClear,
}: {
  searchQuery: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}) => {
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.searchLabel}>Tìm kiếm thông báo:</Text>
      <View style={styles.searchInputWrapper}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={onChangeText}
          placeholder="Nhập từ khóa tìm kiếm..."
          returnKeyType="search" // Hiển thị nút "Search" trên bàn phím
          autoCorrect={false}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={onClear} style={styles.clearButton} accessibilityRole="button" accessibilityLabel="Xóa tìm kiếm">
            <Text style={styles.clearButtonText}>✕</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

// --- LoadingState ---
const LoadingState = () => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color="#3b82f6" />
    <Text style={styles.statusText}>Đang tải danh sách thông báo...</Text>
  </View>
);

// --- ErrorState ---
const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorText}>Đã xảy ra lỗi!</Text>
    <Text style={styles.statusText}>{message}</Text>
    <Pressable style={styles.retryButton} onPress={onRetry} accessibilityRole="button">
      <Text style={styles.retryButtonText}>Thử lại (Retry)</Text>
    </Pressable>
  </View>
);

// --- EmptyState ---
const EmptyState = ({
  hasSearchQuery,
  onClearSearch,
}: {
  hasSearchQuery: boolean;
  onClearSearch: () => void;
}) => {
  if (hasSearchQuery) {
    // Trường hợp: Không tìm thấy kết quả phù hợp với từ khóa
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Không tìm thấy kết quả</Text>
        <Text style={styles.statusText}>Vui lòng thử tìm bằng một từ khóa khác.</Text>
        <Pressable style={styles.retryButton} onPress={onClearSearch} accessibilityRole="button">
          <Text style={styles.retryButtonText}>Xóa bộ lọc tìm kiếm</Text>
        </Pressable>
      </View>
    );
  }

  // Trường hợp: Không có dữ liệu thông báo nào trong hệ thống
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Chưa có thông báo nào</Text>
      <Text style={styles.statusText}>Hệ thống hiện chưa có thông báo mới.</Text>
    </View>
  );
};

// ==========================================
// 3. AnnouncementsScreen (Main Component)
// ==========================================

export default function AnnouncementsScreen() {
  const [feedState, setFeedState] = useState<FeedState>({ status: 'loading' });
  const [searchQuery, setSearchQuery] = useState('');

  // Hàm mô phỏng tải dữ liệu (có delay 1.5s)
  const fetchData = useCallback(() => {
    setFeedState({ status: 'loading' });
    
    // Giả lập độ trễ tải mạng
    setTimeout(() => {
      // Giả lập đôi khi xảy ra lỗi (optional, ở đây giả lập thành công)
      const isSuccess = true; 
      
      if (isSuccess) {
        setFeedState({ status: 'ready', announcements: MOCK_ANNOUNCEMENTS });
      } else {
        setFeedState({ status: 'error', message: 'Không thể kết nối đến máy chủ.' });
      }
    }, 1500);
  }, []);

  // Gọi fetchData khi mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm (chỉ khi state ready)
  const filteredData = useMemo(() => {
    if (feedState.status !== 'ready') return [];
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return feedState.announcements;

    return feedState.announcements.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query)
    );
  }, [feedState, searchQuery]);

  // Hàm handle khi người dùng bấm vào một row
  const handlePressRow = (item: Announcement) => {
    Alert.alert('Chi tiết thông báo', item.title);
  };

  // Render một mục trong danh sách
  const renderItem: ListRenderItem<Announcement> = ({ item }) => (
    <AnnouncementRow item={item} onPress={() => handlePressRow(item)} />
  );

  // Component phân cách giữa các dòng
  const renderSeparator = () => <View style={styles.separator} />;

  // Component Header của FlatList
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.screenTitle}>Danh sách thông báo</Text>
      <SearchField
        searchQuery={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />
    </View>
  );

  return (
    // Bọc toàn bộ màn hình trong SafeAreaView
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* State: Loading */}
        {feedState.status === 'loading' && (
          <View style={styles.fullScreenOverlay}>
            <LoadingState />
          </View>
        )}

        {/* State: Error */}
        {feedState.status === 'error' && (
          <View style={styles.fullScreenOverlay}>
            <ErrorState message={feedState.message} onRetry={fetchData} />
          </View>
        )}

        {/* State: Ready (hiển thị FlatList) */}
        {feedState.status === 'ready' && (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id} // Không dùng index làm key
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={
              <EmptyState 
                hasSearchQuery={searchQuery.trim().length > 0} 
                onClearSearch={() => setSearchQuery('')} 
              />
            }
            ItemSeparatorComponent={renderSeparator}
            keyboardShouldPersistTaps="handled" // Đóng keyboard khi tap bên ngoài hoặc scroll
            contentContainerStyle={styles.listContentContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb', // Nền nhạt
  },
  container: {
    flex: 1,
  },
  fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  centerContainer: {
    alignItems: 'center',
    padding: 24,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 8,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  listContentContainer: {
    flexGrow: 1, // Đảm bảo ListEmptyComponent có thể canh giữa nếu ít data
    paddingBottom: 24,
  },
  
  // AnnouncementRow
  rowContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
  rowPressed: {
    backgroundColor: '#f3f4f6', // Đổi màu khi pressed
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    color: '#6b7280',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },

  // SearchField
  searchContainer: {
    marginBottom: 8,
  },
  searchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: '#1f2937',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Status/Empty States
  statusText: {
    marginTop: 12,
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
});
