import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    SectionList,
    StyleSheet,
    Pressable,
    SectionListData,
} from 'react-native';

// 1. Định nghĩa kiểu dữ liệu từng bản ghi thông báo
export interface Announcement {
    id: string;
    title: string;
    summary: string;
    category: 'Học thuật' | 'Sự kiện' | 'Dịch vụ';
    time: string;
}

// 2. Định nghĩa cấu trúc dữ liệu gom nhóm theo Section
export interface AnnouncementSection {
    title: string;
    data: Announcement[];
}

export function AnnouncementSectionListScreen() {
    // Dữ liệu mẫu đã gom nhóm theo Today, This Week, Earlier
    const SECTIONS_DATA: AnnouncementSection[] = [
        {
            title: 'Hôm nay (Today)',
            data: [
                {
                    id: 's-01',
                    title: 'Đăng ký học phần Học kỳ 2',
                    summary: 'Cổng đăng ký sẽ mở vào lúc 8h00 sáng nay. Yêu cầu sinh viên sẵn sàng.',
                    category: 'Học thuật',
                    time: '08:00',
                },
                {
                    id: 's-02',
                    title: 'Hội thảo Lập trình React Native',
                    summary: 'Diễn ra tại Hội trường E4 vào lúc 14h00 chiều nay.',
                    category: 'Sự kiện',
                    time: '14:00',
                },
            ],
        },
        {
            title: 'Tuần này (This Week)',
            data: [
                {
                    id: 's-03',
                    title: 'Bảo trì hệ thống WiFi Ký túc xá',
                    summary: 'Dịch vụ mạng WiFi tại KTX sẽ bảo trì vào thứ Năm tuần này.',
                    category: 'Dịch vụ',
                    time: '18/12/2023',
                },
                {
                    id: 's-04',
                    title: 'Thông báo lịch thi cuối kỳ',
                    summary: 'Lịch thi chính thức các môn chuyên ngành đã được cập nhật.',
                    category: 'Học thuật',
                    time: '19/12/2023',
                },
            ],
        },
        {
            title: 'Trước đó (Earlier)',
            data: [
                {
                    id: 's-05',
                    title: 'Ngày hội Việc làm Job Fair',
                    summary: 'Hơn 50 doanh nghiệp IT sẽ tham gia phỏng vấn trực tiếp tại trường.',
                    category: 'Sự kiện',
                    time: '10/12/2023',
                },
            ],
        },
    ];

    // Render từng hàng thông báo
    const renderItem = ({ item }: { item: Announcement }) => (
        <Pressable
            style={({ pressed }) => [styles.rowCard, pressed && styles.rowPressed]}
            accessibilityRole="button"
        >
            <View style={styles.badgeRow}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.category}</Text>
                </View>
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Text style={styles.rowTitle} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
            </Text>
            <Text style={styles.rowSummary} numberOfLines={2} ellipsizeMode="tail">
                {item.summary}
            </Text>
        </Pressable>
    );

    // Render Header của từng Section (Today, This Week, Earlier)
    const renderSectionHeader = ({ section }: { section: SectionListData<Announcement, AnnouncementSection> }) => (
        <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText} accessibilityRole="header">
                {section.title}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={SECTIONS_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                // Tắt sticky headers khi cần tối ưu không gian màn hình nhỏ / chữ lớn
                stickySectionHeadersEnabled={false}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    listContent: {
        paddingBottom: 24,
    },
    sectionHeaderContainer: {
        backgroundColor: '#EAECEF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#D0D5DD',
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#344054',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    rowCard: {
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    rowPressed: {
        backgroundColor: '#F2F4F7',
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
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    timeText: {
        fontSize: 12,
        color: '#667085',
    },
    rowTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#101828',
        marginBottom: 4,
    },
    rowSummary: {
        fontSize: 13,
        color: '#475467',
        lineHeight: 18,
    },
    separator: {
        height: 1,
        backgroundColor: '#EAECF0',
    },
});