import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from 'shared/constants/theme';

import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  );
};

export default App;
