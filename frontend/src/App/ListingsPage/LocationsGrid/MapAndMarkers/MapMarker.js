import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles/index';
import Clear from '@material-ui/icons/Clear';
import FavoritingButton from '../../ListingCard/FavoritingButton';
import CardInfoSmall from '../../ListingCard/CardInfoSmall';
import styled from 'styled-components';

const S = {
  SpanTooltips: styled.span`
    font-weight: 800;
    align-items: center;
    font-size: 14px;
    min-height: 30px;
    min-width: 50px;
    background: #ffffff;
    border: 0.5px solid #bfbfbf;
    padding: 4px 4px;
    display: flex;
    justify-content: center;
    color: #767676;
    transform: translate(0px, -38px);
    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -12px;
      width: 0;
      height: 0;
    }
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -8px;
      width: 0px;
      height: 0px;
      border-top: 8px solid #ffffff;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
    }
  `,

  DivMarkerContainer: styled.div`
    position: absolute;
    transform: translate(-140px, calc(-100% - 8px));
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -8px;
      border-top: 8px solid #FFFFFF;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
    },
  `,

  DivContentInfo: styled.div`
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    box-shadow: 0px 2px 5px 0px rgba(72, 72, 72, 0.5);
  `,
};

S.SpanHovered = styled(S.SpanTooltips)`
  background-color: #008489;
  color: #fff;
  border: none;
  z-index: 10;
  &::after {
    content: ' ';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -4px;
    width: 0;
    height: 0;
    border-top: 8px solid #008489;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
  }
`;

const useStyles = makeStyles((theme) => ({
  markerParent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardParent: {},
  card: {
    width: 280,
    boxShadow: 'none',
    zIndex: 10,
    backgroundColor: '#fff',
  },
  closeButton: {
    color: '#f5f5f5',
    width: 35,
    height: 35,
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 50,
  },
  favoritingButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 16,
    zIndex: 50,
  },
}));
const MapMarker = ({
  closeAllMarkers,
  handleMarkerClick,
  hoveredCardId,
  clickedMarker,
  listing,
}) => {
  const classes = useStyles();
  const { id, price } = listing;

  const markerClickInChild = () => {
    handleMarkerClick(id);
  };

  if (id === hoveredCardId) {
    return (
      <div className={classes.markerParent}>
        <S.SpanHovered>{`$${price}`}</S.SpanHovered>
      </div>
    );
  }
  if (id === clickedMarker) {
    return (
      <S.DivMarkerContainer>
        <div className={classes.card}>
          <Clear className={classes.closeButton} onClick={closeAllMarkers} />
          <div className={classes.favoritingButton}>
            <FavoritingButton listing={listing} favorites={[]} color={'#fff'} />
          </div>
          <S.DivContentInfo>
            <CardInfoSmall listing={listing} small />
          </S.DivContentInfo>
        </div>
      </S.DivMarkerContainer>
    );
  }

  return (
    <div className={classes.markerParent} onClick={markerClickInChild}>
      <S.SpanTooltips className={classes.tooltips_span}>{`$${price}`}</S.SpanTooltips>
    </div>
  );
};

export default MapMarker;
