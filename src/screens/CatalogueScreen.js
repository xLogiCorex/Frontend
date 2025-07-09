//Kereshető legyen SKUra és Névre

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../style/CatalogueScreenStyle';

export default function catalogueScreen({ products }) {
  return (
      <View style={styles.catalogueContainer}>
      <FlatList data={products} keyExtractor={item => item.id.toString()} contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.productPrice}>{item.price} Ft</Text>
            <Text style={[styles.productStock, { color: item.stockQuantity > 0 ? '#6ab04c' : '#eb4d4b' }]}>
              {item.stockQuantity > 0 ? `Raktáron: ${item.stockQuantity} db` : 'Pillanatnyilag nem elérhető'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}