import React from 'react';
import styled from 'styled-components';
import { SVG } from './styled';

const Div1johmo39 = styled.div`
  width: 33.333333333333336% !important;
  display: inline-block !important;
  vertical-align: top !important;
  white-space: normal !important;
  flex: none !important;
  box-sizing: border-box;
`;
const Div699th3t = styled.div`
  padding-left: 8px !important;
  padding-right: 8px !important;
  padding-bottom: 0px !important;
  width: 100% !important;
  height: 100% !important;
  box-sizing: border-box;
  display: block;
`;
const Div1ocrz96 = styled.div`
  border: 1px solid #dbdbdb !important;
  border-radius: 4px !important;
  height: 100% !important;
  padding: 24px !important;
  width: 100% !important;
  box-sizing: border-box;
  display: block;
`;
const Div152qbzi = styled.div`
  margin-bottom: 24px !important;
  box-sizing: border-box;
  display: block;
`;
const Div157yfd15 = styled.div`
  font-weight: 600 !important;
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  box-sizing: border-box;
  display: block;
`;
const Div1fcn46ls = styled.div`
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  font-weight: normal !important;
  box-sizing: border-box;
  display: block;
`;
const Span14tkmhr = styled.div`
  margin-right: 8px !important;
  box-sizing: border-box;
  display: inline-block !important;
`;

const BED_TYPES = {
  double: {
    label: 'Double',
    summary: 'double bed',
    summaries: 'double beds',
  },
  queen: {
    label: 'Queen',
    summary: 'queen bed',
    summaries: 'queen beds',
  },
  single: {
    label: 'Single',
    summary: 'single bed',
    summaries: 'single beds',
  },
  sofaBed: {
    label: 'Sofa bed',
    summary: 'sofa bed',
    summaries: 'sofa beds',
  },
  king: {
    label: 'King',
    summary: 'king bed',
    summaries: 'king beds',
  },
  smallDouble: {
    label: 'Small double',
    summary: 'small double',
    summaries: 'small double beds',
  },
  couch: {
    label: 'Couch',
    summary: 'couch',
    summaries: 'couches',
  },
  bunkBed: {
    label: 'Bunk bed',
    summary: 'bunk bed',
    summaries: 'bunk beds',
  },
  floorMattress: {
    label: 'Floor mattress',
    summary: 'floor mattress',
    summaries: 'floor mattresses',
  },
  airMattress: {
    label: 'Air mattress',
    summary: 'air mattress',
    summaries: 'air mattresses',
  },
  crib: {
    label: 'Crib',
    summary: 'crib',
    summaries: 'cribs',
  },
  toddlerBed: {
    label: 'Toddler bed',
    summary: 'toddler bed',
    summaries: 'toddler beds',
  },
  hammock: {
    label: 'Hammock',
    summary: 'hammock',
    summaries: 'hammocks',
  },
  waterBed: {
    label: 'Water bed',
    summary: 'water bed',
    summaries: 'water beds',
  },
};

const getSummaryFromBeds = (beds) => {
  let total = 0;
  let summary = [];
  if (beds) {
    Object.keys(beds).forEach((type) => {
      let number = beds[type];
      total += number;
      if (number > 0) {
        summary.push(
          `${number} ${
            number === 1 ? BED_TYPES[type].summary : BED_TYPES[type].summaries
          }`
        );
      }
    });
  }
  return { total, summary: summary.join(', ') };
};
const SleepingDetails = ({ beds, roomName }) => {
  const { total, summary } = getSummaryFromBeds(beds);
  return (
    <Div1johmo39>
      <Div699th3t>
        <Div1ocrz96>
          <Div152qbzi aria-hidden="true">
            {Object.keys(beds).map((key, index) => {
              return <Span14tkmhr key={index}>{SVG[key]} </Span14tkmhr>;
            })}
          </Div152qbzi>
          <Div157yfd15>{roomName}</Div157yfd15>
          <Div1fcn46ls>{summary}</Div1fcn46ls>
        </Div1ocrz96>
      </Div699th3t>
    </Div1johmo39>
  );
};

export default SleepingDetails;
