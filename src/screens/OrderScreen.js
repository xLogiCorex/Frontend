import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../style/PartnerScreenStyle';

export default function OrderScreen() {
  return (
    <View style={styles.screen}>
      <Text>Megrendelés rögzítése (termék + mennyiség)</Text>
    </View>
  );
}