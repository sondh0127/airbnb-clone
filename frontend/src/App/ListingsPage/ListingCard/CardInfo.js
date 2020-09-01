import React from 'react';
import styled from 'styled-components';
import FavoritingButton from './FavoritingButton.js';
import Link from '@material-ui/core/Link';
import StyledLink from '../../../shared/StyledLink';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { getTotalRating } from '../../ListingShow/ultis';
import StarRating from '../../ListingShow/ListingDetail/Reviews/StarRating';

const HOME_TYPES = {
  entire_place: 'Entire place',
  private_room: 'Private room',
  shared_room: 'Shared room',
};

const DISPLAY_AMENITIES = {
  wifi: 'Wifi',
  kitchen: 'Kitchen',
  washer: 'Washer',
  shampoo: 'Shampoo',
  hair_dryer: 'Hair dryer',
};

const CardInfo = ({ listing }) => {
  const displayAmentities = Object.keys(DISPLAY_AMENITIES).filter(
    (key) => listing.amenities[key]
  );
  const renderAmentities = displayAmentities.map((a) => DISPLAY_AMENITIES[a]).join(' · ');
  return (
    <S.DivInfoContentPadding>
      <S.SpanContainer>
        <Link component={StyledLink} to={`listings/${listing.id}`}>
          <S.DivFixUnderline>
            <S.DivMargin>
              <S.DivType>{HOME_TYPES[listing.room_type]}</S.DivType>
              <S.DivName>{listing.listing_title}</S.DivName>
              <S.DivRoomDevices>
                {listing.num_guests}
                {listing.num_guests > 1 ? ` guests` : ` guest`}
                <span aria-hidden="true"> · </span>
                {listing.num_bedrooms}
                {listing.num_guests > 1 ? ` bedrooms` : ` bedroom`}
                <span aria-hidden="true"> · </span> {listing.num_beds}
                {listing.num_beds > 1 ? ` beds` : ` bed`}
                <span aria-hidden="true"> · </span>
                {listing.num_bathrooms}
                {listing.num_bathrooms > 1 ? ` baths` : ` bath`}
              </S.DivRoomDevices>
              <S.DivRoomDevices>
                <S.DivFixUnderline>{renderAmentities}</S.DivFixUnderline>
              </S.DivRoomDevices>
            </S.DivMargin>
            <S.DivPrice>
              <Grid container justify="space-between">
                <Grid item>
                  <StarRating rating={getTotalRating(listing.reviews)} small />{' '}
                  <Box component={'span'} fontSize={12}>
                    {listing.reviews.length}
                  </Box>
                </Grid>
                <Grid item>
                  <Box fontSize="subtitle1.fontSize" fontWeight={600}>
                    {`$${listing.price}/night`}
                  </Box>
                </Grid>
              </Grid>
              <span />
            </S.DivPrice>
            <S.DivFavoritingButton>
              <FavoritingButton listing={listing} favorites={[]} />
            </S.DivFavoritingButton>
          </S.DivFixUnderline>
        </Link>
      </S.SpanContainer>
    </S.DivInfoContentPadding>
  );
};

const S = {
  DivInfoContentPadding: styled.div`
    height: 200px !important;
    padding: 20px 20px 16px !important;
  `,

  SpanContainer: styled.span`
    position: relative !important;
    height: 100% !important;
    width: 100% !important;
    display: inline-block !important;
  `,
  DivPrice: styled.div`
    position: absolute !important;
    bottom: 0px !important;
    width: 100%;
  `,
  DivMargin: styled.div`
    margin-bottom: 3px;
  `,
  DivType: styled.div`
    height: 16px !important;
    max-height: 16px !important;
    margin-bottom: 2px !important;
    text-transform: uppercase !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    overflow-wrap: break-word !important;
    font-size: 12px !important;
    font-weight: bold;
    line-height: 1.33333em !important;
    color: rgb(118, 118, 118) !important;
  `,

  DivName: styled.div`
    max-height: 52px !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    overflow-wrap: break-word !important;
    font-size: 18px !important;
    font-weight: bold;
    line-height: 1.44444em !important;
    color: rgb(72, 72, 72) !important;
    display: inline-block !important;
  `,
  DivRoomDevices: styled.div`
    max-height: 18px !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    overflow-wrap: break-word !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 1.28571em !important;
    color: rgb(72, 72, 72) !important;
    margin: 0px !important;
  `,
  DivFixUnderline: styled.div`
    display: inline-block;
    color: rgb(72, 72, 72) !important;
  `,

  DivFavoritingButton: styled.div`
    position: absolute !important;
    right: 0px !important;
    top: 0px !important;
    z-index: 11;
  `,
};

export default CardInfo;
