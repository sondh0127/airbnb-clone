import React from 'react';
import Link from '@material-ui/core/Link';
import StyledLink from '../../../shared/StyledLink';
import CardCarousel from './CardCarousel';
import Box from '@material-ui/core/Box';
import StarRating from '../../ListingShow/ListingDetail/Reviews/StarRating';
import { getTotalRating } from '../../ListingShow/ultis';
import styled from 'styled-components';

const S = {
  WrapperImage: styled.div`
    display: inline-block !important;
    vertical-align: top !important;
    width: 100% !important;
  `,

  DivFixUnderline: styled.div`
    display: inline-block;
    color: rgb(72, 72, 72) !important;
    ${(props) => (props.small ? `padding: 12px;` : null)};
  `,

  DivType: styled.div`
    height: 16px !important;
    max-height: 16px !important;
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
    font-size: 16px !important;
    font-weight: bold;
    line-height: 1.44444em !important;
    color: rgb(72, 72, 72) !important;
    display: inline-block !important;
  `,
};

const HOME_TYPES = {
  entire_place: 'Entire place',
  private_room: 'Private room',
  shared_room: 'Shared room',
};

const CardInfoSmall = ({ listing, small, arrows, big }) => {
  return (
    <Link component={StyledLink} to={`listings/${listing.id}`}>
      <S.WrapperImage>
        <CardCarousel listing={listing} arrows={arrows} small={small} big={big} />
      </S.WrapperImage>
      <S.DivFixUnderline small={small}>
        <Box mt={1} mb={1} />
        <S.DivType>
          {HOME_TYPES[listing.room_type]} {` · `}
          {listing.num_beds}
          {listing.num_beds > 1 ? ` beds` : ` bed`}
        </S.DivType>
        <S.DivName>{listing.listing_title}</S.DivName>
        <Box fontSize="body2.fontSize" fontWeight={600} mb={1}>
          {`$${listing.price}/night`}
        </Box>
        {listing.reviews && listing.reviews.length > 0 ? (
          <>
            <StarRating rating={getTotalRating(listing.reviews)} small />{' '}
            <Box component={'span'} fontSize={12}>
              {listing.reviews.length}
            </Box>
          </>
        ) : (
          <Box component={'span'} fontSize={12}>
            No reviews yet
          </Box>
        )}
      </S.DivFixUnderline>
    </Link>
  );
};

export default CardInfoSmall;
