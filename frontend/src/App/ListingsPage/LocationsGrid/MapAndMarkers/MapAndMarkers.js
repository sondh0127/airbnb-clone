import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker.js';
import { bootstrapURLKeys } from '../../../../shared/mapConfig';
import {
  DispatchContext,
  FiltersContext,
} from '../../../../store/context/filtersContext';

const MapAndMarkers = ({ listings, hoveredCardId }) => {
  const [clickedMarker, setClickedMarker] = useState(null);
  const state = useContext(FiltersContext);
  const dispatch = useContext(DispatchContext);

  const center = {
    lat:
      state.location && state.location.coordinates
        ? state.location.coordinates.lat
        : 21.0251735,
    lng:
      state.location && state.location.coordinates
        ? state.location.coordinates.lng
        : 105.84967059999997,
  };
  const openMarkerPopup = (key) => {
    setClickedMarker(key);
  };

  const closeAllMarkers = () => {
    setClickedMarker(null);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={{
          lat: 30,
          lng: -30,
        }}
        defaultZoom={0}
        hoverDistance={50}
        zoom={15}
        options={({ ControlPosition }) => ({
          fullscreenControl: false,
          mapTypeControl: false,
          panControl: false,
          streetViewControl: false,
          zoomControl: 'true',
          scrollwheel: false,
          gestureHandling: 'greedy',
          zoomControlOptions: {
            position: ControlPosition.TOP_LEFT,
          },
        })}
        center={center}
        yesIWantToUseGoogleMapApiInternals
      >
        {listings &&
          listings.length > 0 &&
          listings.map((listing, index) => (
            <MapMarker
              listing={listing}
              key={index}
              lat={listing.lat}
              lng={listing.lng}
              hoveredCardId={hoveredCardId}
              clickedMarker={clickedMarker}
              handleMarkerClick={openMarkerPopup}
              closeAllMarkers={closeAllMarkers}
            />
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapAndMarkers;
