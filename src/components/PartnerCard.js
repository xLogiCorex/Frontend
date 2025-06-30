import { View, Text, StyleSheet } from 'react-native';

export default function PartnerCard({ partner }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{partner.name}</Text>
      <Text style={styles.email}>{partner.email}</Text>
      <Text style={styles.taxNumber}>Adószám: {partner.taxNumber}</Text>
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
  email: {
    color: '#636e72',
  },
  taxNumber: {
    textAlign: 'right',
    color: '#636e72',
  },
});