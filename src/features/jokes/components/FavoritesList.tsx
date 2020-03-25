import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import fetchWithRetries from 'shared/helpers/fetchWithRetries';
import { useQuery, useMutation, queryCache } from 'react-query';
import {
  Container,
  GradientContainer,
  KeyboardScroll,
  Image,
  FormRow,
  QueryInput,
} from '../styles';

const JokesList = () => {
  function fetchFavorites() {
    queryCache.getQueryData('favoriteJokes');
  }

  const { data: favoriteJokes } = useQuery('favoriteJokes', fetchFavorites);

  console.log('favoriteJokes', { favoriteJokes });

  return (
    <Container>
      <GradientContainer />
    </Container>
  );
};

export default JokesList;
