import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Képernyők importálása
import StockMovementScreen from '../screens/StockMovementScreen';
import InvoiceScreen from '../screens/InvoiceScreen';

import CatalogueStack from './CatalogueStack';
import PartnerStack from './PartnerStack';  
import OrderStack from './OrderStack';

const Tab = createBottomTabNavigator();

export default function AppNavigator({ products, partners, token }) {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },  tabBarStyle: { backgroundColor: '#130f40', height: 60 },
        tabBarActiveTintColor: '#dff9fb', tabBarInactiveTintColor: '#95afc0',
      }}
      >

      {/* Katalógus képernyő */}
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

      {/* Partnerek képernyő */}
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

      {/* Megrendelések képernyő */}
      <Tab.Screen
        name="Megrendelések"
        options={{
          tabBarLabel: 'Rendelések',
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../assets/ordersIcon.png')}
              style={{ width: 30, height: 30, tintColor: '#b2bec3' }}
              resizeMode="contain"
            />
          ),
        }}
      >
        {(props) => (<OrderStack {...props}
          products={products}
          partners={partners}
          token={token}
        />)}
      </Tab.Screen>

      {/* Készletmozgás képernyő */}
      <Tab.Screen name="Készletmozgatás" component={StockMovementScreen} options={{ tabBarLabel: 'Mozgatás',
          tabBarIcon: () => (
            <Image 
            source={require('../assets/StockMovementIcon.png')} 
            style={{ width: 30, height: 30, tintColor: '#b2bec3' }} 
            resizeMode="contain" 
            />
          ),
        }}
      />

      {/* Számlázás képernyő */}
      <Tab.Screen name="Számlázás" component={InvoiceScreen}  options={{ tabBarLabel: 'Számlázás',
          tabBarIcon: () => (
            <Image 
            source={require('../assets/invoicingIcon.png')} 
            style={{ width: 30, height: 30, tintColor: '#b2bec3' }} 
            resizeMode="contain"  
            />
          ),
        }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}