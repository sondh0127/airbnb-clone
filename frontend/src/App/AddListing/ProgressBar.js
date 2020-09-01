import React from 'react';
import styled from 'styled-components';

import SvgIcon from '../../shared/UI/SvgIcon';
import DeterminateProgress from './DeterminateProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StyledLink from '../../shared/StyledLink';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const S = {};
S.Container = styled.div`
  position: fixed !important;
  width: 100% !important;
  overflow: hidden !important;
  z-index: 111 !important;
  background: #fff;
`;

S.Wrapper = styled.div`
  width: 100% !important;
  display: table;
`;

S.WrapperLogoSvg = styled.div`
  display: table-cell !important;
  height: 64px !important;
  width: 64px !important;
  text-align: center !important;
  text-decoration: none !important;
  vertical-align: middle !important;
  white-space: nowrap !important;
`;

S.Wrapper2 = styled.div`
  display: inline-block !important;
`;

S.WrapperSvg = styled.div`
  color: #008489 !important;
  display: inline-block !important;
  vertical-align: middle !important;
  font-size: 34px !important;
`;

S.WrapperStep = styled.div`
  display: table-cell !important;
  vertical-align: middle !important;
  height: 64px !important;
  line-height: 64px !important;
`;

S.WrapperCell = styled.div`
  display: table-cell !important;
  vertical-align: middle !important;
  width: ${(props) => `${props.width}%`};
  background-color: rgb(250, 250, 250) !important;
  bottom: -5px !important;
  margin-left: -1px !important;
  background-color: rgba(0, 0, 0, 0.08) !important;
  box-shadow: rgba(0, 0, 0, 0.08) 1px 0px 0px !important;
`;

S.DivPadding = styled.div`
  vertical-align: top !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  border-right: 1px solid rgb(220, 224, 224) !important;
  border-top: 1px solid rgb(220, 224, 224) !important;
  padding: 12px 14px !important;
  overflow: hidden !important;
  background-color: ${(props) =>
    props.isActive ? `rgba(0, 0, 0, 0.08)` : `rgb(250, 250, 250)`};
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

S.WrapperSaveButton = styled.div`
  display: table-cell !important;
  vertical-align: middle !important;
  height: 64px !important;
  line-height: 64px !important;
  width: 170px;
`;

S.WrapperStepText = styled.div`
  padding: 0px 16px !important;
`;
S.SpanText = styled.span`
  overflow-wrap: break-word !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  line-height: 1.44444em !important;
  color: rgb(72, 72, 72) !important;
  margin: 0px !important;
`;

S.TypographyH6 = styled(Typography)`
  font-weight: bold;
`;

const removeDuplicated = (arr, key = 'path') => {
  const map = new Map();
  arr.map((el) => {
    if (!map.has(el[key])) {
      map.set(el[key], el);
    }
  });
  return [...map.values()];
};

const ProgressBar = ({ title, completed, handleSubmit, isUpdate, pages, match }) => {
  const pagePaths = removeDuplicated([...pages]);
  const width = 1 / (pagePaths.length - 1);
  return (
    <S.Container>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <S.WrapperLogoSvg>
            <S.Wrapper2>
              <S.WrapperSvg>{SvgIcon.BnbSvg}</S.WrapperSvg>
            </S.Wrapper2>
          </S.WrapperLogoSvg>
          <S.WrapperStep>
            <S.WrapperStepText>
              <S.SpanText>{title}</S.SpanText>
            </S.WrapperStepText>
          </S.WrapperStep>
        </Grid>
        {isUpdate && (
          <Grid item>
            <Button onClick={handleSubmit} size="large">
              <Typography color="primary" variant="h6">
                Save and Exit
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
      {completed === 100 && (
        <S.Wrapper>
          {pagePaths.length > 0 &&
            pagePaths.map((p, index) => (
              <S.WrapperCell key={index} width={width}>
                <StyledLink to={p.path}>
                  <S.DivPadding isActive={match.params.page === p.path}>
                    <S.TypographyH6 variant="subtitle2">{p.label}</S.TypographyH6>
                  </S.DivPadding>
                </StyledLink>
              </S.WrapperCell>
            ))}
        </S.Wrapper>
      )}
      <DeterminateProgress completed={completed} />
    </S.Container>
  );
};

export default withRouter(ProgressBar);
