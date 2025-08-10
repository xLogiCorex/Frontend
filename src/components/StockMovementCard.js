import { View, Text, StyleSheet } from 'react-native';

export default function StockMovementCard({ movement }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{movement.name}</Text>
      <Text>{movement.description}</Text>
      <Text style={styles.price}>{movement.price} Ft</Text>
      <Text style={[ styles.stock, { color: movement.stockQuantity > 0 ? '#6ab04c' : '#eb4d4b' } ]} >
        {movement.stockQuantity > 0 ? `Raktáron: ${movement.stockQuantity} db` : 'Pillanatnyilag nem elérhető'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#dfe6e9',
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    textAlign: 'right',
  },
  stock: {
    textAlign: 'right',
  },
});