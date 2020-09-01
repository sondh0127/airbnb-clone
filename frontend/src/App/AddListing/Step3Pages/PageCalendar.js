import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { S } from '../AddListingStyled';
import MultiDatePicker from './MultiDatePicker';
import './calendar.css';

const PageCalendar = ({ setFieldValue, values }) => {
  return (
    <section>
      <S.WrapperHeader>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          Update your calendar
        </Typography>
      </S.WrapperHeader>
      <S.WrapperText1>
        <Typography variant="body1">Select dates to block or unblock.</Typography>
      </S.WrapperText1>
      <MultiDatePicker
        setDates={(calendar) => setFieldValue('calendar', [...calendar])}
        dates={values.calendar}
      />
    </section>
  );
};
export default PageCalendar;

PageCalendar.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};
