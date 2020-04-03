import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';

import { Container, GradientContainer } from '../styles';
import JokeItem, { Joke } from './JokeItem';
import { db } from './JokesList';

const JokesList = () => {
  const [favoritesJokes, setFavoritesJokes] = useState([]);

  const removeFavorite = ({ id, value }) => {
    // then wee ned to remove from db
    db.transaction(tx => {
      tx.executeSql(`delete from fav_jokes where id = ?;`, [id]);
      tx.executeSql('select * from fav_jokes', [], (_, { rows }) =>
        setFavoritesJokes(rows._array)
      );
    });
  };

  const fetchDatabase = useCallback(() => {
    db.transaction(tx => {
      tx.executeSql('select * from fav_jokes', [], (_, { rows }) => {
        setFavoritesJokes(rows._array);
      });
    });
  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists fav_jokes (id text primary key not null, value text);'
      );
    });
    fetchDatabase();
  }, []);

  useFocusEffect(() => fetchDatabase());

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
        data={favoritesJokes}
        keyExtractor={item => item.id}
        renderItem={({ item }: { item: Joke }) => (
          <JokeItem
            item={item}
            isFavoriteView
            onPressItem={({ id, value }) => removeFavorite({ id, value })}
          />
        )}
      />
    </Container>
  );
};

export default JokesList;
