import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const S = {
  DivGift: styled.div`
    width: 300px;
    height: 200px;
    background-image: url('https://a0.muscache.com/airbnb/static/account_activation/promo-c6aa8388b096405e98b4ccbb69cd14f7.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
  `,
  // Booking Item
  DivBookingItem: styled.div`
    width: 326px;
    border: 1px solid lightgray;
    margin: 20px 12px 0;
  `,

  DivSpotImg: styled.div`
    & img {
      width: 100%;
      height: 200px;
      display: block;
    }
  `,

  DivBookingInfo: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    text-align: center;
    & a {
      display: inline-block;
    }
  `,
  DivH1: styled.h1`
    padding: 30px 0;
    font-size: 26px;
    font-weight: 100;
  `,
  DivBookingDetail: styled.div`
    width: 90%;
    padding: 15px 0;
    border-bottom: 1px solid lightgrey;
  `,
};
