import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from 'shared/constants/theme';

import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <RootNavigation />
    </PaperProvider>
  );
};

export default App;
