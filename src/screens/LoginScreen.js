import React, { useState } from 'react';
import { Platform, KeyboardAvoidingView, View, Text, TextInput, Pressable, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/LoginScreenStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { BASE_URL } from '../services/api';
export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function login() {
    if (!email && !password) return Alert.alert('Hiba', 'Kérjük, adja meg az email címét és a jelszavát.');
    if (!email) return Alert.alert('Hiba', 'Kérjük, adja meg az email címét.');
    if (!password) return Alert.alert('Hiba', 'Kérjük, adja meg a jelszavát.');

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        newEmail: email,
        newPassword: password
      });

      const { token, userId, message } = response.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userId', String(userId));
      Alert.alert('Sikeres bejelentkezés', message);
      onLogin();
    } catch (error) {
      let msg = 'Ismeretlen hiba történt.';
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      Alert.alert('Bejelentkezés sikertelen', msg);
    }
  }

  function forgottenPassword() {
    Alert.alert('Elfelejtett jelszó', 'Kérjük, lépj kapcsolatba az ügyfélszolgálattal a jelszó visszaállításához.');
  }

  return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.header}>Bejelentkezés</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        placeholder='Email cím'
        autoCapitalize='none'
      />
      <View style={styles.passwordRow}>
        <TextInput
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          placeholder='Jelszó'
          secureTextEntry={!showPassword}
        />
      <Pressable onPress={() => setShowPassword(prev => !prev)} style={{ padding: 10 }}>
  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#30336b" />
</Pressable>
        <Pressable onPress={() => setShowPassword(prev => !prev)} style={styles.eyeIcon} >
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} tyle={styles.eyeIconInner} />
        </Pressable>
      </View>
      

      <Pressable onPress={login} style={styles.button}>
        <Text style={styles.buttonText}>Bejelentkezés</Text>
      </Pressable>
      <Pressable onPress={forgottenPassword} style={styles.button}>
        <Text style={styles.buttonText}>Elfelejtett jelszó</Text>
      </Pressable>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}