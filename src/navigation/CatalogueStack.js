import { createStackNavigator } from '@react-navigation/stack';
import CatalogueScreen from '../screens/CatalogueScreen';

const Stack = createStackNavigator();

export default function CatalogueStack({ products }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CatalogueMain"
        options={{ title: 'Katalógus' }}
      >
        {props => <CatalogueScreen {...props} products={products} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
