import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GoogleMapReact from 'google-map-react';
import { bootstrapURLKeys } from '../../../shared/mapConfig';
import countryList from 'react-select-country-list';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { S, Svg } from '../AddListingStyled';

class PageLocation extends Component {
  static propTypes = {};

  state = {
    draggable: false,
    zoom: 15,
  };

  getDefaultCenter = async (address) => {
    try {
      let results = await geocodeByAddress(address);
      let latLng = await getLatLng(results[0]);
      return latLng;
    } catch (error) {
    }
  };

  toggleDraggable = () => {
    const { draggable, zoom } = this.state;
    let newZoom = zoom;
    if (draggable) {
      newZoom = 15;
      this.Circle.setMap(null);
    } else {
      newZoom += 1;
      this.Circle.setMap(this.map);
    }
    this.setState({ draggable: !draggable, zoom: newZoom });
  };

  static propTypes = {
    center: PropTypes.object,
    zoom: PropTypes.number,
  };
  render() {
    const { setFieldValue, values } = this.props;
    const { draggable, zoom } = this.state;
    let address = [
      values.street,
      values.city,
      values.state,
      values.zip_code,
      countryList().getLabel(values.country),
    ];
    address = [...address].filter((el) => el != null && el !== '').join(', ');

    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Is the pin in the right place?
          </Typography>
        </S.WrapperHeader>
        <div>
          <Typography variant="body1">
            If needed, you can drag the pin to adjust its location. Only confirmed guests
            will see this, so they know how to get to your place.
          </Typography>
        </div>
        <div style={{ marginTop: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <Typography variant="body1">{address}</Typography>
          </div>
          <S.WrapperMap>
            <S.WrapperMapContainer>
              <S.DivMap>
                <GoogleMapReact
                  onChange={({ zoom, center }) => {
                    this.setState({ zoom, center });
                    setFieldValue('center', center);
                  }}
                  draggable={draggable}
                  bootstrapURLKeys={bootstrapURLKeys}
                  defaultCenter={{ lat: 13.2904027, lng: 108.4265113 }}
                  center={values.center}
                  zoom={zoom}
                  hoverDistance={50}
                  options={({ ControlPosition }) => ({
                    maxZoom: 18,
                    minZoom: 12,
                    fullscreenControl: false,
                    mapTypeControl: false,
                    panControl: false,
                    streetViewControl: false,
                    zoomControl: true,
                    zoomControlOptions: {
                      position: ControlPosition.TOP_LEFT,
                    },
                    // gestureHandling: 'none',
                  })}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={async ({ map, maps }) => {
                    this.Circle = new maps.Circle({
                      strokeColor: '#00d1ba',
                      strokeOpacity: 0.9,
                      strokeWeight: 1,
                      fillColor: 'transparent',
                      fillOpacity: 0.5,
                      // map,
                      //TODO: fix on search
                      center: await this.getDefaultCenter(address),
                      radius: 250,
                    });
                    this.map = map;
                  }}
                />
              </S.DivMap>
              <S.DivMarker>{Svg.marker}</S.DivMarker>
              <S.WrapperButtonAdjust>
                <Button
                  onClick={this.toggleDraggable}
                  style={{ backgroundColor: '#fff' }}
                >
                  {draggable ? `Done` : `Adjust`}
                </Button>
              </S.WrapperButtonAdjust>
            </S.WrapperMapContainer>
          </S.WrapperMap>
          <div style={{ marginTop: 16 }}>
            {draggable && (
              <Typography variant="body2">
                To make sure your location is accurate, keep the pin inside the circle.
              </Typography>
            )}
          </div>
        </div>
      </section>
    );
  }
}
export default PageLocation;
