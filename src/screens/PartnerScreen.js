import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../style/PartnerScreenStyle';

export default function  PartnerScreen({ partners }) {
  return (
    <View style={styles.partnerContainer}>
      <FlatList data={partners} keyExtractor={item => item.id.toString()} contentContainerStyle={{ padding: 16 }}
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