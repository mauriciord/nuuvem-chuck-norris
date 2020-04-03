import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Headline } from 'react-native-paper';
import { useQueryJokes } from 'shared/hooks';

import {
  Container,
  GradientContainer,
  WrapperContainer,
  List,
} from '../styles';
import JokeItem, { Joke } from './JokeItem';

const JokesList = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const query = route.params.query;
  const isFeelingLucky = route.params.feelingLucky;

  const [results, { normal: status }] = useQueryJokes(query, {
    isFeelingLucky,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: query || 'Results',
    });
  }, [navigation, route]);

  if (status === 'loading') {
    return (
      <Container>
        <GradientContainer />
        <Headline>Loading...</Headline>
      </Container>
    );
  }

  return (
    <Container>
      <GradientContainer />
      <WrapperContainer>
        <List
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }: { item: Joke }) => <JokeItem item={item} />}
        />
      </WrapperContainer>
    </Container>
  );
};

export default JokesList;
