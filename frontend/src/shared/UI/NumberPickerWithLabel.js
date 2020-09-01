import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NumberPicker from './NumberPicker';
import { WrapperTable, WrapperCell } from './Wrapper';

const NumberPickerWithLabel = ({
  onMinusClick,
  onPlusClick,
  label,
  secondaryLabel,
  value,
  disabledMinus,
  disabledPlus,
}) => (
  <S.DivOuterContainer secondaryLabel={secondaryLabel}>
    <S.DivInnerContainer>
      <WrapperTable>
        {/* Label */}
        <WrapperCell fullWidth>
          <S.DivLabelContainer>
            <S.WrapperLabel>
              <span>{label}</span>
            </S.WrapperLabel>
            {secondaryLabel && <S.WrapperLabel2>{secondaryLabel}</S.WrapperLabel2>}
          </S.DivLabelContainer>
        </WrapperCell>
        {/* Picker */}
        <WrapperCell>
          <NumberPicker
            onPlusClick={onPlusClick}
            onMinusClick={onMinusClick}
            value={value}
            disabledMinus={disabledMinus}
            disabledPlus={disabledPlus}
          />
        </WrapperCell>
      </WrapperTable>
    </S.DivInnerContainer>
  </S.DivOuterContainer>
);

NumberPickerWithLabel.propTypes = {
  onPlusClick: PropTypes.func.isRequired,
  onMinusClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  secondaryLabel: PropTypes.string,
  value: PropTypes.number.isRequired,
  disabledMinus: PropTypes.bool,
  disabledPlus: PropTypes.bool,
};

const S = {
  DivOuterContainer: styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    ${(props) =>
      props.secondaryLabel &&
      `
      margin-top: 24px;
      margin-bottom: 24px;`}
  `,
  DivInnerContainer: styled.div`
    padding-top: 0px;
    padding-bottom: 0px;
    border-bottom: 0px;
  `,
  DivLabelContainer: styled.div`
    display: table;
    margin-right: 12px;
  `,
  WrapperLabel: styled.div`
    color: rgb(72, 72, 72);
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    padding-bottom: 0px;
    padding-top: 0px;
    margin: 0px;
    word-wrap: break-word;
  `,
  WrapperLabel2: ``,
};

S.WrapperLabel2 = styled(S.WrapperLabel)`
  color: #484848;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: normal;
  line-height: 18px;
  padding-top: 4px;
`;

export default NumberPickerWithLabel;
