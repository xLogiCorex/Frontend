import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Képernyők importálása
import MyOrdersScreen from '../screens/MyOrdersScreen';
import NewOrderScreen from '../screens/NewOrderScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const Stack = createNativeStackNavigator();

export default function OrderStack({ products, partners, token }) {
    return (
        <Stack.Navigator>
        {/* Megrendeléseim képernyő */}
        <Stack.Screen
            name="MyOrders"
            options={{ title: 'Megrendeléseim' }}
        >
            {(props) => <MyOrdersScreen {...props} token={token} />}
        </Stack.Screen>
        {/* Új megrendelés képernyő */}
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
        {/* Megrendelés részletei képernyő */}
        <Stack.Screen
            name="OrderDetails"
            component={OrderDetailsScreen}
            options={{ title: 'Megrendelés részletei' }}
        />
        </Stack.Navigator>
    );
}