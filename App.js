import * as React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Image, FlatList, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';

const Tab = createBottomTabNavigator();

// Termékkatalógus fül komponense
function CatalogScreen({ products }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#c7ecee' }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#dfe6e9', borderRadius: 8, marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={{textAlign:'right'}}>{item.price} Ft</Text>
           <Text style={{textAlign: 'right',  color: item.stockQuantity > 0 ? '#eb4d4b' : '#eb4d4b'}}>{item.stockQuantity > 0 ? `Raktáron: ${item.stockQuantity} db` : 'Pillanatnyilag nem elérhető'}</Text>

          </View>
        )}
      />
    </View>
  );
}

// A többi fül egyszerű placeholder komponens
function PartnerScreen() {
  return <View style={styles.screen}><Text>Partner keresés, új partner felvétele</Text></View>;
}
function OrderScreen() {
  return <View style={styles.screen}><Text>Megrendelés rögzítése (termék + mennyiség)</Text></View>;
}
function WithdrawalScreen() {
  return <View style={styles.screen}><Text>Kivét rögzítése a rendeléshez</Text></View>;
}
function InvoiceScreen() {
  return <View style={styles.screen}><Text>Számlázás, PDF generálás</Text></View>;
}

// Bejelentkezési képernyő
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    if (email === '' && password === '') return Alert.alert('Hiba', 'Kérjük, adja meg az email címét és a jelszavát.');
    if (email === '') return Alert.alert('Hiba', 'Kérjük, adja meg az email címét.');
    if (password === '') return Alert.alert('Hiba', 'Kérjük, adja meg a jelszavát.');

    Alert.alert('Sikeres bejelentkezés', 'Jó munkát!');
    onLogin(email, password);
  }

  function forgottenPassword() {
    Alert.alert('Elfelejtett jelszó', 'Kérjük, lépj kapcsolatba az ügyfélszolgálattal a jelszó visszaállításához.');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={{ width: 150, height: 150 }} />
      <Text style={styles.header}>Bejelentkezés</Text>
      <TextInput style={styles.textInput} value={email} onChangeText={setEmail} placeholder='Email cím' />
      <TextInput style={styles.textInput} value={password} onChangeText={setPassword} placeholder='Jelszó' secureTextEntry />
      <Pressable onPress={login} style={styles.button}><Text style={styles.buttonText}>Bejelentkezés</Text></Pressable>
      <Pressable onPress={forgottenPassword} style={styles.button}><Text style={styles.buttonText}>Elfelejtett jelszó</Text></Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);

  // Bejelentkezés után termékek betöltése
  async function handleLogin(email, password) {
    setIsLoggedIn(true);
    try {
      const result = await axios('http://192.168.1.4:3000/products');
      setListOfProducts(result.data);
    } catch (error) {
      Alert.alert('Hiba', 'Nem sikerült betölteni a termékeket.');
    }
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#130f40', height: 60 },
          tabBarActiveTintColor: '#dff9fb',
          tabBarInactiveTintColor: '#95afc0',
        }}>
        <Tab.Screen name="Katalógus" options={{ tabBarLabel: 'Katalógus', 
          tabBarIcon: ({ focused }) => (<Image source={require('./assets/catalogueIcon.png')} style={styles.icons}  resizeMode="contain"  />), }}>
          {() => <CatalogScreen products={listOfProducts} />}
        </Tab.Screen>
        <Tab.Screen name="Partner" component={PartnerScreen} options={{ tabBarLabel: 'Partnerek',
        tabBarIcon: ({ focused }) => (<Image source={require('./assets/partnersIcon.png')} style={styles.icons}  resizeMode="contain"  />), }}></Tab.Screen>
        
        <Tab.Screen name="Megrendelés" component={OrderScreen} options={{ tabBarLabel: 'Rendelés',
          tabBarIcon: ({ focused }) => (<Image source={require('./assets/ordersIcon.png')} style={styles.icons} resizeMode="contain" />)
         }} />
        <Tab.Screen name="Kivét" component={WithdrawalScreen} options={{ tabBarLabel: 'Kivétel',
          tabBarIcon: ({ focused }) => (<Image source={require('./assets/idkIcon.png')} style={styles.icons} resizeMode="contain" />)
         }} />
        <Tab.Screen name="Számlázás" component={InvoiceScreen} options={{ tabBarLabel: 'Számlázás', 
          tabBarIcon: ({ focused }) => (<Image source={require('./assets/invoicingIcon.png')} style={styles.icons} resizeMode="contain" />)
         }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7ecee',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    fontSize: 28,
    marginBottom: 14,
    fontWeight: 'bold',
    color: '#535c68',
  },
  textInput: {
    width: '80%',
    height: 48,
    backgroundColor: '#dfe6e9',
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
    color: '#2f3640',
  },
  button: {
    width: '80%',
    height: 48,
    backgroundColor: '#30336b',
    color: '#dff9fb',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#dff9fb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c7ecee',
  },
  icons: {
    width: 30,
    height: 30,
    tintColor: '#b2bec3',
    focused: {
      tintColor: '#95afc0',
    },
    alignRight: {
      textalign: 'right',
    }
  },
});