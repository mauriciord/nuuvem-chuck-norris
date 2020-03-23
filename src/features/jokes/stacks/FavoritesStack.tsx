import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Favoritees ❤️</Text>
    </View>
  );
}

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={TestScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
