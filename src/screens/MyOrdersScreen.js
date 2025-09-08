import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';

import styles from '../style/MyOrderScreenStyle';
import { getOrders } from '../services/orderService';

const StatusBadge = ({ status }) => {
    const map = {
        new: '#f59e0b', completed: '#22c55e', paid: '#16a34a',
        'under transport': '#0ea5e9', cancelled: '#ef4444'
    };
    return (
        <View style={[styles.badge, { backgroundColor: map[status] || '#9ca3af' }]}>
        <Text style={styles.badgeText}>{status}</Text>
        </View>
    );
};

export default function MyOrdersScreen({ navigation, token }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const load = async () => {
        if (!token) return; 
        try {
            setLoading(true);
            const res = await getOrders(token);
            setData(res);
        } catch (error) {
            console.error('Hiba a megrendelések betöltésekor:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) load(); // csak akkor fut, ha token már megvan
    }, [token]);

    const onRefresh = async () => {
        setRefreshing(true);
        await load();
        setRefreshing(false);
    };

    if (loading) return <View style={styles.center}><ActivityIndicator /></View>;

    return (
        <View style={styles.screen}>
        <FlatList
            data={data}
            keyExtractor={o => String(o.id)}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('OrderDetails', { id: item.id })}>
                <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.orderNumber}</Text>
                <Text style={styles.subtitle}>{item.partnerName}</Text>
                <Text style={styles.meta}>{new Date(item.date).toLocaleString()}</Text>
                </View>
                <StatusBadge status={item.status} />
            </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>Még nincs megrendelésed.</Text>}
        />
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NewOrder')}>
            <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
        </View>
    );
}

