import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, Modal, ActivityIndicator, Alert } from 'react-native';
import styles from '../style/StockMovementStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../services/api';
import { fetchProducts } from '../services/productService';

const getMovementLabel = (type) =>
  type === 'in' ? 'Bevételezés' : type === 'out' ? 'Kivét' : type === 'transfer' ? 'Áthelyezés' : 'Mozgatás';

export default function StockMovementScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [movementType, setMovementType] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);

  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  const [myMovementsVisible, setMyMovementsVisible] = useState(false);
  const [myMovements, setMyMovements] = useState([]);
  const [loadingMyMovements, setLoadingMyMovements] = useState(false);

  useEffect(() => { loadProducts(); }, []);

  useEffect(() => {
    if (search.trim() === '') setFilteredProducts(products);
    else setFilteredProducts(products.filter(p => (p.name?.toLowerCase() || '').includes(search.toLowerCase())));
  }, [search, products]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 16 }}>
          <TouchableOpacity onPress={loadMyMovements} style={{ marginRight: 16 }}>
            <Image source={require('../assets/HistoryIcon.png')} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSearchVisible(prev => !prev)}>
            <Image source={require('../assets/searchIcon.png')} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, searchVisible]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch {
      Alert.alert("Hiba", "Nem sikerült betölteni a termékeket.");
    } finally {
      setLoading(false);
    }
  };

  const openMovementModal = (product, type) => {
    setSelectedProduct(product);
    setMovementType(type);
    setQuantity('');
    setNote('');
    setModalVisible(true);
  };


  const handleSave = async () => {
    if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) {
      Alert.alert("Hiba", "Érvényes mennyiséget adj meg!");
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      const apiEndpoint = `/stockMovements/${movementType}`;
      
      const requestData = {
          productId: selectedProduct.id, 
          quantity: parseInt(quantity), 
          userId,
      };

      if (movementType === 'transfer') {
          requestData.transferReason = note; 
      } else {
          requestData.note = note;
      }

      await axios.post(apiEndpoint, requestData, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      
      Alert.alert("Siker", "Készletmozgás rögzítve.");
      loadProducts();
      setModalVisible(false);
    } catch (err) {
      Alert.alert("Hiba", err.response?.data?.message || "Nem sikerült menteni.");
    }
};

  const loadMyMovements = async () => {
    try {
      setLoadingMyMovements(true);
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('/stockMovements/my', { headers: { Authorization: `Bearer ${token}` } });
      setMyMovements(res.data);
      setMyMovementsVisible(true);
    } catch (err) {
      Alert.alert("Hiba", err.response?.data?.message || "Nem sikerült betölteni a mozgásokat.");
    } finally {
      setLoadingMyMovements(false);
    }
  };

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6ab04c" />
    </View>
  );

  return (
    <View style={styles.container}>
      {searchVisible && (
        <TextInput placeholder="Keresés termék vagy leírás alapján..." value={search} onChangeText={setSearch} style={styles.searchInput} />
      )}

      {/* Terméklista */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.productStock}>
              Készlet:{' '}
              <Text style={{ color: item.stockQuantity > 0 ? '#6ab04c' : '#eb4d4b' }}> {item.stockQuantity} {item.unit} </Text>
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6ab04c' }]} onPress={() => openMovementModal(item, 'in')}>
                <Text style={styles.buttonText}>+ Bevét</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#eb4d4b' }]} onPress={() => openMovementModal(item, 'out')}>
                <Text style={styles.buttonText}>- Kivét</Text>
              </TouchableOpacity>
              {/*<TouchableOpacity style={[styles.actionButton, { backgroundColor: '#13109eff' }]} onPress={() => openMovementModal(item, 'transfer')}>
                <Text style={styles.buttonText}>↔ Áthelyezés</Text>
              </TouchableOpacity>*/}
            </View>
          </View>
        )}
      />

      {/* Új készletmozgás modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{getMovementLabel(movementType)}</Text>
            <Text style={{ marginBottom: 10 }}>{selectedProduct?.name}</Text>
            <TextInput placeholder="Mennyiség" value={quantity} keyboardType="numeric" onChangeText={setQuantity} style={styles.input} />
            <TextInput placeholder={movementType === 'transfer' ? "Cél raktárhely / megjegyzés" : "Megjegyzés (opcionális)"} value={note} onChangeText={setNote} style={styles.input} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6ab04c', flex: 1, marginRight: 5 }]} onPress={handleSave}>
                <Text style={styles.buttonText}>Mentés</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#ccc', flex: 1, marginLeft: 5 }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Mégse</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Saját mozgások modal */}
      <Modal visible={myMovementsVisible} transparent={false} animationType="slide" presentationStyle="fullScreen">
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
          <Text style={styles.modalTitle}>Saját készletmozgásaim</Text>

          {/* Szűrők */}
          <View style={{ flexDirection: 'row', marginBottom: 10, flexWrap: 'wrap' }}>
            <TouchableOpacity onPress={() => setFilterType('all')} style={{ marginRight: 10 }}>
              <Text style={{ color: filterType === 'all' ? '#6ab04c' : '#333' }}>Mind</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterType('in')} style={{ marginRight: 10 }}>
              <Text style={{ color: filterType === 'in' ? '#6ab04c' : '#333' }}>Bevételezés</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterType('out')} style={{ marginRight: 10 }}>
              <Text style={{ color: filterType === 'out' ? '#6ab04c' : '#333' }}>Kivét</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterType('transfer')}>
              <Text style={{ color: filterType === 'transfer' ? '#6ab04c' : '#333' }}>Áthelyezés</Text>
            </TouchableOpacity>
          </View>

          <TextInput placeholder="Szűrés dátum szerint (YYYY-MM-DD)" value={filterDate} onChangeText={setFilterDate} 
            style={[styles.input, { marginBottom: 10 }]} />

          {/* Szűrés logika */}
          {(() => {
            const filteredMyMovements = myMovements.filter(mov => {
              const typeMatch = filterType === 'all' || mov.type === filterType;
              const dateMatch = !filterDate || mov.date.startsWith(filterDate);
              return typeMatch && dateMatch;
            });

            return loadingMyMovements ? (
              <ActivityIndicator size="large" color="#6ab04c" />
            ) : (
              <FlatList
                data={filteredMyMovements}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  const prod = products.find(p => p.id === item.productId);
                  return (
                    <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' }}>
                      <Text style={{ fontWeight: 'bold' }}>{prod ? prod.name : `Termék ID: ${item.productId}`}</Text>
                      <Text>Mennyiség: {item.quantity}</Text>
                      <Text>{getMovementLabel(item.type)}</Text>
                      <Text style={{ fontSize: 12, color: '#555' }}>{new Date(item.date).toLocaleString()}</Text>
                      {item.note && <Text style={{ fontStyle: 'italic' }}>{item.note}</Text>}
                    </View>
                  );
                }}
              />
            );
          })()}

          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#ccc', marginTop: 10 }]} onPress={() => setMyMovementsVisible(false)}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Bezár</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}