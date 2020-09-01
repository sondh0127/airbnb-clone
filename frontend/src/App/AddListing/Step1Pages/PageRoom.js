import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from 'formik-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { S } from '../AddListingStyled';
import { Field } from 'formik';

const SFormControlLabel = withStyles({
  root: {
    paddingTop: '24px',
    paddingBottom: '0px',
    borderBottom: '0px',
    lineHeight: '22px',
    letterSpacing: 'normal',
    color: 'rgb(72, 72, 72)',
    fontWeight: 'normal',
  },
  label: {
    fontSize: '17px',
  },
})(FormControlLabel);

class PageRoom extends Component {
  render() {
    const { isSubmitting } = this.props;
    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            What kind of place are you listing?
          </Typography>
        </S.WrapperHeader>
        <div>
          <S.WrapperBody>
            <S.TypographyH6 variant="h6">What will guests have?</S.TypographyH6>
            <Field name="room_type" component={RadioGroup}>
              <SFormControlLabel
                value="entire_place"
                control={<Radio color="primary" disabled={isSubmitting} />}
                label="Entire place"
                disabled={isSubmitting}
              />
              <S.WrapperText>
                Guests have the whole place to themselves. This usually includes a
                bedroom, a bathroom, and a kitchen.
              </S.WrapperText>
              <SFormControlLabel
                value="private_room"
                control={<Radio color="primary" />}
                label="Private room"
              />
              <S.WrapperText>
                Guests have their own private room for sleeping. Other areas could be
                shared.
              </S.WrapperText>
              <SFormControlLabel
                value="shared_room"
                control={<Radio color="primary" />}
                label="Shared room"
              />
              <S.WrapperText>
                Guests sleep in a bedroom or a common area that could be shared with
                others.
              </S.WrapperText>
            </Field>
          </S.WrapperBody>
        </div>
      </section>
    );
  }
}
export default PageRoom;
