import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Pressable,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

export function AccessibleFeedScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            {/* 1. Header có Role Header rõ ràng */}
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle} accessibilityRole="header">
                    Danh sách thông báo
                </Text>

                {/* Sửa Lỗi 1 & 5: Missing Name + Small Target (48x48px qua minWidth/minHeight) */}
                <Pressable
                    style={styles.iconButton}
                    accessibilityRole="button"
                    accessibilityLabel="Cài đặt hệ thống"
                    accessibilityHint="Mở màn hình cài đặt và cấu hình tài khoản"
                    hitSlop={8}
                    onPress={() => { }}
                >
                    <Text style={styles.iconSymbol}>⚙️</Text>
                </Pressable>
            </View>

            {/* 2. Ô tìm kiếm với nhãn rõ ràng */}
            <View style={styles.searchSection}>
                <Text style={styles.searchLabel} nativeID="searchLabel">
                    Tìm kiếm thông báo:
                </Text>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Nhập từ khóa tìm kiếm..."
                        // Sửa Lỗi 6: Contrast Failure (Màu placeholder đạt chuẩn WCAG)
                        placeholderTextColor="#595959"
                        accessibilityLabelledBy="searchLabel"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        returnKeyType="search"
                    />
                    {searchQuery.length > 0 && (
                        <Pressable
                            style={styles.clearBtn}
                            accessibilityRole="button"
                            accessibilityLabel="Xóa từ khóa tìm kiếm"
                            hitSlop={12}
                            onPress={() => setSearchQuery('')}
                        >
                            <Text style={styles.clearBtnText}>✕</Text>
                        </Pressable>
                    )}
                </View>
            </View>

            {/* 3. Nút bấm với đầy đủ Trạng thái Trợ năng (Accessibility States) */}
            <View style={styles.actionSection}>
                {/* Sửa Lỗi 3: Absent States */}
                <Pressable
                    style={({ pressed }) => [
                        styles.submitButton,
                        pressed && styles.buttonPressed,
                        isSubmitting && styles.buttonDisabled,
                    ]}
                    disabled={isSubmitting}
                    accessibilityRole="button"
                    accessibilityLabel="Làm mới toàn bộ danh sách"
                    accessibilityState={{ disabled: isSubmitting, busy: isSubmitting }}
                    onPress={() => {
                        setIsSubmitting(true);
                        setTimeout(() => setIsSubmitting(false), 1500);
                    }}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <Text style={styles.submitButtonText}>Làm mới dữ liệu</Text>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FAFC',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        // Sửa Lỗi 6: Màu chữ đạt độ tương phản cao với nền
        color: '#1A202C',
        flex: 1,
    },
    // Sửa Lỗi 5: Đảm bảo kích thước tối thiểu 48x48 px
    iconButton: {
        minWidth: 48,
        minHeight: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSymbol: {
        fontSize: 22,
    },
    searchSection: {
        padding: 16,
    },
    searchLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 6,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E0',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        minHeight: 48,
        paddingHorizontal: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#1A202C',
    },
    clearBtn: {
        minWidth: 32,
        minHeight: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearBtnText: {
        fontSize: 16,
        color: '#4A5568',
        fontWeight: 'bold',
    },
    actionSection: {
        paddingHorizontal: 16,
        marginTop: 8,
    },
    submitButton: {
        minHeight: 48,
        backgroundColor: '#0066CC', // Màu xanh đạt độ tương phản chuẩn WCAG AA
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    buttonPressed: {
        backgroundColor: '#004C99',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});