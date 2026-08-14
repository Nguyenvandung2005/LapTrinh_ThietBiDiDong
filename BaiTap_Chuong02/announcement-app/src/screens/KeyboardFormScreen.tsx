import React, { useState } from 'react';
import {
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
} from 'react-native';

// ❌ FORM LỖI: Dùng View cố định, không cuộn được khi bàn phím xuất hiện
export function BrokenFormScreen({ onToggle }: { onToggle: () => void }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Pressable onPress={onToggle} style={styles.toggleBtn}>
                    <Text style={styles.toggleText}>Chuyển sang Form Sửa Lỗi</Text>
                </Pressable>
            </View>
            <View style={styles.brokenContainer}>
                <Text style={styles.title}>Biểu mẫu Đăng ký (Bị Lỗi)</Text>
                <TextInput style={styles.input} placeholder="Họ và tên" />
                <TextInput style={styles.input} placeholder="Email" />
                <TextInput style={styles.input} placeholder="Số điện thoại" />
                <TextInput style={styles.input} placeholder="Địa chỉ thường trú" />
                
                {/* Dùng một thẻ View cao để mô phỏng màn hình bị đẩy */}
                <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Khoảng trống mô phỏng nội dung</Text>
                </View>

                {/* Ô nhập và nút này sẽ bị BÀN PHÍM CHE KHUẤT HOÀN TOÀN */}
                <TextInput style={styles.input} placeholder="Ghi chú bổ sung (Last Field)" />
                <Pressable style={styles.submitBtn}>
                    <Text style={styles.btnText}>Xác nhận Gửi</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

// ✅ FORM ĐÃ SỬA: Dùng KeyboardAvoidingView + ScrollView + TouchableWithoutFeedback
export function FixedFormScreen({ onToggle }: { onToggle: () => void }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Pressable onPress={onToggle} style={styles.toggleBtn}>
                    <Text style={styles.toggleText}>Chuyển sang Form Bị Lỗi</Text>
                </Pressable>
            </View>

            <KeyboardAvoidingView 
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.title}>Biểu mẫu Đăng ký (Đã Sửa)</Text>
                        <TextInput style={styles.input} placeholder="Họ và tên" />
                        <TextInput style={styles.input} placeholder="Email" />
                        <TextInput style={styles.input} placeholder="Số điện thoại" />
                        <TextInput style={styles.input} placeholder="Địa chỉ thường trú" />
                        
                        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Khoảng trống mô phỏng nội dung</Text>
                        </View>

                        <TextInput style={styles.input} placeholder="Ghi chú bổ sung (Last Field)" />
                        <Pressable style={styles.submitBtn}>
                            <Text style={styles.btnText}>Xác nhận Gửi</Text>
                        </Pressable>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// Màn hình chính gộp cả 2 form để dễ test
export function KeyboardFormScreen() {
    const [showFixed, setShowFixed] = useState(false);
    
    if (showFixed) {
        return <FixedFormScreen onToggle={() => setShowFixed(false)} />;
    }
    return <BrokenFormScreen onToggle={() => setShowFixed(true)} />;
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    toggleBtn: {
        padding: 10,
        backgroundColor: '#374151',
        borderRadius: 8,
    },
    toggleText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    brokenContainer: {
        flex: 1,
        padding: 16,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#111827',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 14,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
    },
    submitBtn: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});