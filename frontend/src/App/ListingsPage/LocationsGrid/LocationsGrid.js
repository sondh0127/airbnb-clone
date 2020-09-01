import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { S } from './styled';

import MapAndMarkers from './MapAndMarkers/MapAndMarkers';
import LocationCardWithInfo from '../ListingCard/LocationCardWithInfo';
import Paginate from '../../../shared/Paginate';
import LocationCardSmall from '../ListingCard/LocationCardSmall';
import Box from '@material-ui/core/Box';

const LocationsGrid = ({ listings, mapShowing }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const resultsPerPage = mapShowing ? 4 : 8;
  const pageCount = Math.ceil(listings.length / resultsPerPage);
  const total = listings.length;
  const offset = currentPage * resultsPerPage;
  const locationsSlicedDownOnPage = listings.slice(offset, offset + resultsPerPage);

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  const setCardMarkerHover = (listingId) => {
    setHoveredCardId(listingId);
  };

  const resetCardMarkerHover = () => {
    setHoveredCardId(null);
  };

  return (
    <>
      <S.WrapperInfo mapShowing={mapShowing}>
        <S.DivInfo>
          <S.DivMargin />
          <S.DivTotalHomes>
            <Typography variant="h5">{`${
              listings.length < 300 ? listings.length : `300+`
            } homes`}</Typography>
          </S.DivTotalHomes>
          <S.DivInfoBody>
            {locationsSlicedDownOnPage.length === 0 && (
              <Typography variant="subtitle2" gutterBottom>
                No results found!
              </Typography>
            )}
            {mapShowing ? (
              <LocationCardWithInfo
                setCardMarkerHover={setCardMarkerHover}
                resetCardMarkerHover={resetCardMarkerHover}
                listings={locationsSlicedDownOnPage}
                hoveredCardId={hoveredCardId}
              />
            ) : (
              <LocationCardSmall
                setCardMarkerHover={setCardMarkerHover}
                resetCardMarkerHover={resetCardMarkerHover}
                listings={locationsSlicedDownOnPage}
                hoveredCardId={hoveredCardId}
              />
            )}

            {total > resultsPerPage && (
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Paginate pageCount={pageCount} handlePageClick={handlePageChange} />
                </Grid>
                <Grid item>
                  <Box mt={1}>{`${offset + 1}- ${Math.min(
                    listings.length,
                    offset + resultsPerPage
                  )} of 
                  ${listings.length} Rentals`}</Box>
                </Grid>
              </Grid>
            )}
          </S.DivInfoBody>
        </S.DivInfo>
      </S.WrapperInfo>
      {mapShowing && (
        <S.DivMap>
          <S.DivMapInner>
            <S.DivMapInner2>
              <MapAndMarkers
                listings={locationsSlicedDownOnPage}
                hoveredCardId={hoveredCardId}
              />
            </S.DivMapInner2>
          </S.DivMapInner>
        </S.DivMap>
      )}
    </>
  );
};

export default LocationsGrid;
