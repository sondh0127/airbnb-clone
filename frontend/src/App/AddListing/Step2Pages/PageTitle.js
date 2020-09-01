import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { S } from '../AddListingStyled';

class PageTitle extends Component {
  static propTypes = {};

  render() {
    const { values } = this.props;
    const length = 50 - values.listing_title.length;
    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Name your place
          </Typography>
        </S.WrapperHeader>
        <S.WrapperText1>
          <Typography variant="body1">
            Attract guests with a listing title that highlights what makes your place
            special.
          </Typography>
        </S.WrapperText1>
        <Field
          name="listing_title"
          type="text"
          component={TextField}
          placeholder="Listing title"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        {/* //TODO: Validation */}
        <div style={{ marginTop: '8px', marginBottom: '32px' }}>
          <Typography variant="body1">{`${length} ${
            length === 1 ? `character` : `characters`
          } remaining`}</Typography>
        </div>
      </section>
    );
  }
}
export default PageTitle;
