import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';


import styles from '../style/OrderDetailsScreenStyle';

export default function OrderDetailsScreen({ route }) {
    const { id } = route.params;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
        try {
            const data = await fetchOrderById(id);
            setOrder(data);
        } catch (e) {
            Alert.alert('Hiba', 'Nem sikerült betölteni a megrendelést.');
        } finally {
            setLoading(false);
        }
        })();
    }, [id]);

    if (loading) return <View style={styles.center}><ActivityIndicator /></View>;
    if (!order) return null;

    const totals = order.totals || {
        net: order.items.reduce((s, it) => s + Number(it.unitPrice) * it.quantity, 0),
    };

    return (
        <View style={styles.screen}>
        <View style={styles.header}>
            <Text style={styles.title}>{order.orderNumber}</Text>
            <Text style={styles.subtitle}>{order.partner?.name || order.partnerName}</Text>
            <Text style={styles.meta}>{new Date(order.date).toLocaleString()} • {order.status}</Text>
        </View>

        <FlatList
            data={order.items}
            keyExtractor={(it) => String(it.id || `${it.productId}-${it.unitPrice}`)}
            renderItem={({ item }) => (
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                <Text style={styles.pname}>{item.product?.name || item.name}</Text>
                <Text style={styles.pmeta}>{item.product?.sku || item.sku} • {item.quantity} {item.product?.unit || item.unit}</Text>
                </View>
                <View>
                <Text style={styles.price}>{Number(item.unitPrice).toLocaleString()} Ft</Text>
                <Text style={styles.totalRow}>{Number(item.totalPrice || item.unitPrice * item.quantity).toLocaleString()} Ft</Text>
                </View>
            </View>
            )}
            ListFooterComponent={
            <View style={styles.footer}>
                <Text style={styles.totalLabel}>Összesen (nettó)</Text>
                <Text style={styles.totalValue}>{Number(totals.net).toLocaleString()} Ft</Text>
            </View>
            }
        />
        </View>
    );
}

