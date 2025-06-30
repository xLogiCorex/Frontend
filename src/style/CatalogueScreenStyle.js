import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  catalogueContainer: {
    flex: 1,
    backgroundColor: '#c7ecee',
  },
  productCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#dfe6e9',
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    textAlign: 'right',
  },
  productStock: {
    textAlign: 'right',
  },
});