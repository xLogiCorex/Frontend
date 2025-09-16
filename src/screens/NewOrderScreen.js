import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SearchBar from '../components/SearchBar';
import debounce from '../utils/debounce';
import styles from '../style/NewOrderScreenStyle';
import { createOrder } from '../services/orderService'; 
import { fetchPartners } from '../services/partnerService';
import { fetchProducts } from '../services/productService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewOrderScreen({ navigation }) {
  const [partners, setPartners] = useState([]);
  const [partnerId, setPartnerId] = useState("");
  const [loadingPartners, setLoadingPartners] = useState(true);

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [items, setItems] = useState([]); // {productId, sku, name, unit, price, quantity}

  // PARTNEREK BETÖLTÉSE
  useEffect(() => {
    (async () => {
      try {
        setLoadingPartners(true);
        const data = await fetchPartners();
        setPartners(data);
      } catch {
        Alert.alert('Hiba', 'Nem sikerült betölteni a partnereket.');
      } finally {
        setLoadingPartners(false);
      }
    })();
  }, []);

  // TERMÉKEK KERESÉSE DEBOUNCE-AL
  const doSearch = useMemo(() => debounce(async (text) => {
    try {
      setLoadingProducts(true);
      const data = await fetchProducts(text);
      setProducts(data);
    } finally {
      setLoadingProducts(false);
    }
  }, 350), []);

  useEffect(() => {
    doSearch(query);
  }, [query]);

  // TÉTELEK HOZZÁADÁSA / FRISSÍTÉSE
  const upsertItem = (p, qty) => {
    setItems(prev => {
      const idx = prev.findIndex(it => it.productId === p.id);
      const next = [...prev];
      if (qty <= 0) {
        if (idx !== -1) next.splice(idx, 1);
        return next;
      }
      const row = { productId: p.id, sku: p.sku, name: p.name, unit: p.unit, price: Number(p.price), quantity: qty };
      if (idx === -1) next.push(row); else next[idx] = row;
      return next;
    });
  };

  const totalNet = items.reduce((s, it) => s + it.price * it.quantity, 0);

  const handleSave = async () => {
  if (!partnerId) {
    Alert.alert('Hiányzó adat', 'Válassz partnert!');
    return;
  }
  if (items.length === 0) {
    Alert.alert('Üres rendelés', 'Adj hozzá legalább egy tételt!');
    return;
  }
  try {
    const token = await AsyncStorage.getItem('token');
    const payload = { 
      partnerId, 
      items: items.map(it => ({ 
        productId: it.productId, 
        quantity: it.quantity 
      })) 
    };
    const created = await createOrder(payload, token);
    
    Alert.alert(
      'Siker', 
      'Megrendelés rögzítve.',
      [
        { 
          text: 'OK', 
          onPress: () => navigation.replace('OrderDetails', { id: created.orderId }) 
        }
      ]
    );
  } catch (error) {
    console.error('Mentési hiba:', error);
    Alert.alert('Hiba', 'A mentés nem sikerült.');
  }
};

  return (
    <View style={styles.screen}>
      {/* PARTNER KIVÁLASZTÁS */}
      <Text style={styles.sectionTitle}>Partner</Text>
      <View style={styles.dropdown}>
        {loadingPartners ? (
          <ActivityIndicator />
        ) : (

        <Picker
            selectedValue={partnerId}
            onValueChange={(value) => setPartnerId(value)}
        >
            <Picker.Item label="Válassz partnert..." value="" />
            {partners.map(p => (
            <Picker.Item key={p.id} label={p.name} value={String(p.id)} />
  ))}
</Picker>
        )}
      </View>

      {/* TERMÉKEK KERESÉSE */}
      <Text style={styles.sectionTitle}>Termékek</Text>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Keresés név vagy SKU szerint" />
      {loadingProducts && <ActivityIndicator style={{ marginTop: 8 }} />}
      <FlatList
        data={products}
        keyExtractor={p => String(p.id)}
        contentContainerStyle={{ paddingBottom: 160 }}
        renderItem={({ item }) => (
          <ProductRow
            product={item}
            quantity={items.find(it => it.productId === item.id)?.quantity || 0}
            onChange={qty => upsertItem(item, qty)}
          />
        )}
        ListEmptyComponent={!loadingProducts ? <Text style={styles.empty}>Nincs találat.</Text> : null}
      />

      {/* ALSÓ ÖSSZESÍTŐ ÉS MENTÉS */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Összesen (nettó)</Text>
          <Text style={styles.totalValue}>{totalNet.toLocaleString()} Ft</Text>
        </View>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Mentés</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// TERMÉK SOR
function ProductRow({ product, quantity, onChange }) {
  const [localQty, setLocalQty] = useState(String(quantity || '0'));
  useEffect(() => setLocalQty(String(quantity || '0')), [quantity]);

  const commit = val => {
    const n = Number(val);
    if (Number.isNaN(n) || n < 0) return;
    onChange(n);
  };

  return (
    <View style={rowStyles.row}>
      <View style={{ flex: 1 }}>
        <Text style={rowStyles.name}>{product.name}</Text>
        <Text style={rowStyles.meta}>{product.sku} • {product.unit} • Készlet: {product.availableStock}</Text>
        <Text style={rowStyles.price}>{Number(product.price).toLocaleString()} Ft</Text>
      </View>
      <View style={rowStyles.qtyWrap}>
        <TouchableOpacity style={rowStyles.btn} onPress={() => commit(Math.max(0, Number(localQty) - 1))}>
          <Text style={rowStyles.btnText}>−</Text>
        </TouchableOpacity>
        <TextInput
          value={localQty}
          onChangeText={setLocalQty}
          onBlur={() => commit(localQty)}
          keyboardType="number-pad"
          style={rowStyles.input}
        />
        <TouchableOpacity style={rowStyles.btn} onPress={() => commit(Number(localQty) + 1)}>
          <Text style={rowStyles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import { StyleSheet } from 'react-native';

const rowStyles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  name: { fontWeight: 'bold' },
  meta: { color: '#666', fontSize: 12 },
  price: { marginTop: 4 },
  qtyWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  btn: { padding: 6, backgroundColor: '#ddd', borderRadius: 4 },
  btnText: { fontSize: 18, fontWeight: 'bold' },
  input: { width: 40, textAlign: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 4 },
});
