import React, { Component } from 'react';
import SearchAutoComplete from '../../shared/SearchAutoComplete';
import TextField from '@material-ui/core/TextField';

class FormikPlacesAutoComplete extends Component {
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
      this.props.form.setFieldTouched(`${this.state.name}.value`);
      this.props.form.setFieldTouched(`${this.state.name}.address`);
      this.props.form.setFieldValue(this.state.name, { value: address });
      return { address };
    });
  };

  handleSelect = (address, geocodeByAddress, getLatLng) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState(() => {
          this.props.form.setFieldValue(this.state.name, {
            value: address,
            address,
            coordinates: latLng,
          });
          return { address };
        });
      })
      .catch((error) => this.props.form.setFieldError(this.state.name, error));
  };

  render() {
    const {
      field: { name, ...field }, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      classes,
      ...props
    } = this.props;

    const error = errors[name];
    const touch = touched[name];
    return (
      <SearchAutoComplete
        name={name}
        id={name}
        {...props}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        <TextField
          type="search"
          placeholder="Anywhere"
          margin="normal"
          variant="outlined"
          fullWidth
          style={{ marginTop: '8px', marginBottom: '0px' }}
        />
      </SearchAutoComplete>
    );
  }
}

export default FormikPlacesAutoComplete;
