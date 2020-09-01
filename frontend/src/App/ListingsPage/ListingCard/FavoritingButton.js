import React, { Component } from 'react';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import styled from 'styled-components';

const S = {
  FavoriteButton: styled(Favorite)`
    color: rgb(255, 90, 95);
    height: 30px;
    width: 30px;
    cursor: pointer;
  `,
  EmptyFavoriteButton: styled(FavoriteBorder)`
    color: ${(props) => (props.color ? props.color : `#484848`)};
    height: 30px;
    width: 30px;
    cursor: pointer;
  `,
};
const FavoritingButton = ({
  addToFavorites,
  removeFromFavorites,
  favorites,
  listing,
  color,
}) => {
  if (favorites.filter((favorite) => favorite.pageid === listing.pageid).length > 0) {
    // return <S.FavoriteButton onClick={() => removeFromFavorites(listing)} />;
    return <S.FavoriteButton onClick={() => {}} />;
  }
  // return <S.EmptyFavoriteButton onClick={() => addToFavorites(listing)} color={color} />;
  return <S.EmptyFavoriteButton onClick={() => {}} color={color} />;
};

export default FavoritingButton;
