import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
} from 'react-native';

interface FormErrors {
    fullName?: string;
    studentId?: string;
    email?: string;
    summary?: string;
}

export function ValidationFormScreen() {
    const [fullName, setFullName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [email, setEmail] = useState('');
    const [summary, setSummary] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const MAX_SUMMARY_LENGTH = 200;

    const validateForm = () => {
        const newErrors: FormErrors = {};

        // 1. Kiểm thử Spaces-only name
        if (!fullName.trim() || fullName.trim().length < 2) {
            newErrors.fullName = 'Vui lòng nhập họ và tên của bạn (tối thiểu 2 ký tự, không để trống).';
        }

        // 2. Kiểm thử Malformed ID (Phải đúng 8 chữ số)
        const idRegex = /^[0-9]{8}$/;
        if (!idRegex.test(studentId.trim())) {
            newErrors.studentId = 'Mã sinh viên phải gồm đúng 8 chữ số (ví dụ: 23657251).';
        }

        // 3. Kiểm thử Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            newErrors.email = 'Vui lòng nhập đúng định dạng email (ví dụ: name@example.com).';
        }

        // 4. Kiểm thử Overlong Summary
        if (summary.length > MAX_SUMMARY_LENGTH) {
            const excess = summary.length - MAX_SUMMARY_LENGTH;
            newErrors.summary = `Nội dung tóm tắt tối đa ${MAX_SUMMARY_LENGTH} ký tự (bạn đã nhập ${summary.length}/${MAX_SUMMARY_LENGTH}. Vui lòng xóa bớt ${excess} ký tự).`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            alert('Gửi thông tin thành công!');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.headerTitle}>Biểu mẫu Kiểm thử Dữ liệu (Exercise 9)</Text>

                {/* 1. Họ và tên */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Họ và tên *</Text>
                    <TextInput
                        style={[styles.input, errors.fullName && styles.inputError]}
                        placeholder="Nhập họ và tên..."
                        value={fullName}
                        onChangeText={(text) => {
                            setFullName(text);
                            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                    />
                    {errors.fullName && (
                        <Text style={styles.errorText} accessibilityLiveRegion="polite">
                            {errors.fullName}
                        </Text>
                    )}
                </View>

                {/* 2. Mã sinh viên */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Mã sinh viên (MSSV) *</Text>
                    <TextInput
                        style={[styles.input, errors.studentId && styles.inputError]}
                        placeholder="Ví dụ: 23657251"
                        value={studentId}
                        keyboardType="number-pad"
                        maxLength={8}
                        onChangeText={(text) => {
                            setStudentId(text);
                            if (errors.studentId) setErrors({ ...errors, studentId: undefined });
                        }}
                    />
                    {errors.studentId && (
                        <Text style={styles.errorText} accessibilityLiveRegion="polite">
                            {errors.studentId}
                        </Text>
                    )}
                </View>

                {/* 3. Email */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email liên hệ *</Text>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="name@example.com"
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            setEmail(text);
                            if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                    />
                    {errors.email && (
                        <Text style={styles.errorText} accessibilityLiveRegion="polite">
                            {errors.email}
                        </Text>
                    )}
                </View>

                {/* 4. Tóm tắt / Ghi chú */}
                <View style={styles.fieldGroup}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Tóm tắt nội dung</Text>
                        <Text style={[styles.counterText, summary.length > MAX_SUMMARY_LENGTH && styles.counterOver]}>
                            {summary.length}/{MAX_SUMMARY_LENGTH}
                        </Text>
                    </View>
                    <TextInput
                        style={[styles.input, styles.textArea, errors.summary && styles.inputError]}
                        placeholder="Nhập tối đa 200 ký tự..."
                        value={summary}
                        multiline
                        numberOfLines={4}
                        onChangeText={(text) => {
                            setSummary(text);
                            if (errors.summary && text.length <= MAX_SUMMARY_LENGTH) {
                                setErrors({ ...errors, summary: undefined });
                            }
                        }}
                    />
                    {errors.summary && (
                        <Text style={styles.errorText} accessibilityLiveRegion="polite">
                            {errors.summary}
                        </Text>
                    )}
                </View>

                <Pressable style={styles.submitBtn} onPress={handleSubmit} accessibilityRole="button">
                    <Text style={styles.submitBtnText}>Xác nhận & Kiểm tra</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    container: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
        textAlign: 'center',
    },
    fieldGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    counterText: {
        fontSize: 12,
        color: '#6B7280',
    },
    counterOver: {
        color: '#DC2626',
        fontWeight: 'bold',
    },
    input: {
        minHeight: 48,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 14,
        backgroundColor: '#FFFFFF',
        fontSize: 15,
    },
    textArea: {
        minHeight: 90,
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    inputError: {
        borderColor: '#DC2626',
        backgroundColor: '#FEF2F2',
    },
    errorText: {
        color: '#DC2626',
        fontSize: 13,
        marginTop: 4,
        lineHeight: 18,
    },
    submitBtn: {
        minHeight: 48,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});