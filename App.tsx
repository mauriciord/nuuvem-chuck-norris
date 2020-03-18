import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: #111;
`;

export default function App() {
  return (
    <PaperProvider>
      <Container>
        <Text>Nuuvem Project</Text>
      </Container>
    </PaperProvider>
  );
}
