import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    ActivityIndicator, 
    Alert, 
    ScrollView,
    TouchableOpacity,
    StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrderById } from '../services/orderService'; 
import styles from '../style/OrderDetailsScreenStyle';

// Státusz színek
const statusColors = {
    new: '#f39c12',
    confirmed: '#3498db',
    processing: '#9b59b6',
    completed: '#2ecc71',
    cancelled: '#e74c3c',
    on_hold: '#f1c40f',
};

// Státusz címkék
const statusLabels = {
    new: 'Új',
    confirmed: 'Visszaigazolva',
    processing: 'Feldolgozás alatt',
    completed: 'Teljesítve',
    cancelled: 'Törölve',
    on_hold: 'Felfüggesztve',
    };

    // Megrendelés Részletek Képernyő
    export default function OrderDetailsScreen({ route, navigation }) {
    const { id } = route.params;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
        
    useEffect(() => {
        (async () => {
        try {
            // Token lekérése
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Hiba', 'Nincs érvényes token!');
                setLoading(false);
                return;
            }

            // API hívás a megrendelés adatainak lekérésére
            const data = await getOrderById(id, token);
            setOrder(data);
            
        } catch (e) {
            console.error('Hiba a megrendelés betöltésekor:', e);
            Alert.alert('Hiba', 'Nem sikerült betölteni a megrendelést.');
        } finally {
            setLoading(false);
        }
        })();
    }, [id]);

    // Betöltés alatti kijelző
    if (loading) {
        return (
        <View style={styles.screen}>
            <StatusBar backgroundColor="#2c3e50" />
            <View style={styles.center}>
            <ActivityIndicator size="large" color="#2c3e50" />
            <Text style={{ marginTop: 16, color: '#7f8c8d' }}>Megrendelés betöltése...</Text>
            </View>
        </View>
        );
    }

    // Hiba/üres adat esetén megjelenő kijelző
    if (!order) {
        return (
        <View style={styles.screen}>
            <StatusBar backgroundColor="#2c3e50" />
            <View style={styles.center}>
            <Ionicons name="document-text" size={48} color="#bdc3c7" />
            <Text style={{ marginTop: 16, color: '#7f8c8d', textAlign: 'center', padding: 20 }}>
                A megrendelés részletei hamarosan elérhetőek lesznek.
            </Text>
            {/* Vissza gomb a hiba/üres kijelzőn */}
            <TouchableOpacity 
                style={{ 
                backgroundColor: '#3498db', 
                paddingHorizontal: 20, 
                paddingVertical: 10, 
                borderRadius: 8, 
                marginTop: 20 
                }}
                onPress={() => navigation.goBack()}
            >
                <Text style={{ color: 'white', fontWeight: '600' }}>Vissza</Text>
            </TouchableOpacity>
            </View>
        </View>
        );
    }

    // Megrendelési Részletek Megjelenítése
    return (
        <View style={styles.screen}>
        <StatusBar backgroundColor="#2c3e50" />
        {/* Vissza navigációs gomb */}
        <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
            <Ionicons name="arrow-back" size={24} color="#2c3e50" />
        </TouchableOpacity>

        <ScrollView style={styles.container}>
            {/* Fejléc rész */}
            <View style={styles.header}>
            <Text style={styles.title}>{order.orderNumber}</Text>
            <Text style={styles.subtitle}>{order.partner?.name || order.partnerName}</Text>
            <Text style={styles.meta}>
                {new Date(order.date).toLocaleDateString('hu-HU')} • 
                {new Date(order.date).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: statusColors[order.status] || '#95a5a6' }]}>
                <Text style={styles.statusText}>
                {statusLabels[order.status] || order.status}
                </Text>
            </View>
            </View>

            {/* Termékek listája */}
            <Text style={styles.sectionTitle}>Megrendelt termékek</Text>
            
            {order.items && order.items.map((item, index) => (
            <View key={item.id || index} style={styles.row}>
                <View style={styles.productInfo}>
                <Text style={styles.pname}>{item.product?.name || item.name}</Text>
                <Text style={styles.pmeta}>
                    {item.product?.sku || item.sku} • {item.quantity} {item.product?.unit || item.unit}
                </Text>
                </View>
                <View style={styles.priceSection}>
                <Text style={styles.price}>{Number(item.unitPrice).toLocaleString('hu-HU')} Ft</Text>
                <Text style={styles.totalRow}>
                    {Number(item.totalPrice || item.unitPrice * item.quantity).toLocaleString('hu-HU')} Ft
                </Text>
                </View>
            </View>
            ))}

            {/* Összesítő */}
            <View style={styles.footer}>
            <Text style={styles.totalLabel}>Összesen (nettó)</Text>
            <Text style={styles.totalValue}>
                {order.totals?.net 
                ? Number(order.totals.net).toLocaleString('hu-HU') 
                : order.items?.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0).toLocaleString('hu-HU')
                } Ft
            </Text>
            
            {order.totals?.vat && (
                <View style={styles.vatRow}>
                <Text style={styles.totalLabel}>ÁFA (27%)</Text>
                <Text style={styles.totalValue}>
                    {Number(order.totals.vat).toLocaleString('hu-HU')} Ft
                </Text>
                </View>
            )}
            
            {order.totals?.gross && (
                <View style={styles.grossRow}>
                <Text style={styles.grossLabel}>Végösszeg</Text>
                <Text style={styles.grossValue}>
                    {Number(order.totals.gross).toLocaleString('hu-HU')} Ft
                </Text>
                </View>
            )}
            </View>
        </ScrollView>
        </View>
    );
}