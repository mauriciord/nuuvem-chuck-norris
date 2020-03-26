import { useNavigation, useRoute } from '@react-navigation/native';
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import { FlatList } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { useQuery } from 'react-query';
import { db } from 'services/local-database';
import { Firebase } from 'shared/constants';
import fetchWithRetries from 'shared/helpers/fetchWithRetries';

import JokeItem, { Joke } from './JokeItem';

import {
  Container,
  GradientContainer,
  Card,
  CardActions,
  FavoriteButton,
} from '../styles';

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

  const [favoritesJokesId, setFavoritesJokesId] = useState([]);

  const toggleFavorite = ({ id, value }) => {
    if (favoritesJokesId.includes(id)) {
      // then wee ned to remove from db
      db.transaction(tx => {
        tx.executeSql(`delete from fav_jokes where id = ?;`, [id]);
        tx.executeSql('select id from fav_jokes', [], (_, { rows }) =>
          setFavoritesJokesId(rows._array.map(joke => joke.id))
        );
      });
    } else {
      // then we need to add to db
      db.transaction(tx => {
        tx.executeSql(`insert into fav_jokes (id, value) values (?, ?)`, [
          id,
          value,
        ]);
        tx.executeSql('select id from fav_jokes', [], (_, { rows }) =>
          setFavoritesJokesId(rows._array.map(joke => joke.id))
        );
      });
    }
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('select id from fav_jokes', [], (_, { rows }) => {
        setFavoritesJokesId(rows._array.map(joke => joke.id));
      });
    });
  }, []);

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
        renderItem={({ item }: { item: Joke }) => (
          <JokeItem
            item={item}
            isFavorite={favoritesJokesId.includes(item.id)}
            onPressItem={({ id, value }) => toggleFavorite({ id, value })}
          />
        )}
      />
    </Container>
  );
};

export default JokesList;
