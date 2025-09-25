import React, { useEffect, useState } from 'react';
import { 
    View, Text, FlatList, TouchableOpacity, 
    RefreshControl, ActivityIndicator, Alert,
    Linking, Platform 
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import styles from '../style/InvoiceScreenStyle';
import { getInvoices, getInvoicePdf } from '../services/invoiceService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InvoiceItem = ({ item, token }) => {
    const [downloading, setDownloading] = useState(false);

    // Letöltés funkció
    const downloadInvoice = async () => {
        try {
            setDownloading(true);
            const pdfUrl = await getInvoicePdf(item.id, token);
            
            // Webes környezet (Expo Web)
            if (Platform.OS === 'web') {
                window.open(pdfUrl, '_blank');
            } 
            // Mobil környezet (iOS/Android)
            else {
                const fileUri = FileSystem.documentDirectory + `szamla_${item.invoiceNumber}.pdf`;
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
    const updateLater = async () => {
        Alert.alert('Fejlesztés alatt')
        alert("Fejlesztés alatt")
    }

    return (
        <View style={styles.invoiceCard}>
            <View style={styles.invoiceInfo}>
                <Text style={styles.invoiceNumber}>{item.invoiceNumber}</Text>
                <Text style={styles.partnerName}>{item.partnerName || 'Ismeretlen partner'}</Text>
                <Text style={styles.invoiceDate}>
                    {new Date(item.issueDate).toLocaleDateString('hu-HU')}
                </Text>
                <Text style={styles.invoiceAmount}>
                    {item.totalGross?.toLocaleString('hu-HU')} Ft
                </Text>
            </View>
            {/* Letöltés gomb */}
            <TouchableOpacity 
                style={[styles.downloadButton, downloading && styles.downloadButtonDisabled]}
                /*onPress={downloadInvoice}*/
                onPress={updateLater}
                disabled={downloading}
            >
                <Text style={styles.downloadButtonText}>
                    {downloading ? 'Letöltés...' : 'Letöltés'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

// Fő Számlázás Képernyő
export default function MyInvoicesScreen() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    let token = ""

    // Számlák betöltése az API-ból
    const load = async () => {
        token = await AsyncStorage.getItem("token")
        if (!token) return; 
        try {
            setLoading(true);
            const res = await getInvoices(token);
            setData(res);
        } catch (error) {
            console.error('Hiba a számlák betöltésekor:', error);
            Alert.alert('Hiba', 'Nem sikerült betölteni a számlákat.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
         load();
    }, []);

    // "Húzd le a frissítéshez" funkció
    const onRefresh = async () => {
        setRefreshing(true);
        await load();
        setRefreshing(false);
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Számlák betöltése...</Text>
            </View>
        );
    }

    // Számlák listája
    return (
        <View style={styles.screen}>
            <FlatList
                data={data}
                keyExtractor={item => String(item.id)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item }) => (
                    <InvoiceItem item={item} token={token} />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Még nincsenek számláid.</Text>
                    </View>
                }
            />
        </View>
    );
}