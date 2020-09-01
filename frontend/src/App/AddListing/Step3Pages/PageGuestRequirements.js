import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { S, Svg } from '../AddListingStyled';
import { WrapperTable, WrapperCell } from '../../../shared/UI/Wrapper';

class PageGuestRequirements extends Component {
  static propTypes = {};

  render() {
    const { values } = this.props;
    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Review Airbnb’s guest requirements
          </Typography>
        </S.WrapperHeader>
        <S.WrapperText1>
          <Typography variant="body1">
            Airbnb has requirements that all guests must meet before they book.
          </Typography>
        </S.WrapperText1>
        <div style={{ marginBottom: 30 }}>
          <S.WrapperSelection1>
            <S.TypographyH6 variant="h6">All Airbnb guests must provide:</S.TypographyH6>
          </S.WrapperSelection1>
          <WrapperTable style={{ paddingBottom: 6 }}>
            <WrapperCell style={{ paddingLeft: 8, paddingRight: 16 }}>
              {Svg.check}
            </WrapperCell>
            <WrapperCell fullWidth>
              <S.TypographyH6 variant="h6">Email address</S.TypographyH6>
            </WrapperCell>
          </WrapperTable>
          <WrapperTable style={{ paddingBottom: 6 }}>
            <WrapperCell style={{ paddingLeft: 8, paddingRight: 16 }}>
              {Svg.check}
            </WrapperCell>
            <WrapperCell fullWidth>
              <S.TypographyH6 variant="h6">Confirmed phone number</S.TypographyH6>
            </WrapperCell>
          </WrapperTable>
          <WrapperTable style={{ paddingBottom: 6 }}>
            <WrapperCell style={{ paddingLeft: 8, paddingRight: 16 }}>
              {Svg.check}
            </WrapperCell>
            <WrapperCell fullWidth>
              <S.TypographyH6 variant="h6">Payment information</S.TypographyH6>
            </WrapperCell>
          </WrapperTable>
        </div>
        <Divider />
        <div style={{ marginBottom: 30 }}>
          <S.WrapperSelection1>
            <S.TypographyH6 variant="h6">
              Before booking your home, each guest must:
            </S.TypographyH6>
          </S.WrapperSelection1>
          <WrapperTable style={{ paddingBottom: 6 }}>
            <WrapperCell style={{ paddingLeft: 8, paddingRight: 16 }}>
              {Svg.check}
            </WrapperCell>
            <WrapperCell fullWidth>
              <S.TypographyH6 variant="h6">Agree to your House Rules</S.TypographyH6>
            </WrapperCell>
          </WrapperTable>
          <WrapperTable style={{ paddingBottom: 6 }}>
            <WrapperCell style={{ paddingLeft: 8, paddingRight: 16 }}>
              {Svg.check}
            </WrapperCell>
            <WrapperCell fullWidth>
              <S.TypographyH6 variant="h6">Message you about their trip</S.TypographyH6>
            </WrapperCell>
          </WrapperTable>
          <WrapperTable style={{ paddingBottom: 6 }}>
            <WrapperCell style={{ paddingLeft: 8, paddingRight: 16 }}>
              {Svg.check}
            </WrapperCell>
            <WrapperCell fullWidth>
              <S.TypographyH6 variant="h6">
                Let you know how many guests are coming
              </S.TypographyH6>
            </WrapperCell>
          </WrapperTable>
          <WrapperTable style={{ paddingBottom: 6 }}>
            <WrapperCell style={{ paddingLeft: 8, paddingRight: 16 }}>
              {Svg.check}
            </WrapperCell>
            <WrapperCell fullWidth>
              <S.TypographyH6 variant="h6">
                Confirm their check-in time if they’re arriving within 2 days
              </S.TypographyH6>
            </WrapperCell>
          </WrapperTable>
        </div>
      </section>
    );
  }
}
export default PageGuestRequirements;
