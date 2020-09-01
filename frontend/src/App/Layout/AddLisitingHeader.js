import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SvgIcon from '../../shared/UI/SvgIcon';
import { WrapperTable, WrapperCell } from '../../shared/UI/Wrapper';
import MenuDropDown from '../Header/NavLink/MenuDropDown';

const S = {
  DivHeaderContainer: styled.div`
    position: fixed !important;
    z-index: 121 !important;
    display: table;
    width: 100%;
    background: #ffffff !important;
    border-bottom: 1px solid #e4e4e4 !important;
  `,

  WrapperLogoSvg: styled.div`
    display: table-cell !important;
    height: 64px !important;
    width: 64px !important;
    position: relative !important;
    text-align: center !important;
    text-decoration: none !important;
    transition: 0.25s color !important;
    vertical-align: middle !important;
    white-space: nowrap !important;
  `,

  Svg: styled.div`
    padding: 0px 15px 0px 21px;
    color: #008489 !important;
    display: inline-block !important;
    vertical-align: middle !important;
    font-size: 34px !important;
    transition: 0.25s color !important;
  `,
};

export class AddLisitingHeader extends Component {
  static propTypes = {};

  render() {
    return (
      <S.DivHeaderContainer>
        <WrapperTable fullWidth>
          <S.WrapperLogoSvg>
            <S.Svg>{SvgIcon.BnbSvg}</S.Svg>
          </S.WrapperLogoSvg>
          <WrapperCell />
          <WrapperCell style={{ width: '4%' }}>
            <MenuDropDown />
          </WrapperCell>
        </WrapperTable>
      </S.DivHeaderContainer>
    );
  }
}

export default AddLisitingHeader;
