import React, { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { db } from 'services/local-database';
import JokeItem, { Joke } from './JokeItem';
import { Container, GradientContainer } from '../styles';

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

  useEffect(() => fetchDatabase(), []);

  useFocusEffect(() => fetchDatabase(), []);

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
