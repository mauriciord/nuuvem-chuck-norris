import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SearchStack, FavoritesStack } from 'features/jokes';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { theme } from 'shared/constants/theme';

type RootTabParamList = {
  SearchStack: undefined;
  FavoritesStack: undefined;
};

enableScreens();

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const Routes = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="SearchStack"
      labeled={false}
      barStyle={{ backgroundColor: theme.colors.accent }}
    >
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesStack"
        component={FavoritesStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-border" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Routes;
