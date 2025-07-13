import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PartnerScreen from '../screens/PartnerScreen';

const Stack = createStackNavigator();

export default function PartnerStack({ partners }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PartnerMain"
        options={{ title: 'Partnerek' }}
      >
        {props => <PartnerScreen {...props} partners={partners} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
