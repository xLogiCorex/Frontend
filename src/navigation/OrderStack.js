import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyOrdersScreen from '../screens/MyOrdersScreen';
import NewOrderScreen from '../screens/NewOrderScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const Stack = createNativeStackNavigator();

export default function OrderStack({ products, partners, token }) {
    return (
        <Stack.Navigator>
        <Stack.Screen
            name="MyOrders"
            options={{ title: 'Megrendeléseim' }}
        >
            {(props) => <MyOrdersScreen {...props} token={token} />}
        </Stack.Screen>
        <Stack.Screen
            name="NewOrder"
            options={{ title: 'Új megrendelés' }}
        >
            {(props) => (
            <NewOrderScreen
                {...props}
                products={products}
                partners={partners}
                token={token}
            />
            )}
        </Stack.Screen>
        <Stack.Screen
            name="OrderDetails"
            component={OrderDetailsScreen}
            options={{ title: 'Megrendelés részletei' }}
        />
        </Stack.Navigator>
    );
}