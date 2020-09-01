import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Place from '@material-ui/icons/Place';

const SearchAutoComplete = ({
  value,
  onChange,
  onSelect,
  handleError,
  country,
  ...props
}) => {
  return (
    <PlacesAutocomplete
      highlightFirstSuggestion
      {...props}
      value={value}
      onChange={onChange}
      onSelect={(address) => onSelect(address, geocodeByAddress, getLatLng)}
      onError={handleError}
      searchOptions={{
        componentRestrictions: { country: country },
        // https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingAddressTypes
        types: ['address'],
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div style={{ position: 'relative' }}>
          {React.Children.map(props.children, (child) =>
            React.cloneElement(child, {
              ...getInputProps({ ...props }),
            })
          )}
          {Boolean(suggestions.length) && (
            <List
              style={{
                borderBottom: 'honeydew',
                borderLeft: 'honeydew',
                borderRight: 'honeydew',
                borderTop: '1px solid #e6e6e6',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                borderRadius: '0 0 2px 2px',
                position: 'absolute',
                zIndex: '121',
                width: '100%',
                backgroundColor: '#ffffff',
              }}
            >
              {loading && (
                <ListItem>
                  <ListItemText primary="Loading..." />
                </ListItem>
              )}
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <ListItem
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                  >
                    <ListItemIcon>
                      <Place />
                    </ListItemIcon>
                    <ListItemText primary={suggestion.description} />
                  </ListItem>
                );
              })}
            </List>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default SearchAutoComplete;
