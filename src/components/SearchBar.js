import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChangeText, placeholder }) {
    return (
        <View style={styles.wrap}>
        <TextInput
            placeholder={placeholder || 'Keresés...'}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    wrap: { padding: 12 },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
});