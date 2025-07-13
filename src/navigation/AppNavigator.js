import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Képernyők importálása
import OrderScreen from '../screens/OrderScreen';
import WithdrawalScreen from '../screens/WithdrawalScreen';
import InvoiceScreen from '../screens/InvoiceScreen';

import CatalogueStack from './CatalogueStack';
import PartnerStack from './PartnerStack';  

// Példában props-on keresztül kapja a termékeket és partnereket
const Tab = createBottomTabNavigator();

export default function AppNavigator({ products, partners }) {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },  tabBarStyle: { backgroundColor: '#130f40', height: 60 },
          tabBarActiveTintColor: '#dff9fb', tabBarInactiveTintColor: '#95afc0',
        }}
      >

      <Tab.Screen
        name="Katalógus"
        options={{
          tabBarLabel: 'Katalógus',
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../assets/catalogueIcon.png')}
              style={{ width: 30, height: 30, tintColor: '#b2bec3' }}
              resizeMode="contain"
            />
          ),
        }}
      >
        {() => <CatalogueStack products={products} />}
      </Tab.Screen>

      <Tab.Screen
        name="Partnerek"
        options={{
          tabBarLabel: 'Partnerek',
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../assets/partnersIcon.png')}
              style={{ width: 30, height: 30, tintColor: '#b2bec3' }}
              resizeMode="contain"
            />
          ),
        }}
      >
        {() => <PartnerStack partners={partners} />}
      </Tab.Screen>

        <Tab.Screen name="Megrendelés" component={OrderScreen} options={{ tabBarLabel: 'Rendelés',
            tabBarIcon: () => (
              <Image  source={require('../assets/ordersIcon.png')} style={{ width: 30, height: 30, tintColor: '#b2bec3' }} resizeMode="contain" />
            ),
          }}
        />

        <Tab.Screen name="Kivét" component={WithdrawalScreen} options={{ tabBarLabel: 'Kivétel',
            tabBarIcon: () => (
              <Image source={require('../assets/idkIcon.png')} style={{ width: 30, height: 30, tintColor: '#b2bec3' }} resizeMode="contain" />
            ),
          }}
        />

        <Tab.Screen name="Számlázás" component={InvoiceScreen}  options={{ tabBarLabel: 'Számlázás',
            tabBarIcon: () => (
              <Image source={require('../assets/invoicingIcon.png')} style={{ width: 30, height: 30, tintColor: '#b2bec3' }} resizeMode="contain"  />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}