import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { WrapperTable, WrapperCell, WrapperBeforeAfter } from '../../shared/UI/Wrapper';

const S = {
  Container: styled.div`
    position: fixed !important;
    z-index: 111 !important;
    left: 0px !important;
    bottom: 0px !important;
    width: 100% !important;
  `,

  Wrapper: styled(WrapperBeforeAfter)`
    max-width: 912px !important;
    margin: 0px auto !important;
  `,

  Wrapper1: styled.div`
    background-color: #fff !important;
    width: ${(props) => (props.fullWidth ? `100%` : `60%`)};
    padding: 0px 30px 16px !important;
  `,

  DivMargin: styled.div`
    height: 1px !important;
    box-shadow: rgba(0, 0, 0, 0.08) 0px -1px 0px !important;
    position: relative !important;
    padding-bottom: 16px !important;
  `,

  WrapperButton: styled.div`
    height: 50px !important;
  `,

  Svg: styled.svg`
    height: 1em;
    width: 1em;
    display: block;
    fill: currentColor;
  `,
};

export class NavigationBar extends Component {
  render() {
    const { nextPage, prevPage, fullWidth, nextText, nextPath, prevPath } = this.props;
    return (
      <S.Container>
        <S.Wrapper>
          <S.Wrapper1 fullWidth={fullWidth}>
            <S.DivMargin />
            <S.WrapperButton>
              <WrapperTable fullWidth>
                <WrapperCell>
                  <Link to={prevPath} onClick={prevPage}>
                    <Button type="button" color="primary">
                      <Typography variant="subtitle1" color="primary">
                        <WrapperTable>
                          <WrapperCell>
                            <div style={{ marginRight: '8px' }}>{Svg.Back}</div>
                          </WrapperCell>
                          <WrapperCell>Back</WrapperCell>
                        </WrapperTable>
                      </Typography>
                    </Button>
                  </Link>
                </WrapperCell>
                <WrapperCell fullWidth />
                <WrapperCell>
                  <Link to={nextPath} onClick={nextPage}>
                    <Button type="button" color="primary" variant="contained">
                      <Typography variant="subtitle1" color="inherit">
                        {nextText}
                      </Typography>
                    </Button>
                  </Link>
                </WrapperCell>
              </WrapperTable>
            </S.WrapperButton>
          </S.Wrapper1>
        </S.Wrapper>
      </S.Container>
    );
  }
}

NavigationBar.propTypes = {
  fullWidth: PropTypes.bool.isRequired,
  nextPage: PropTypes.func.isRequired,
  nextPath: PropTypes.string.isRequired,
  nextText: PropTypes.string.isRequired,
  prevPage: PropTypes.func.isRequired,
  prevPath: PropTypes.string.isRequired,
};

const Svg = {
  Back: (
    <S.Svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
      <path
        d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"
        fillRule="evenodd"
      />
    </S.Svg>
  ),
};

export default NavigationBar;
