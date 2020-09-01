import React from 'react';
import Summary from './Overview/Summary';
import Highlights from './Overview/Highlights';
import Overview from './Overview/Overview';
import Amenities from './Amenities/Amenities';
import SleepingArrangements from './SleepingArrangements/SleepingArrangements';
import ListingAvailability from './Availability/ListingAvailability';
import ListingReview from './Reviews/ListingReview';
import BookingForm from '../BookingForm/BookingForm';
import Neighborhood from './Neighborhood/Neighborhood';
import './calendar.css';

import { S } from './styled';
import HostedBy from './HostedBy/HostedBy';
import Policies from './Policies/Policies';

const ListingDetail = ({ listing }) => {
  const hightlights = {
    hl1: 'Advanced upward-trending local area network',
    hl2: 'Reduced demand-driven conglomeration',
    hl3: 'Phased composite approach',
  };
  return (
    <S.DivDetailContainer>
      <S.DivDetailSummary>
        <>
          <Summary listing={listing} />
          {/* Need update */}
          {/*No API yet*/}
          <Highlights hightlights={hightlights} />
          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <S.DivDividerBorder />
          </div>
          <Overview listing={listing} />
          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <S.DivDividerBorder />
          </div>
          <div>
            <Amenities amenities={listing.amenities} spaces={listing.spaces} />
          </div>
          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <S.DivDividerBorder />
          </div>
          <div>
            <SleepingArrangements sleep={listing.sleeping_arrangements} />
          </div>
          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <S.DivDividerBorder />
          </div>
          <div>
            <ListingAvailability
              calendar={listing.calendar}
              minimumNights={listing.min_nights}
            />
          </div>
          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <S.DivDividerBorder />
          </div>
          <div>
            <ListingReview />
          </div>
          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <S.DivDividerBorder />
          </div>
          <div>
            <HostedBy />
          </div>
          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <S.DivDividerBorder />
          </div>
          <div>
            <Neighborhood listing={listing} />
          </div>
          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <S.DivDividerBorder />
          </div>
          <div>
            <Policies houseRules={listing.house_rules} />
          </div>
          <div style={{ marginTop: '24px', marginBottom: '24px' }}>
            <S.DivDividerBorder />
          </div>
        </>
      </S.DivDetailSummary>
      <S.DivDetailBooking>
        <S.DivBookingContainer>
          <BookingForm listing={listing} />
        </S.DivBookingContainer>
      </S.DivDetailBooking>
    </S.DivDetailContainer>
  );
};

export default ListingDetail;
