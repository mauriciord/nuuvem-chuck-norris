import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import fetchWithRetries from 'shared/helpers/fetchWithRetries';
import { useQuery, useMutation, queryCache } from 'react-query';
import { FlatList, ScrollView } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import {
  Container,
  GradientContainer,
  Card,
  CardActions,
  FavoriteButton,
} from '../styles';

type Joke = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

const JokesList = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const query = route.params.query;

  const fetchJokes = (string, arg) => {
    return fetchWithRetries(
      `https://api.chucknorris.io/jokes/search?query=${arg}`
    ).then(res => res.json());
  };

  const { data, status } = useQuery(query && ['jokes', query], fetchJokes);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.query || 'Results',
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

  const { result } = data;

  return (
    <Container>
      <GradientContainer />
      <FlatList
        style={{
          flex: 1,
          width: '100%',
          paddingTop: 90,
          paddingBottom: 120,
        }}
        data={result}
        keyExtractor={item => item.id}
        renderItem={({ item }: { item: Joke }) => {
          return (
            <Card>
              <Card.Content>
                <Paragraph>{item.value}</Paragraph>
              </Card.Content>
              <CardActions>
                <FavoriteButton
                  icon="star-four-points-outline"
                  size={25}
                  onPress={() => alert('pressed')}
                />
              </CardActions>
            </Card>
          );
        }}
      />
    </Container>
  );
};

export default JokesList;
