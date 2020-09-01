import React, { Component } from 'react';
import SearchAutoComplete from '../../shared/SearchAutoComplete';
import TextField from '@material-ui/core/TextField';

class FormikPlaceSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.field.name,
      address: props.value || '',
    };
  }

  handleError = (error) => {
    this.props.form.setFieldError(this.state.name, error);
  };

  handleChange = (address) => {
    this.setState(() => {
      this.props.form.setFieldTouched(this.state.name);
      this.props.form.setFieldValue(this.state.name, address);
      return { address };
    });
  };

  handleSelect = async (address, geocodeByAddress, getLatLng) => {
    try {
      let results = await geocodeByAddress(address);
      let latLng = await getLatLng(results[0]);
      let { address_components } = results[0];
      address_components = address_components.map((item) => item.short_name);
      this.setState(() => {
        this.props.form.setValues({
          ...this.props.form.values,
          street: address_components[0] + ' ' + address_components[1],
          city: address_components[2],
          state: address_components[3],
          country: address_components[4],
          zip_code: address_components[5] || '',
          center: latLng,
        });
        return { address: address_components[0] + ' ' + address_components[1] };
      });
    } catch (error) {
      this.props.form.setFieldError(this.state.name, error);
    }
  };

  render() {
    const {
      field: { name, ...field }, // { name, value, onChange, onBlur }
      form: { isSubmitting, touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      classes,
      ...props
    } = this.props;

    const error = errors[name];
    const touch = touched[name];

    return (
      <SearchAutoComplete
        {...props}
        disabled={isSubmitting}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        <TextField
          style={{ marginTop: '8px', marginBottom: '0px' }}
          margin="normal"
          placeholder="House name/number + street/road"
          variant="outlined"
          fullWidth
        />
      </SearchAutoComplete>
    );
  }
}

export default FormikPlaceSearch;
