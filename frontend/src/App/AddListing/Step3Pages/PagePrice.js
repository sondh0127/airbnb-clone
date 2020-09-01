import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { S } from '../AddListingStyled';

class PagePrice extends Component {
  static propTypes = {};

  render() {
    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Price Your Space
          </Typography>
        </S.WrapperHeader>
        <S.WrapperBody>
          <S.TypographyH6 style={{ fontWeight: 600 }}>
            Set up the same base price for each night
          </S.TypographyH6>
        </S.WrapperBody>
        <S.WrapperSubtitle style={{ marginTop: 8, marginBottom: -8 }}>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Base price
          </Typography>
        </S.WrapperSubtitle>
        {/* add smart pricing */}
        <Field
          name="price"
          type="number"
          component={TextField}
          variant="outlined"
          margin="normal"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </section>
    );
  }
}
export default PagePrice;
