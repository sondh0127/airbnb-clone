import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainDiv = styled.div`
  margin-top: 20px;
  font-size: 14px;
  line-height: 18px;
`;

const CostLine = styled.div`
  display: block;
`;

const TotalLine = styled.div`
  display: block;
  font-weight: bold;
`;

const Heading = styled.span`
  display: inline;
  float: none;
  width: 100px;
`;

const Price = styled.span`
  display: block;
  float: right;
  width: 50px;
`;

const MarginLine = styled.div`
  display: block;
  margin-top: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #dbdbdb;
`;

const CostSummary = ({
  endDate,
  startDate,
  costPerNight,
  serviceFeePerc,
  display,
  updateTotalCost,
}) => {
  const [state, setState] = useState({
    durationOfStay: 0,
    totalNightlyCost: 0,
    totalCost: 0,
  });

  const { durationOfStay, totalNightlyCost, totalCost } = state;

  useEffect(() => {
    const calculateTotals = () => {
      let durationOfStay = Date.parse(endDate) - Date.parse(startDate);
      durationOfStay = Math.floor(durationOfStay / 86400000);

      const totalNightlyCost = durationOfStay * costPerNight;
      let totalCost = totalNightlyCost;
      totalCost += totalNightlyCost * serviceFeePerc;

      setState({
        ...state,
        durationOfStay,
        totalNightlyCost,
        totalCost,
      });
      updateTotalCost(totalCost);
    };
    calculateTotals();
  }, [endDate, startDate]);

  return (
    <>
      {display && (
        <MainDiv>
          <CostLine>
            <Heading>
              ${costPerNight} x {durationOfStay} nights
            </Heading>
            <Price>${totalNightlyCost}</Price>
          </CostLine>
          <MarginLine />
          <CostLine>
            <Heading>Service Fee</Heading>
            <Price>${Math.floor(serviceFeePerc * totalNightlyCost)}</Price>
          </CostLine>
          <MarginLine />
          <TotalLine>
            <Heading>Total</Heading>
            <Price>${Math.round(totalCost)}</Price>
          </TotalLine>
        </MainDiv>
      )}
    </>
  );
};
export default CostSummary;
