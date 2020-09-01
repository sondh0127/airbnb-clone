import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { WrapperTable, WrapperCell } from './Wrapper';

const NumberPicker = ({
  onPlusClick,
  onMinusClick,
  value,
  disabledMinus,
  disabledPlus, //maxGuests
}) => (
  <WrapperTable style={{ width: 120 }}>
    {/* Minus */}
    <WrapperCell textAlign="left">
      <S.Button onClick={onMinusClick} disabled={disabledMinus} type="button">
        <S.SpanContainer disabled={disabledMinus}>{Svg.minus}</S.SpanContainer>
      </S.Button>
    </WrapperCell>
    {/* Number */}
    <WrapperCell textAlign="center">
      <S.DivValue>{value}</S.DivValue>
    </WrapperCell>
    {/* Plus */}
    <WrapperCell textAlign="right">
      <S.Button onClick={onPlusClick} disabled={disabledPlus} type="button">
        <S.SpanContainer disabled={disabledPlus}>{Svg.plus}</S.SpanContainer>
      </S.Button>
    </WrapperCell>
  </WrapperTable>
);

NumberPicker.propTypes = {
  onPlusClick: PropTypes.func.isRequired,
  onMinusClick: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  disabledMinus: PropTypes.bool,
  disabledPlus: PropTypes.bool,
};

export const S = {
  Button: styled.button`
    background: transparent;
  border: ${(props) =>
    props.disabled ? '1px solid rgba(0, 132, 137, 0.3);' : '1px solid rgba(0, 132, 137);'}
  border-radius: 50%;
  box-shadow: none;
  cursor: pointer;
  display: inline-block;
  height: 32px;
  line-height: 1;
  position: relative;
  text-align: center;
  touch-action: manipulation;
  width: 32px;
  outline: none;
  `,
  DivValue: styled.div`
    color: rgb(72, 72, 72);
    line-height: 22px;
    margin: 0px;
    padding-bottom: 0px;
    padding-top: 0px;
    word-wrap: break-word;
    font-size: 16px;
    font-weight: 400;
  `,
  SpanContainer: styled.span`
  color: ${(props) => (props.disabled ? 'rgba(0, 132, 137, 0.3);' : 'rgba(0, 132, 137);')}
  font-size: 16px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  `,
  Svg: styled.svg`
    display: block;
    fill: currentcolor;
    height: 1em;
    overflow: hidden;
    width: 1em;
  `,
};

export const Svg = {
  minus: (
    <S.Svg viewBox="0 0 24 24" focusable="false">
      <rect height="2" rx="1" width="12" x="6" y="11" />
    </S.Svg>
  ),
  plus: (
    <S.Svg viewBox="0 0 24 24" focusable="false">
      <rect height="2" rx="1" width="12" x="6" y="11" />
      <rect height="12" rx="1" width="2" x="11" y="6" />
    </S.Svg>
  ),
};

export default NumberPicker;
