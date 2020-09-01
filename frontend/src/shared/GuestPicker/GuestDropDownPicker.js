import React from 'react';
import styled from 'styled-components';
import NumberPickerWithLabel from '../UI/NumberPickerWithLabel';

const GuestDropDownPicker = ({
  adultsNum,
  childrenNum,
  infantsNum,
  guests,
  maxGuests,
  hideMaxGuest,
  handleMinusGuests,
  handleAddGuests,
  handleSetGuests,
  handleClearGuests,
}) => {
  return (
    <>
      {[
        // label, second-label/ value / disable-plus/ disable-minus
        ['Adults', '', adultsNum, guests >= maxGuests],
        ['Children', 'Ages 2 - 12', childrenNum, guests >= maxGuests],
        ['Infants', 'Under 2', infantsNum, infantsNum >= 5],
      ].map((row) => (
        <NumberPickerWithLabel
          key={`${row[0]} row key`}
          value={row[2]}
          onMinusClick={() => handleMinusGuests(row[0])}
          onPlusClick={() => handleAddGuests(row[0])}
          label={row[0]}
          secondaryLabel={row[1]}
          disabledMinus={row[2] <= 0}
          disabledPlus={row[3]}
        />
      ))}
      {/* MaxGuest details */}
      <DivTextContainer hide={hideMaxGuest}>
        <DivText>
          <span>
            {maxGuests} {maxGuests === 1 ? 'guest' : 'guests'} maximum. Infants
            don&rsquo;t count toward the number of guests.
          </span>
        </DivText>
      </DivTextContainer>
      {/* Close button */}
      <DivOuterButton>
        <DivEmptyContainer>
          <Clear type="button" onClick={handleClearGuests}>
            <span>Clear</span>
          </Clear>
        </DivEmptyContainer>
        <DivButtonOuterContainer>
          <DivButtonInnerContainer>
            <Button type="button" onClick={handleSetGuests}>
              <span>Apply</span>
            </Button>
          </DivButtonInnerContainer>
        </DivButtonOuterContainer>
      </DivOuterButton>
    </>
  );
};

const DivTextContainer = styled.div`
  margin-bottom: 16px;
  ${(props) =>
    props.hide &&
    `
    display: none;
  `};
`;

const DivText = styled.div`
  color: #484848;
  font-size: 14px;
  letter-spacing: normal;
  line-height: 18px;
  margin: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  word-wrap: break-word;
`;

const DivOuterButton = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  line-height: 0;
  text-align: justify;
`;

const DivEmptyContainer = styled.div`
  display: inline-block;
  flex-grow: 1;
  text-align: left;
  vertical-align: middle;
`;

const DivButtonOuterContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const DivButtonInnerContainer = styled.div`
  color: rgb(72, 72, 72);
  font: 500 16px;
  margin: 0px;
  line-height: 22px;
  padding-top: 0px;
  padding-bottom: 0px;
  word-wrap: break-word;
`;

const Button = styled.button`
  appearance: none;
  background: transparent;
  color: #008489;
  cursor: pointer;
  font: inherit;
  border: 0px;
  margin: 0px;
  outline: none;
  padding: 0px;
  text-align: left;
  text-decoration: none;
  user-select: auto;
  &:hover {
    text-decoration: underline;
  }
`;

const Clear = styled(Button)`
  color: #484848;
`;

export default GuestDropDownPicker;
