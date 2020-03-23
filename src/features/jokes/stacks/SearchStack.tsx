import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Results => Search</Text>
    </View>
  );
}
const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackground: () => (
          <BlurView
            tint="light"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen name="SearchResults" component={TestScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
