import { NavigationContainer } from '@react-navigation/native';
import { SearchStack } from 'features/jokes';
import React from 'react';
import { enableScreens } from 'react-native-screens';

enableScreens();

const Routes = () => (
  <NavigationContainer>
    <SearchStack />
  </NavigationContainer>
);

export default Routes;
