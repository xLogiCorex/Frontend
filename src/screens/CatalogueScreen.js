import React, { useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchProducts } from '../services/productService';
import styles from '../style/CatalogueScreenStyle';

export default function CatalogueScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);

  // 🔹 1. Amikor a képernyő fókuszba kerül → újratöltés az adatbázisból
  useFocusEffect(
    useCallback(() => {
      const loadProducts = async () => {
        try {
          const data = await fetchProducts();
          setProducts(data);
        } catch (err) {
          Alert.alert('Hiba', 'Nem sikerült betölteni a termékeket.');
        }
      };
      loadProducts();
    }, [])
  );

  // 🔹 2. Szűrés keresés alapján
  useEffect(() => {
    if (search.trim() === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(p =>
          (p.name?.toLowerCase() || '').includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSearchVisible(prev => !prev)} style={{ marginRight: 16 }}>
          <Image source={require('../assets/searchIcon.png')} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, searchVisible]);

  return (
    <View style={styles.catalogueContainer}>
      {searchVisible && (
        <TextInput
          placeholder="Keresés termék vagy leírás alapján..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      )}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.productPrice}>{item.price} Ft</Text>
            <Text
              style={[
                styles.productStock,
                { color: item.isActive ? '#6ab04c' : '#eb4d4b' }
              ]}
            >
              {item.isActive
                ? `Raktáron: ${item.stockQuantity} db`
                : 'Pillanatnyilag nem elérhető'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
