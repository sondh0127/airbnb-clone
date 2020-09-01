import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GuestDropDownPicker from './GuestPicker/GuestDropDownPicker';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const GuestPicker = ({ guestsValues, maxGuests, hideMaxGuest, onSetGuestsCount }) => {
  const [guestDropDownActive, setGuestDropDownActive] = useState(false);
  const [state, setState] = useState(guestsValues);
  const { guests, adultsNum, childrenNum, infantsNum } = state;

  const initialGuests = {
    guests: 1,
    adultsNum: 1,
    childrenNum: 0,
    infantsNum: 0,
  };

  useEffect(() => {
    setState(guestsValues);
  }, [guestsValues]);

  const handleAddGuests = (label) => {
    const stateLabel = `${label.toLowerCase()}Num`;
    const otherLabel = stateLabel === 'adultsNum' ? 'childrenNum' : 'adultsNum';
    let labelNum = state[stateLabel];
    let newGuest = guests;
    if (stateLabel === 'infantsNum') {
      if (infantsNum < 5) {
        labelNum += 1;
      }
    } else {
      if (labelNum < maxGuests - state[otherLabel]) {
        labelNum += 1;
      }
      if (guests < maxGuests) {
        newGuest += 1;
      }
    }
    setState({ ...state, guests: newGuest, [stateLabel]: labelNum });
  };

  const handleMinusGuests = (label) => {
    const stateLabel = `${label.toLowerCase()}Num`;
    const otherLabel = stateLabel === 'adultsNum' ? 'childrenNum' : 'adultsNum';
    let labelNum = state[stateLabel];
    let { guests } = state;
    if (labelNum > 0) {
      labelNum -= 1;
    }
    if (label !== 'Infants' && guests - state[otherLabel] > 0) {
      guests -= 1;
    }
    setState({ ...state, guests, [stateLabel]: labelNum });
  };

  const handleSetGuests = () => {
    onSetGuestsCount(state);
    setGuestDropDownActive(false);
  };

  const handleOutsideClick = () => {
    if (guestDropDownActive) {
      handleSetGuests();
    }
  };

  const toggleGuestDropDown = () => {
    setGuestDropDownActive(!guestDropDownActive);
  };

  const handleClearGuests = () => {
    onSetGuestsCount(initialGuests);
  };

  return (
    <DivOuterContainer>
      <ClickAwayListener onClickAway={handleOutsideClick}>
        <DivPickerOuterContainer>
          <ButtonPicker type="button" onClick={toggleGuestDropDown}>
            <DivCellOuterContainer>
              <DivCellInnerContainer>
                <DivTableContainer>
                  <DivGuestLabelContainer>
                    <DivGuestLabelInnerContainer>
                      <SpanGuestLabel guestDropDownActive={guestDropDownActive}>
                        {guests} {guests === 1 ? 'guest' : 'guests'}
                      </SpanGuestLabel>
                      {infantsNum > 0 && (
                        <span>
                          <span>, </span>
                          <SpanGuestLabel guestDropDownActive={false}>
                            {infantsNum} {infantsNum === 1 ? 'infant' : 'infants'}
                          </SpanGuestLabel>
                        </span>
                      )}
                    </DivGuestLabelInnerContainer>
                  </DivGuestLabelContainer>
                  <DivArrowDropDownSVGContainer>
                    <SVGArrowDropDown viewBox="0 0 18 18" focusable="false">
                      <path d={guestDropDownActive ? d.up : d.down} fillRule="evenodd" />
                    </SVGArrowDropDown>
                  </DivArrowDropDownSVGContainer>
                </DivTableContainer>
              </DivCellInnerContainer>
            </DivCellOuterContainer>
          </ButtonPicker>
          {guestDropDownActive && (
            <DivOuterPicker>
              <DivInnerPicker>
                <GuestDropDownPicker
                  adultsNum={adultsNum}
                  childrenNum={childrenNum}
                  infantsNum={infantsNum}
                  guests={guests}
                  maxGuests={maxGuests || 16}
                  hideMaxGuest={hideMaxGuest && true}
                  handleMinusGuests={handleMinusGuests}
                  handleAddGuests={handleAddGuests}
                  handleSetGuests={handleSetGuests}
                  handleClearGuests={handleClearGuests}
                />
              </DivInnerPicker>
            </DivOuterPicker>
          )}
        </DivPickerOuterContainer>
      </ClickAwayListener>
    </DivOuterContainer>
  );
};

GuestPicker.propTypes = {
  maxGuests: PropTypes.number,
  onSetGuestsCount: PropTypes.func.isRequired,
  hideMaxGuest: PropTypes.bool,
};

const d = {
  up:
    'm1.71 13.71a1 1 0 1 1 -1.42-1.42l8-8a1 1 0 0 1 1.41 0l8 8a1 1 0 1 1 -1.41 1.42l-7.29-7.29z',
  down:
    'm16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z',
};

const DivOuterPicker = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
  left: 0px;
  margin-bottom: 16px;
  min-width: 280px;
  padding: 0px 16px;
  position: absolute;
  text-align: left;
  width: 100%;
  z-index: 2;
`;

const DivInnerPicker = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const DivOuterContainer = styled.div`
  margin-bottom: 16px;
`;

const DivPickerOuterContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ButtonPicker = styled.button`
  background: #ffffff;
  ${(props) =>
    props.guestDropDownActive
      ? `
  border-bottom: 2px solid rgb(0, 132, 137);
  border-color: rgb(219, 219, 219) rgb(219, 219, 219) rgb(0, 132, 137);
  border-image: initial;
  border-style: solid;
  border-width: 1px 1px 2px;
  color: black;`
      : `
  border: 1px solid #DBDBDB;
  `};
  border-radius: 2px;
  cursor: pointer;
  display: block;
  line-height: normal;
  padding: 8px;
  text-align: left;
  width: 100%;
  height: 48px;
`;

const DivCellOuterContainer = styled.div`
  margin-left: 8px;
  margin-right: 8px;
`;

const DivCellInnerContainer = styled.div`
  color: #484848;
  letter-spacing: unset;
  line-height: 22px;
  padding-bottom: 0px;
  padding-top: 0px;
  word-wrap: break-word;
`;

const DivTableContainer = styled.div`
  display: table;
  width: 100%;
`;

const DivArrowDropDownSVGContainer = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const SVGArrowDropDown = styled.svg`
  display: block;
  fill: currentcolor;
  height: 16px;
  width: 16px;
`;

const DivGuestLabelContainer = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
`;

const DivGuestLabelInnerContainer = styled.div`
  font-size: 17px;
  margin: 0;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
`;

const SpanGuestLabel = styled.span`
  display: inline-block;
  ${(props) =>
    props.guestDropDownActive &&
    `background-color: #99ede6;
  border-color: #99ede6;
  border-radius: 3px;
  color: #007a87;
  cursor: pointer;
  padding: 0.25em 0.5em;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  `}
`;

export default GuestPicker;
