import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SvgIcon from '../../../shared/UI/SvgIcon';

const S = {
  LogoWrapper: styled.div`
    position: relative !important;
    z-index: 20 !important;
  `,
  WrapperLogoSvg: styled.div`
    @media (min-width: 744px) {
      height: 80px !important;
    }
    display: table-cell !important;
    height: 64px !important;
    position: relative !important;
    text-align: center !important;
    text-decoration: none !important;
    transition: 0.25s color !important;
    padding-left: 24px !important;
    padding-right: 24px !important;
    vertical-align: middle !important;
    white-space: nowrap !important;
  `,

  Wrapper2: styled.div`
    display: inline-block !important;
  `,

  WrapperSvg: styled.div`
    color: ${(props) => (props.transparent ? `#fff` : `#ff5a5f`)} !important;
    display: inline-block !important;
    vertical-align: middle !important;
    font-size: 34px !important;
    transition: 0.25s color !important;
  `,
};

const Logo = ({ isHome }) => {
  return (
    <S.LogoWrapper>
      <Link to="/">
        <S.WrapperLogoSvg>
          <S.Wrapper2>
            <S.WrapperSvg transparent={isHome}>{SvgIcon.BnbSvg}</S.WrapperSvg>
          </S.Wrapper2>
        </S.WrapperLogoSvg>
      </Link>
    </S.LogoWrapper>
  );
};

export default Logo;

Logo.propTypes = {
  isHome: PropTypes.bool.isRequired,
};
