import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const S = {
  GridMargin: styled(Grid)`
    margin-bottom: 8px;
  `,
  Avatar: styled(Avatar)`
    width: 64px;
    height: 64px;
  `,
  ALearnMore: styled.a`
    color: #008489;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  `,
};

const HostedBy = () => {
  return (
    <>
      <Grid container>
        <S.GridMargin item container justify="space-between">
          <Grid item>
            <Typography variant="h5" style={{ fontWeight: 800 }}>
              Hosted by Yanyong
            </Typography>
            <Typography variant="subtitle1">
              Bangkok, Thailand · Joined in November 2014
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Avatar
              alt="Remy Sharp"
              src="https://next.material-ui.com/static/images/avatar/1.jpg"
            />
          </Grid>
        </S.GridMargin>
        <S.GridMargin item>
          <Typography variant="subtitle1">893 Reviews Verified</Typography>
        </S.GridMargin>
        <S.GridMargin item>
          <Typography variant="body1">
            Hello, my name is Golf nice to meet you and appreciate to share my room to
            host you
          </Typography>
        </S.GridMargin>
        {/*<Grid item>Response rate: 100%</Grid>*/}
        {/*<Grid item>Response time: within an hour</Grid>*/}
        <S.GridMargin item>
          <Button variant="outlined" color="primary">
            Contact host
          </Button>
        </S.GridMargin>
      </Grid>
      <Divider />
      <Typography variant="body1">
        <strong>Always communicate through Airbnb</strong> · To protect your payment,
        never transfer money or communicate outside of the Airbnb website or app.{' '}
        <strong>
          <S.ALearnMore href="https://www.airbnb.com/help/article/199">
            Learn more
          </S.ALearnMore>
        </strong>
      </Typography>
    </>
  );
};

HostedBy.propTypes = {};

export default HostedBy;
