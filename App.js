import React, { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import { fetchProducts } from './src/services/productService';
import { fetchPartners } from './src/services/partnerService';
import { Alert } from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [listOfPartners, setListOfPartners] = useState([]);
  const [authToken, setAuthToken] = useState(null);

async function handleLogin(tokenFromServer) {
  setIsLoggedIn(true);
  setAuthToken(tokenFromServer);
  try {
    const [products, partners] = await Promise.all([
      fetchProducts(tokenFromServer),
      fetchPartners(tokenFromServer)
    ]);
    setListOfProducts(products);
    setListOfPartners(partners);
  } catch (error) {
    Alert.alert('Hiba', 'Nem sikerült betölteni az adatokat.');
  }
}

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <AppNavigator products={listOfProducts} partners={listOfPartners} token={authToken}/>
  );
}