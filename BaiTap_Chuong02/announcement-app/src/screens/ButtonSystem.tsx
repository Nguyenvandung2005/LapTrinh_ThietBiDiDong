import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    ActivityIndicator,
    View,
    GestureResponderEvent
} from 'react-native';

interface ButtonProps {
    label?: string;
    onPress: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    accessibilityLabel?: string;
}

// 1. Primary Button (Nút hành động chính)
export function PrimaryButton({ label, onPress, disabled, loading, accessibilityLabel }: ButtonProps) {
    const isInactive = disabled || loading;

    return (
        <Pressable
            onPress={isInactive ? undefined : onPress}
            disabled={isInactive}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || label}
            accessibilityState={{ disabled: isInactive, busy: loading }}
            style={({ pressed, focused }: any) => [
                styles.baseButton,
                styles.primaryButton,
                pressed && !isInactive && styles.primaryPressed,
                focused && styles.focusedRing,
                isInactive && styles.disabledButton,
            ]}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
                <Text style={styles.primaryText}>{label}</Text>
            )}
        </Pressable>
    );
}

// 2. Secondary Button (Nút phụ / Nút viền)
export function SecondaryButton({ label, onPress, disabled, loading, accessibilityLabel }: ButtonProps) {
    const isInactive = disabled || loading;

    return (
        <Pressable
            onPress={isInactive ? undefined : onPress}
            disabled={isInactive}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || label}
            accessibilityState={{ disabled: isInactive, busy: loading }}
            style={({ pressed, focused }: any) => [
                styles.baseButton,
                styles.secondaryButton,
                pressed && !isInactive && styles.secondaryPressed,
                focused && styles.focusedRing,
                isInactive && styles.disabledButton,
            ]}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#007AFF" />
            ) : (
                <Text style={styles.secondaryText}>{label}</Text>
            )}
        </Pressable>
    );
}

// 3. Icon Button (Nút biểu tượng - Chuẩn 48x48px target)
export function IconButton({ icon, onPress, disabled, loading, accessibilityLabel }: ButtonProps) {
    const isInactive = disabled || loading;

    return (
        <Pressable
            onPress={isInactive ? undefined : onPress}
            disabled={isInactive}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || 'Nút biểu tượng'}
            accessibilityState={{ disabled: isInactive, busy: loading }}
            style={({ pressed, focused }: any) => [
                styles.iconButton,
                pressed && !isInactive && styles.iconPressed,
                focused && styles.focusedRing,
                isInactive && styles.disabledIcon,
            ]}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#007AFF" />
            ) : (
                <View style={styles.iconWrapper}>{icon}</View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    baseButton: {
        minHeight: 48,
        minWidth: 120,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginVertical: 6,
    },
    primaryButton: {
        backgroundColor: '#007AFF',
    },
    primaryPressed: {
        backgroundColor: '#0056b3',
    },
    primaryText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#007AFF',
    },
    secondaryPressed: {
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
    },
    secondaryText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
    iconButton: {
        minWidth: 48,
        minHeight: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    iconPressed: {
        backgroundColor: '#DCDCDC',
    },
    iconWrapper: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.45,
        backgroundColor: '#A0A0A0',
        borderColor: '#A0A0A0',
    },
    disabledIcon: {
        opacity: 0.4,
    },
    focusedRing: {
        borderWidth: 2,
        borderColor: '#FF9500',
    },
});