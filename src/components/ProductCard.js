import { View, Text, StyleSheet } from 'react-native';

export default function ProductCard({ product }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text style={styles.price}>{product.price} Ft</Text>
      <Text style={[ styles.stock, { color: product.stockQuantity > 0 ? '#6ab04c' : '#eb4d4b' } ]} >
        {product.stockQuantity > 0 ? `Raktáron: ${product.stockQuantity} db` : 'Pillanatnyilag nem elérhető'}
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
