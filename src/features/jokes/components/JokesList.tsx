import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import React, { useLayoutEffect, useState, useCallback } from 'react';
import { Headline } from 'react-native-paper';
import { useQueryJokes } from 'shared/hooks';

import { Container, GradientContainer, List } from '../styles';
import JokeItem, { Joke } from './JokeItem';

export const db = SQLite.openDatabase('db.db');

const JokesList = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const query = route.params.query;
  const isFeelingLucky = route.params.feelingLucky;

  const fetchDatabase = useCallback(() => {
    db.transaction(tx => {
      tx.executeSql('select id from fav_jokes', [], (_, { rows }) => {
        setFavoritesJokesId(rows._array.map(joke => joke.id));
      });
    });
  }, []);

  const [results, { normal: status }] = useQueryJokes(query, {
    isFeelingLucky,
  });

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

  useFocusEffect(() => fetchDatabase());

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
      <List
        data={results}
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
