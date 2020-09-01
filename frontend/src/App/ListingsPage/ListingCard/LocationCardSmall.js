import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import FavoritingButton from './FavoritingButton';
import CardInfoSmall from './CardInfoSmall';

const LocationCardWithInfo = ({
  listings,
  setCardMarkerHover,
  resetCardMarkerHover,
  hoveredCardId,
}) => {
  return (
    <Grid container spacing={2}>
      {listings.map((listing, index) => {
        return (
          <S.GridCard
            item
            onMouseEnter={(e) => setCardMarkerHover(listing.id)}
            onMouseLeave={(e) => resetCardMarkerHover()}
          >
            <CardInfoSmall listing={listing} arrows={hoveredCardId === listing.id} big />
            <S.DivFavoritingButton>
              <FavoritingButton listing={listing} favorites={[]} color={'#fff'} />
            </S.DivFavoritingButton>
          </S.GridCard>
        );
      })}
    </Grid>
  );
};

const S = {
  GridCard: styled(Grid)`
    flex-grow: 0;
    position: relative;

    @media (min-width: 744px) {
      max-width: 50%;
      flex-basis: 50%;
    }
    @media (min-width: 1128px) {
      max-width: 25%;
      flex-basis: 25%;
    }
    @media (min-width: 1440px) {
      max-width: 20%;
      flex-basis: 20%;
    }
  `,

  DivFavoritingButton: styled.div`
    position: absolute !important;
    right: 0px !important;
    top: 0px !important;
    padding: 16px;
    z-index: 11;
  `,
};

export default LocationCardWithInfo;
