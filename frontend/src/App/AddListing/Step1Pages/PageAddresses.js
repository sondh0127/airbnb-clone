import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import countryList from 'react-select-country-list';
import { Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';

import { S } from '../AddListingStyled';
import FormikPlaceSearch from '../FormikPlaceSearch';

const options = countryList().getData();

class PageAddresses extends Component {
  render() {
    const { errors, values } = this.props;
    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Where’s your place located?
          </Typography>
        </S.WrapperHeader>
        <S.WrapperText1>
          <Typography variant="body1">
            Guests will only get your exact address once they’ve booked a reservation.
          </Typography>
        </S.WrapperText1>
        <div>
          <div>
            <S.WrapperSelection1>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <S.WrapperLabel2>
                    <S.TypographyH6 variant="h6">Country / Region</S.TypographyH6>
                  </S.WrapperLabel2>
                  <S.WrapperSelection3>
                    <Field
                      name="country"
                      type="select"
                      component={Select}
                      native
                      fullWidth
                      error={Boolean(errors.country)}
                      input={<OutlinedInput id="country" name="country" labelWidth={0} />}
                    >
                      <option value={0}>Select country</option>
                      {options.map(({ value, label }, index) => (
                        <option key={index} value={value}>
                          {label}
                        </option>
                      ))}
                    </Field>
                  </S.WrapperSelection3>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <S.WrapperLabel2>
                    {/* make sure It looks like this isn’t an accurate address */}
                    <S.TypographyH6 variant="h6">Street Address</S.TypographyH6>
                  </S.WrapperLabel2>
                  <Field
                    name="street"
                    value={values.street}
                    component={FormikPlaceSearch}
                    country={values.country}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <S.WrapperLabel2>
                    <S.TypographyH6 variant="h6">City</S.TypographyH6>
                  </S.WrapperLabel2>
                  <Field
                    name="city"
                    type="text"
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <S.WrapperLabel2>
                    <S.TypographyH6 variant="h6">State</S.TypographyH6>
                  </S.WrapperLabel2>
                  <Field
                    name="state"
                    type="text"
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <S.WrapperLabel2>
                    <S.TypographyH6 variant="h6">ZIP Code</S.TypographyH6>
                  </S.WrapperLabel2>
                  <Field
                    name="zip_code"
                    type="text"
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </S.WrapperSelection1>
          </div>
        </div>
      </section>
    );
  }
}
export default PageAddresses;
