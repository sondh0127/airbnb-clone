import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PhotoDisplay from './PhotoDisplay';
import PhotoCarousel from './PhotoCarousel/PhotoCarousel';
import ListingDetail from './ListingDetail/ListingDetail';
import Footer from '../Layout/Footer';

import { fetchListing } from '../../store/actions/ListingActions';
import { fetchReviews } from '../../store/actions/ReviewActions';
import { getBookingOfListing } from '../../store/actions/BookingActions';

const ListingShow = ({
  match,
  fetchListing,
  fetchReviews,
  history,
  listing,
  getBookingOfListing,
}) => {
  const [carouselHidden, setCarouselHidden] = useState(true);

  useEffect(() => {
    const listingId = match.params.listingsId;
    const getIdOrRedirect = async () => {
      const id = await fetchListing(listingId);
      if (!id) {
        history.push('/listings');
      } else {
        await fetchReviews(id);
        await getBookingOfListing(id);
      }
    };
    getIdOrRedirect();
  }, [match.params.listingsId]);

  const photos = listing.photos;

  const showCarousel = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    document.body.classList.add('modal-open');
    setCarouselHidden(false);
  };

  const hideCarousel = () => {
    document.body.classList.remove('modal-open');
    setCarouselHidden(true);
  };
  return (
    <>
      <MainListingShow>
        <PhotoDisplay photos={photos} showCarousel={showCarousel} />
        <PhotoCarousel
          photos={photos}
          isHidden={carouselHidden}
          hideCarousel={hideCarousel}
        />
        <DivListingDetailContainer>
          <ListingDetail listing={listing} />
        </DivListingDetailContainer>
      </MainListingShow>
      <Footer />
    </>
  );
};
const MainListingShow = styled.main`
  width: 100%;
  overflow: auto;
`;

const DivListingDetailContainer = styled.div`
  max-width: 1080px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  width: auto !important;
  padding-right: 24px !important;
  padding-left: 24px !important;
`;

const mapStateToProps = (state) => ({
  listing: state.ListingReducer.listing,
});

const mapDispatchToProps = {
  fetchListing,
  fetchReviews,
  getBookingOfListing,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingShow);
