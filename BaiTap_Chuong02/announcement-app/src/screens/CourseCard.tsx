import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';

interface CourseCardProps {
    title: string;
    instructor: string;
    thumbnailUrl?: string; // Link ảnh remote
    isLocal?: boolean;
    isDecorative?: boolean;
    onPress: () => void;
}

export function CourseCard({
    title,
    instructor,
    thumbnailUrl,
    isLocal = false,
    isDecorative = false,
    onPress,
}: CourseCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Xác định nguồn ảnh
    const getSource = () => {
        if (isLocal) {
            return require('../../assets/icon.png'); // Ảnh local
        }
        if (thumbnailUrl && !hasError) {
            return { uri: thumbnailUrl };
        }
        return null; // Trường hợp lỗi hoặc không có URL
    };

    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`Khóa học ${title}, giảng viên ${instructor}`}
        >
            {/* Khung ảnh với kích thước cố định để tránh vỡ bố cục (Layout Shift) */}
            <View style={styles.imageContainer}>
                {hasError || (!thumbnailUrl && !isLocal) ? (
                    // Trường hợp 4: Fallback khi ảnh lỗi
                    <View style={styles.fallbackContainer}>
                        <Text style={styles.fallbackText}>📚</Text>
                        <Text style={styles.fallbackSubText}>Ảnh không khả dụng</Text>
                    </View>
                ) : (
                    // Trường hợp 1 & 2: Local / Remote image
                    <Image
                        source={getSource()!}
                        style={styles.image}
                        resizeMode="cover"
                        onLoadStart={() => !isLocal && setIsLoading(true)}
                        onLoadEnd={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(false);
                            setHasError(true); // Kích hoạt trạng thái lỗi
                        }}
                        // Trường hợp 5 & 6: Informative vs Decorative
                        accessible={!isDecorative}
                        accessibilityLabel={isDecorative ? undefined : `Ảnh bìa khóa học ${title}`}
                    />
                )}

                {/* Trường hợp 3: Hiển thị loading khi đang tải ảnh mạng */}
                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="small" color="#007AFF" />
                    </View>
                )}
            </View>

            {/* Nội dung text: Luôn hiển thị đầy đủ dù ảnh có tải được hay không */}
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <Text style={styles.instructor}>{instructor}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        overflow: 'hidden',
        marginBottom: 12,
    },
    cardPressed: { opacity: 0.8 },
    imageContainer: {
        width: '100%',
        height: 140, // Cố định chiều cao khung ảnh
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: { width: '100%', height: '100%' },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(245, 245, 245, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: { fontSize: 32 },
    fallbackSubText: { fontSize: 11, color: '#888', marginTop: 4 },
    content: { padding: 12 },
    title: { fontSize: 15, fontWeight: 'bold', color: '#222', marginBottom: 4 },
    instructor: { fontSize: 13, color: '#666' },
});