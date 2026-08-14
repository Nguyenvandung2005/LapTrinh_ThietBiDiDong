import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Pressable,
    ListRenderItem,
} from 'react-native';

// 1. Định nghĩa kiểu dữ liệu chặt chẽ bằng TypeScript
export interface Announcement {
    id: string;
    title: string;
    summary: string;
    category: 'Học thuật' | 'Sự kiện' | 'Dịch vụ';
    publishedAt: string;
}

export function AnnouncementFeedScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    // Dữ liệu mẫu (Mock data)
    const [announcements] = useState<Announcement[]>([
        {
            id: 'ann-01',
            title: 'Đăng ký học phần Học kỳ 2',
            summary: 'Cổng đăng ký sẽ mở vào lúc 8h00 ngày 20/12. Yêu cầu sinh viên hoàn thành học phí.',
            category: 'Học thuật',
            publishedAt: '2023-12-15',
        },
        {
            id: 'ann-02',
            title: 'Hội thảo Lập trình React Native',
            summary: 'Cơ hội tìm hiểu về cách xây dựng ứng dụng di động đa nền tảng cùng chuyên gia.',
            category: 'Sự kiện',
            publishedAt: '2023-12-16',
        },
        {
            id: 'ann-03',
            title: 'Bảo trì hệ thống WiFi Ký túc xá',
            summary: 'Dịch vụ mạng WiFi tại KTX sẽ tạm ngưng từ 22h00 đến 02h00 sáng mai.',
            category: 'Dịch vụ',
            publishedAt: '2023-12-17',
        },
    ]);

    // Lọc dữ liệu theo từ khóa tìm kiếm
    const filteredData = announcements.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Typed renderItem: Hàm render từng hàng thông báo
    const renderAnnouncementItem: ListRenderItem<Announcement> = ({ item }) => (
        <Pressable
            style={({ pressed }) => [styles.rowCard, pressed && styles.rowPressed]}
            accessibilityRole="button"
            onPress={() => { }}
        >
            <View style={styles.badgeRow}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.category}</Text>
                </View>
                <Text style={styles.dateText}>{item.publishedAt}</Text>
            </View>
            <Text style={styles.rowTitle} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
            </Text>
            <Text style={styles.rowSummary} numberOfLines={2} ellipsizeMode="tail">
                {item.summary}
            </Text>
        </Pressable>
    );

    // 3. ItemSeparatorComponent: Đường kẻ phân cách giữa các dòng
    const renderSeparator = () => <View style={styles.separator} />;

    // 4. ListHeaderComponent: Tiêu đề và Ô tìm kiếm
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle} accessibilityRole="header">
                Danh sách thông báo
            </Text>
            <Text style={styles.searchLabel}>Tìm kiếm thông báo:</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                clearButtonMode="while-editing"
            />
        </View>
    );

    // 5. ListFooterComponent: Chân trang thông báo kết thúc danh sách
    const renderFooter = () => {
        if (filteredData.length === 0) return null;
        return (
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>— Bạn đã xem hết tất cả thông báo —</Text>
            </View>
        );
    };

    // 6. ListEmptyComponent: Xử lý khi không có dữ liệu
    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Không tìm thấy thông báo</Text>
            <Text style={styles.emptySubText}>
                Không có kết quả nào phù hợp với từ khóa "{searchQuery}".
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderAnnouncementItem}
                ItemSeparatorComponent={renderSeparator}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={styles.listContent}
                keyboardShouldPersistTaps="handled"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    listContent: {
        flexGrow: 1,
        paddingBottom: 24,
    },
    headerContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    searchLabel: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 6,
    },
    searchInput: {
        height: 44,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#F8F9FA',
        fontSize: 15,
    },
    rowCard: {
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    rowPressed: {
        backgroundColor: '#F5F5F5',
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    badge: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    dateText: {
        fontSize: 12,
        color: '#888888',
    },
    rowTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 4,
    },
    rowSummary: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#EEEEEE',
    },
    footerContainer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 13,
        color: '#999999',
        fontStyle: 'italic',
    },
    emptyContainer: {
        flex: 1,
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 6,
    },
    emptySubText: {
        fontSize: 14,
        color: '#777777',
        textAlign: 'center',
    },
});