import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export function ResponsiveGridScreen() {
    // Giả lập mảng 5 khóa học (tạo ra trường hợp lẻ 1 thẻ ở hàng cuối)
    const courses = Array.from({ length: 5 }).map((_, index) => ({
        id: `course-${index}`,
        title: `Lập trình React Native - Khóa ${index + 1}`,
        instructor: 'Khoa CNTT',
    }));

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Danh sách Khóa học (Flexbox Grid)</Text>

                {/* Container bọc ngoài: Bật flexWrap để rớt dòng */}
                <View style={styles.gridContainer}>
                    {courses.map((course) => (
                        // Thẻ CourseCard bên trong
                        <View key={course.id} style={styles.card}>
                            <View style={styles.imagePlaceholder} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle} numberOfLines={2}>{course.title}</Text>
                                <Text style={styles.cardInstructor}>{course.instructor}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    scrollContainer: {
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#111827',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // CHÌA KHÓA: Cho phép rớt dòng
        gap: 12,          // Tạo khoảng cách đều giữa các thẻ (cả dọc và ngang)
    },
    card: {
        // === CÁC THUỘC TÍNH FLEXBOX TẠO FLUID GRID ===
        flexGrow: 1,      // Giãn nở lấp đầy chỗ trống trên dòng
        flexShrink: 1,    // Cho phép thu nhỏ nếu màn hình quá chật
        flexBasis: 160,   // Chiều rộng khởi điểm lý tưởng
        minWidth: 150,    // Kích thước tối thiểu không bao giờ bị phá vỡ
        maxWidth: 300,    // Giới hạn độ phình to (chống vỡ layout hàng lẻ)
        // ==============================================

        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },
    imagePlaceholder: {
        height: 120,
        backgroundColor: '#D1D5DB',
    },
    cardContent: {
        padding: 12,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    cardInstructor: {
        fontSize: 12,
        color: '#6B7280',
    },
});