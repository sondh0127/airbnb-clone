import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import momentPropTypes from 'react-moment-proptypes';
import styled from 'styled-components';

class DatePicker extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
  };

  handleDatesChange = (startDate, endDate) => {
    this.setState({ startDate, endDate });
    this.props.onDatesChange(startDate, endDate);
  };

  render() {
    const { startDate, endDate, minimumNights } = this.props;
    const { focusedInput } = this.state;

    return (
      <DivDatePickerContainer>
        <DateRangePicker
          onDatesChange={({ startDate, endDate }) =>
            this.handleDatesChange(startDate, endDate)
          }
          onFocusChange={(focusedInput) => this.setState({ focusedInput })}
          focusedInput={focusedInput}
          startDateId="splashStartDate"
          endDateId="splashEndDate"
          startDate={startDate}
          endDate={endDate}
          hideKeyboardShortcutsPanel
          showClearDates
          reopenPickerOnClearDates
          showDefaultInputIcon
          block
          startDatePlaceholderText="mm/dd/yyyy"
          endDatePlaceholderText="mm/dd/yyyy"
          minimumNights={minimumNights}
        />
      </DivDatePickerContainer>
    );
  }
}

DatePicker.propTypes = {
  minimumNights: PropTypes.number.isRequired,
  onDatesChange: PropTypes.func.isRequired,
};

const DivDatePickerContainer = styled.div`
  margin-bottom: 16px;
`;
export default DatePicker;
