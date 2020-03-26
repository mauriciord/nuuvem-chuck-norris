import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { db } from 'services/local-database';
import { theme } from 'shared/constants/theme';

import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists fav_jokes (id text primary key not null, value text);'
      );
    });
  }, []);

  return (
    <PaperProvider theme={theme}>
      <RootNavigation />
    </PaperProvider>
  );
};

export default App;
