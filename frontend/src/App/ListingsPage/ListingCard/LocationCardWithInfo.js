import React, { useState } from 'react';
import styled from 'styled-components';
import CardCarousel from './CardCarousel.js';
import CardInfo from './CardInfo';
import Grid from '@material-ui/core/Grid';

const S = {
  WrapperCard: styled.div`
    display: inline-block !important;
    vertical-align: top !important;
    white-space: normal !important;
    width: 100% !important;
  `,
  DivPadding: styled.div`
    width: 100% !important;
    height: 100% !important;
    padding-top: 8px !important;
    padding-bottom: 12px !important;
    @media (min-width: 744px) {
      width: 100% !important;
      height: 100% !important;
      padding-left: 8px !important;
      padding-right: 8px !important;
    }
  `,

  WrapperImage: styled.div`
    position: relative !important;
    z-index: 0 !important;
    width: 300px !important;
    height: 200px !important;
  `,

  GridCardContainer: styled(Grid)`
    position: relative !important;
    color: rgb(72, 72, 72) !important;
    height: 100% !important;
    border-width: 1px !important;
    border-style: solid !important;
    border-color: rgb(235, 235, 235) !important;
    border-image: initial !important;
    border-radius: 3px !important;
    &:hover {
      box-shadow: 0px 0px 10px 0px rgba(72, 72, 72, 0.3);
      transform: scale(1.015, 1.015);
    }
  `,
};

const LocationCardWithInfo = ({
  listings,
  setCardMarkerHover,
  resetCardMarkerHover,
  hoveredCardId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      {listings.map((listing, index) => (
        <S.WrapperCard key={index}>
          <S.DivPadding>
            <S.GridCardContainer
              onMouseEnter={(e) => setCardMarkerHover(listing.id)}
              onMouseLeave={(e) => resetCardMarkerHover()}
              container
            >
              <Grid item>
                <S.WrapperImage>
                  <CardCarousel listing={listing} arrows={hoveredCardId === listing.id} />
                </S.WrapperImage>
              </Grid>
              <Grid item xs>
                <CardInfo listing={listing} />
              </Grid>
            </S.GridCardContainer>
          </S.DivPadding>
        </S.WrapperCard>
      ))}
    </>
  );
};

export default LocationCardWithInfo;
