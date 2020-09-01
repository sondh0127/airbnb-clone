import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DayPickerSingleDateController } from 'react-dates';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import moment from 'moment';
import times from 'lodash/times';

const S = {
  Button: styled.div`
    margin: 0;
    user-select: none;
    cursor: pointer;
    border: 1px solid #e4e7e7;
    background-color: #fff;
    color: #757575;
    position: absolute;
    top: 18px;
    line-height: 0.78;
    border-radius: 3px;
    padding: 9px 27px;
  `,

  Svg: styled.svg`
    height: 1em;
    width: 1em;
    display: block;
    fill: currentColor;
  `,
  PrevButton: ``,
  NextButton: ``,
  WrapperCalendar: styled.div`
    position: relative;
  `,
  ToggleBlock: styled.div`
    top: 18px;
    position: absolute;
    z-index: 1;
    right: 42px;
  `,

  ButtonToggle: styled(Button)`
    padding: 7px 27px;
  `,
};

S.PrevButton = styled(S.Button)`
  ${(props) =>
    props.disabled
      ? `opacity: 0.35;
  cursor: default;`
      : ``};
  left: 22px;
`;
S.NextButton = styled(S.Button)`
  left: 96px;
`;

const Svg = {
  prev: (
    <S.Svg viewBox="0 0 19 19" role="img" aria-label="Previous month" focusable="false">
      <path d="m14.5303297 18.1464462-.7071095.7071075-9.3535504-9.3535537 9.35355-9.3535538.7071095.7071114-8.6464463 8.6464424z" />
    </S.Svg>
  ),
  next: (
    <S.Svg viewBox="0 0 19 19" role="img" aria-label="Next month" focusable="false">
      <path d="M13.1161165,9.5L4.4696698,0.8535576l0.7071095-0.7071114L14.5303297,9.5l-9.35355,9.3535538l-0.7071095-0.7071075 L13.1161165,9.5z" />
    </S.Svg>
  ),
};

const MultiDatePicker = ({ dates, setDates }) => {
  const [daysOfMonth, setDaysOfMonth] = useState([]);

  const handleChange = (date) => {
    const newDates = dates.some((d) => d.isSame(date, 'day'))
      ? dates.filter((d) => !d.isSame(date, 'day'))
      : [...dates, date];
    setDates && setDates(newDates);
  };

  const getDaysOfMonth = (month) => {
    const days = [];
    times(moment(month).daysInMonth(), (n) => {
      const day = moment(month).date(n + 1);
      days.push(day);
    });
    return days;
  };

  const isUnblock = () => {
    let isUnblock = false;
    daysOfMonth.length > 0 &&
      daysOfMonth.forEach((day) => {
        if (!isUnblock && dates.some((d) => d.isSame(day, 'day'))) {
          isUnblock = true;
          return;
        }
      });
    return isUnblock;
  };

  const toggleBlockMonth = () => {
    let newDates = [...dates];
    daysOfMonth.forEach((day) => {
      if (!isUnblock() && !isPastDay(day)) {
        newDates = [...newDates, day];
      } else {
        newDates = newDates.filter((d) => !d.isSame(day, 'day'));
      }
    });
    setDates && setDates(newDates);
  };

  const handleMonthChange = (month) => {
    const daysOfMonth = getDaysOfMonth(month);
    setDaysOfMonth(daysOfMonth);
  };

  const isPastDay = (day) => {
    return day < moment().subtract(1, 'day');
  };
  const isMonthBlocked = () => {
    return moment(daysOfMonth[0]).startOf('month') <= moment().startOf('month');
  };

  useEffect(() => {
    handleMonthChange(moment());
  }, []);

  return (
    <S.WrapperCalendar>
      <S.ToggleBlock>
        <S.ButtonToggle variant="outlined" color="primary" onClick={toggleBlockMonth}>
          {`${isUnblock() ? `Unblock` : `Block`} this month`}
        </S.ButtonToggle>
      </S.ToggleBlock>
      <DayPickerSingleDateController
        daySize={112}
        numberOfMonths={1}
        transitionDuration={0}
        weekDayFormat="ddd"
        noBorder
        onDateChange={handleChange}
        onNextMonthClick={handleMonthChange}
        onPrevMonthClick={handleMonthChange}
        hideKeyboardShortcutsPanel
        isDayHighlighted={(day) => {
          return dates.length > 0 && dates.some((d) => d.isSame(day, 'day'));
        }}
        isDayBlocked={(day) => isPastDay(day)}
        navPrev={
          <S.PrevButton
            onClick={(event) => {
              // event.preventDefault();
              if (isMonthBlocked()) {
                event.stopPropagation();
              }
            }}
            disabled={isMonthBlocked()}
          >
            {Svg.prev}
          </S.PrevButton>
        }
        navNext={<S.NextButton>{Svg.next}</S.NextButton>}
      />
    </S.WrapperCalendar>
  );
};

export default MultiDatePicker;
