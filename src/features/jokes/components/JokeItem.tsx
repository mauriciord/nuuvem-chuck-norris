import { Card, CardActions, FavoriteButton } from 'features/jokes/styles';
import React, { useState, useEffect } from 'react';
import { Paragraph } from 'react-native-paper';

export type Joke = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

export type JokeItemProps = {
  item: Joke;
  onPressItem: ({ id, value }: { id: string; value: string }) => void;
  isFavorite: boolean;
  isFavoriteView?: boolean;
};

const JokeItem = ({
  item,
  onPressItem,
  isFavorite,
  isFavoriteView,
}: JokeItemProps) => {
  const { id, value } = item;
  console.log(isFavorite);

  return (
    <Card>
      <Card.Content>
        <Paragraph>{value}</Paragraph>
      </Card.Content>
      <CardActions>
        <FavoriteButton
          icon={
            isFavoriteView
              ? 'bookmark-remove'
              : isFavorite
              ? 'bookmark'
              : 'bookmark-outline'
          }
          size={25}
          onPress={() => onPressItem && onPressItem({ id, value })}
        />
      </CardActions>
    </Card>
  );
};

export default JokeItem;
