import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../style/CatalogueScreenStyle';

export default function CatalogueScreen({ navigation, products }) {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchVisible, setSearchVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSearchVisible(prev => !prev)} style={{ marginRight: 16 }}>
          <Image source={require('../assets/searchIcon.png')} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, searchVisible]);

  useEffect(() => {
    if (search === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p =>
        (p.name?.toLowerCase() || '').includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

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
                { color: item.stockQuantity > 0 ? '#6ab04c' : '#eb4d4b' },
              ]}
            >
              {item.stockQuantity > 0 ? `Raktáron: ${item.stockQuantity} db` : 'Pillanatnyilag nem elérhető'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
