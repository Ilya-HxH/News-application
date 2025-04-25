import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyState = ({ message = 'No data availabe' }) => {
    return (
        <View style={style.container}>
            <Text style={style.message}>{message}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    message: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
    },
});

export default EmptyState;