import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { S } from '../AddListingStyled';

class PageDescription extends Component {
  static propTypes = {};

  render() {
    const { values } = this.props;
    const length = 500 - values.summary.length;
    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Describe your place to guests
          </Typography>
        </S.WrapperHeader>
        <S.WrapperText1>
          <Typography variant="body1">
            Write a quick summary of your place. You can highlight what’s special about
            your space, the neighborhood, and how you’ll interact with guests.
          </Typography>
        </S.WrapperText1>
        <Field
          name="summary"
          type="text"
          component={TextField}
          placeholder="Describe the décor, light, what's nearby, etc..."
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          rowsMax={Infinity}
          fullWidth
        />
        {/* //TODO: Validation */}
        <div style={{ marginTop: '8px', marginBottom: '32px' }}>
          <Typography variant="body1">{`${length} ${
            length === 1 ? `character` : `characters`
          } remaining`}</Typography>
        </div>
        <Divider />
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Want to add more info? (optional)
          </Typography>
        </S.WrapperHeader>
        <S.WrapperText1>
          <Typography variant="body1">
            Use the additional fields below to share more details.
          </Typography>
        </S.WrapperText1>
        <S.WrapperSubtitle>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Your space
          </Typography>
          <Typography variant="body1">
            Add other details that can help set guests’ expectations for their stay.
          </Typography>
        </S.WrapperSubtitle>
        <Field
          name="the_space"
          type="text"
          component={TextField}
          placeholder="Your space"
          variant="outlined"
          margin="normal"
          multiline
          rows={2}
          rowsMax={Infinity}
          fullWidth
        />
        <S.WrapperSubtitle>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Your availability
          </Typography>
          <Typography variant="body1">
            Let guests know how available you’ll be during their stay for questions or to
            socialize. How you host is entirely up to you!
          </Typography>
        </S.WrapperSubtitle>
        <Field
          name="the_availability"
          type="text"
          component={TextField}
          placeholder="Your availability"
          variant="outlined"
          margin="normal"
          multiline
          rows={2}
          rowsMax={Infinity}
          fullWidth
        />
        <S.WrapperSubtitle>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Your neighborhood
          </Typography>
          <Typography variant="body1">
            Share what what makes your neighborhood special, like a favorite coffee shop,
            park, or a unique landmark.
          </Typography>
        </S.WrapperSubtitle>
        <Field
          name="neighborhood"
          type="text"
          component={TextField}
          placeholder="Your neighborhood"
          variant="outlined"
          margin="normal"
          multiline
          rows={2}
          rowsMax={Infinity}
          fullWidth
        />
        <S.WrapperSubtitle>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Getting around
          </Typography>
          <Typography variant="body1">
            Add info about getting around your city or neighborhood, like nearby public
            transportation, driving tips, or good walking routes.
          </Typography>
        </S.WrapperSubtitle>
        <Field
          name="the_getting_around"
          type="text"
          component={TextField}
          placeholder="Getting around"
          variant="outlined"
          margin="normal"
          multiline
          rows={2}
          rowsMax={Infinity}
          fullWidth
        />
      </section>
    );
  }
}
export default PageDescription;
