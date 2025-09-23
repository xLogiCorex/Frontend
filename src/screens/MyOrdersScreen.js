
import React, { useEffect, useState } from 'react';
import { 
    View, Text, FlatList, TouchableOpacity, 
    RefreshControl, ActivityIndicator, Modal, Alert, Pressable, 
    Linking, Platform 
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import styles from '../style/MyOrderScreenStyle';
import { getOrders, updateOrderStatus } from '../services/orderService';
import { getInvoicePdf } from '../services/invoiceService';

const StatusBadge = ({ status, onPress }) => {
    const statusColors = {
        new: '#f59e0b',
        confirmed: '#3b82f6',
        processing: '#6366f1',
        completed: '#22c55e',
        cancelled: '#ef4444',
        on_hold: '#f97316',
    };

    const statusLabels = {
        new: 'Új',
        confirmed: 'Visszaigazolva',
        processing: 'Feldolgozás',
        completed: 'Teljesítve',
        cancelled: 'Törölve',
        on_hold: 'Felfüggesztve',
    };

    return (
        <TouchableOpacity 
            style={[styles.badge, { backgroundColor: statusColors[status] || '#9ca3af' }]}
            onPress={onPress}
        >
            <Text style={styles.badgeText}>{statusLabels[status] || status}</Text>
        </TouchableOpacity>
    );
};

const ActionButton = ({ order, onStatusChange, token }) => {
    const [downloading, setDownloading] = useState(false);

    const downloadInvoice = async () => {
        try {
            setDownloading(true);
            const pdfUrl = await getInvoicePdf(order.id, token);
            
            if (Platform.OS === 'web') {
                // Web esetén új lapon nyitjuk meg
                window.open(pdfUrl, '_blank');
            } else {
                // Mobil esetén letöltés és megosztás
                const fileUri = FileSystem.documentDirectory + `szamla_${order.orderNumber}.pdf`;
                const { uri } = await FileSystem.downloadAsync(pdfUrl, fileUri);
                
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(uri);
                } else {
                    Alert.alert('Siker', 'Számla letöltve');
                }
            }
        } catch (error) {
            console.error('Számla letöltés hiba:', error);
            Alert.alert('Hiba', 'Nem sikerült letölteni a számlát.');
        } finally {
            setDownloading(false);
        }
    };

    if (order.status === 'completed') {
        return (
            <TouchableOpacity 
                style={[styles.actionButton, styles.invoiceButton]}
                onPress={downloadInvoice}
                disabled={downloading}
            >
                <Text style={styles.actionButtonText}>
                    {downloading ? 'Letöltés...' : 'Számla letöltése'}
                </Text>
            </TouchableOpacity>
        );
    }

    if (order.status === 'new') {
        return (
            <TouchableOpacity 
                style={[styles.actionButton, styles.completeButton]}
                onPress={() => onStatusChange('completed')}
            >
                <Text style={styles.actionButtonText}>Lezárás</Text>
            </TouchableOpacity>
        );
    }

    return null;
};

export default function MyOrdersScreen({ navigation, token }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const load = async () => {
        if (!token) return; 
        try {
            setLoading(true);
            const res = await getOrders(token);
            setData(res);
        } catch (error) {
            console.error('Hiba a megrendelések betöltésekor:', error);
            Alert.alert('Hiba', 'Nem sikerült betölteni a megrendeléseket.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) load();
    }, [token]);

    const onRefresh = async () => {
        setRefreshing(true);
        await load();
        setRefreshing(false);
    };

    const openStatusModal = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const updateStatus = async (newStatus) => {
        if (!selectedOrder) return;

        try {
            await updateOrderStatus(selectedOrder.id, { newStatus }, token);
            
            Alert.alert('Siker', `Státusz sikeresen módosítva: ${getStatusLabel(newStatus)}`);
            setModalVisible(false);
            load();
            
        } catch (error) {
            console.error('Státusz frissítés hiba:', error);
            Alert.alert('Hiba', 'Nem sikerült frissíteni a státuszt.');
        }
    };

    const getStatusLabel = (status) => {
        const labels = {
            new: 'Új',
            confirmed: 'Visszaigazolva',
            processing: 'Feldolgozás',
            completed: 'Teljesítve',
            cancelled: 'Törölve',
            on_hold: 'Felfüggesztve',
        };
        return labels[status] || status;
    };

    if (loading) return <View style={styles.center}><ActivityIndicator /></View>;

    return (
        <View style={styles.screen}>
            <FlatList
                data={data}
                keyExtractor={o => String(o.id)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item }) => (
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <TouchableOpacity 
                            style={styles.cardContent}
                            onPress={() => navigation.navigate('OrderDetails', { id: item.id })}
                        >
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.title}>{item.orderNumber}</Text>
                                <Text style={styles.subtitle}>{item.partnerName}</Text>
                                <Text style={styles.meta}>{new Date(item.date).toLocaleString()}</Text>
                            </View>
                            <StatusBadge 
                                status={item.status} 
                                onPress={() => openStatusModal(item)}
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.actionButtonContainer}>
                        <ActionButton 
                            order={item} 
                            onStatusChange={updateStatus} 
                            token={token}
                        />
                    </View>
                </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>Még nincs megrendelésed.</Text>}
            />

            {/* Státusz módosító modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalCenteredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Státusz módosítása</Text>
                        <Text style={styles.orderNumber}>{selectedOrder?.orderNumber}</Text>
                        <Text style={styles.currentStatus}>
                            Jelenlegi státusz: {getStatusLabel(selectedOrder?.status)}
                        </Text>

                        <View style={styles.statusButtonsContainer}>
                            <TouchableOpacity 
                                style={[styles.statusButton, styles.statusNew]}
                                onPress={() => updateStatus('new')}
                            >
                                <Text style={styles.statusButtonText}>Új</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.statusButton, styles.statusConfirmed]}
                                onPress={() => updateStatus('confirmed')}
                            >
                                <Text style={styles.statusButtonText}>Visszaigazolva</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.statusButton, styles.statusProcessing]}
                                onPress={() => updateStatus('processing')}
                            >
                                <Text style={styles.statusButtonText}>Feldolgozás</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.statusButton, styles.statusCompleted]}
                                onPress={() => updateStatus('completed')}
                            >
                                <Text style={styles.statusButtonText}>Teljesítve</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.statusButton, styles.statusOnHold]}
                                onPress={() => updateStatus('on_hold')}
                            >
                                <Text style={styles.statusButtonText}>Felfüggesztve</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.statusButton, styles.statusCancelled]}
                                onPress={() => updateStatus('cancelled')}
                            >
                                <Text style={styles.statusButtonText}>Törölve</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalButtonContainer}>
                            <Pressable
                                style={[styles.modalButton, styles.modalButtonCancel]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalTextStyle}>Mégse</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NewOrder')}>
                <Text style={styles.fabText}>＋</Text>
            </TouchableOpacity>
        </View>
    );
}