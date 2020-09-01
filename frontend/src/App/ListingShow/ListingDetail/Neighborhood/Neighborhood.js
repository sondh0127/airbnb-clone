import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { bootstrapURLKeys } from '../../../../shared/mapConfig';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import HideButton from '../HideButton';

const S = {
  GridMargin: styled(Grid)`
    margin-bottom: 8px;
  `,
};

const Neighborhood = ({ listing }) => {
  const [state, setState] = useState({
    lat: 21.027763,
    lng: 105.83416,
  });
  const [hide, setHide] = useState(true);

  return (
    <>
      <Typography variant="h5" style={{ fontWeight: 800, marginBottom: 16 }}>
        The neighborhood
      </Typography>
      <S.GridMargin item>
        <Typography variant="body1">
          <strong>Feature </strong>· {listing.neighborhood}
        </Typography>
      </S.GridMargin>
      {listing.the_getting_around && listing.the_getting_around !== '' && (
        <>
          {!hide && (
            <Grid container>
              <S.GridMargin item>
                <Typography variant="body1">
                  <strong>Getting around</strong>
                </Typography>
              </S.GridMargin>
              <S.GridMargin item>
                <Typography variant="body1">{listing.the_getting_around}</Typography>
              </S.GridMargin>
            </Grid>
          )}
          <HideButton
            onClick={() => setHide(!hide)}
            showLabel="Read more about the neighborhood"
          />
        </>
      )}
      <DivMapContainer>
        <DivMap>
          <GoogleMapReact
            bootstrapURLKeys={bootstrapURLKeys}
            defaultCenter={state}
            defaultZoom={15}
            hoverDistance={50}
            center={listing.center}
            layerTypes={['TrafficLayer']}
            options={({ ControlPosition }) => ({
              fullscreenControl: false,
              mapTypeControl: false,
              panControl: false,
              streetViewControl: true,
              zoomControl: true,
              scrollwheel: false,
              zoomControlOptions: {
                position: ControlPosition.TOP_RIGHT,
              },
              gestureHandling: 'greedy',
            })}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
              new maps.Circle({
                strokeColor: '#005cd1',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: '#00d1ba',
                fillOpacity: 0.5,
                map,
                center: listing.center,
                radius: Math.sqrt(9) * 100,
              })
            }
          />
        </DivMap>
      </DivMapContainer>
    </>
  );
};

const DivMapContainer = styled.div`
  position: relative !important;
  background-color: rgb(255, 255, 255) !important;
  z-index: 0 !important;
  height: 350px !important;
`;

const DivMap = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export default Neighborhood;
