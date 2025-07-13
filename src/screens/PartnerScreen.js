import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../style/PartnerScreenStyle';

export default function PartnerScreen({ navigation, partners }) {
  const [search, setSearch] = useState('');
  const [filteredPartners, setFilteredPartners] = useState(partners);
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
      setFilteredPartners(partners);
    } else {
      const searchLower = search.toLowerCase();
      const filtered = partners.filter(p => {
        const name = p.name ? String(p.name).toLowerCase() : '';
        const email = p.email ? String(p.email).toLowerCase() : '';
        const taxNumber = p.taxNumber !== undefined && p.taxNumber !== null ? String(p.taxNumber).toLowerCase() : '';

        return (
          name.includes(searchLower) ||
          email.includes(searchLower) ||
          taxNumber.includes(searchLower)
        );
      });
      setFilteredPartners(filtered);
    }
  }, [search, partners]);

  return (
    <View style={styles.partnerContainer}>
      {searchVisible && (
        <TextInput
          placeholder="Keresés partner név vagy email alapján..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      )}
      <FlatList
        data={filteredPartners}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.partnerCard}>
            <Text style={styles.partnerName}>{item.name}</Text>
            <Text style={styles.partnerEmail}>{item.email}</Text>
            <Text style={styles.partnerTaxNumber}>Adószám: {item.taxNumber}</Text>
          </View>
        )}
      />
    </View>
  );
}
