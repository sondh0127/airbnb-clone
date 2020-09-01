import React from 'react';
import { S } from './styled';
import { Typography } from '@material-ui/core';
import StyledLink from '../../shared/StyledLink';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import StarRating from '../ListingShow/ListingDetail/Reviews/StarRating';
import { getTotalRating } from '../ListingShow/ultis';
import Grid from '@material-ui/core/Grid';
import RatingsList from '../ListingShow/ListingDetail/Reviews/RatingsList';
import Box from '@material-ui/core/Box';

const BookingItem = ({ booking, deleteBooking }) => {
  let guests = booking.guests;
  guests = guests > 1 ? `${guests} guests` : `${guests} guest`;

  const start_date = moment(booking.checkIn).format('MMMM DD YYYY');
  const end_date = moment(booking.checkOut).format('MMMM DD YYYY');

  const hideCancel = moment().isAfter(booking.checkIn, 'day');
  const imageURL =
    booking.listing.photos && booking.listing.photos.length > 0
      ? booking.listing.photos[0].url
      : '';
  return (
    <S.DivBookingItem>
      <S.DivSpotImg>
        <StyledLink to={`/listings/${booking.listingId}`}>
          <img src={imageURL} alt="Listing thumb" />
        </StyledLink>
      </S.DivSpotImg>
      <S.DivBookingInfo>
        <StyledLink to={`/listings/${booking.listingId}`}>
          <Typography variant="h4" style={{ margin: '16px 0' }}>
            {booking.listing.listing_title}
          </Typography>
        </StyledLink>
        <Typography variant="subtitle1">
          {start_date} - {end_date}
        </Typography>
        <Typography variant="subtitle1">{guests}</Typography>
        <Typography variant="h6" style={{ margin: '16px 0' }}>
          {booking.listing.street}
        </Typography>
        <Grid>
          <StarRating rating={getTotalRating(booking.reviews)} small />
          <Box component={'span'} fontSize="body2.fontSize">
            {booking.reviews.length}
          </Box>
        </Grid>
        <S.DivBookingDetail>
          <StyledLink to={`/listings/${booking.listingId}`}>Read Your Review</StyledLink>
        </S.DivBookingDetail>
        {hideCancel ? null : (
          <S.DivBookingDetail>
            <Button
              onClick={() => deleteBooking(booking.id)}
              fullWidth
              variant="contained"
              color="secondary"
            >
              Cancel Booking
            </Button>
          </S.DivBookingDetail>
        )}
      </S.DivBookingInfo>
    </S.DivBookingItem>
  );
};

export default BookingItem;
