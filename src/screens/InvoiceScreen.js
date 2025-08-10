import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../style/CatalogueScreenStyle';
import styles from '../style/PartnerScreenStyle';

export default function WithdrawalScreen() {
export default function InvoiceScreen() {
  return (
    <View style={styles.screen}>
      <Text>Kivét rögzítése a rendeléshez</Text>
      <Text>Számlázás</Text>
    </View>
  );
}