import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HideButton from '../HideButton';

const Spanokqgdgp = styled.span`
  font-weight: 600 !important;
  color: #484848 !important;

  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  display: inline !important;
  box-sizing: border-box;
`;
const Buttonb82bweu = styled.button`
  color: #008489 !important;
  font: inherit !important;
  text-decoration: none !important;
  -webkit-appearance: none !important;
  -webkit-font-smoothing: antialiased;
  background: transparent !important;
  border: 0px !important;
  cursor: pointer !important;
  margin: 0px !important;
  padding: 0px !important;
  user-select: auto !important;
  text-align: left !important;
`;
const SumDiv = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #484848;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
`;
const MainDiv = styled.div`
  transform: translateY(0px) !important;
  opacity: 1 !important;
  transition: -ms-transform 304ms ease-out, -webkit-transform 304ms ease-out,
    transform 304ms ease-out, opacity 304ms ease-out !important;
`;
const Div = styled.div`
  font-weight: 600 !important;
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
`;

const P = styled.p`
  margin-top: 0;
  margin-bottom: 15px;
  display: block;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
`;
const Span = styled.span`
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  font-weight: normal !important;
  display: inline !important;
  -webkit-font-smoothing: antialiased;
`;

const ButtonInLineStyle = {
  marginTop: '8px',
  marginBottom: '24px',
};

const Section = ({ ltr }) => (
  <div dir="ltr">
    <P>
      <Span>
        <Span>{ltr}</Span>
      </Span>
    </P>
  </div>
);

const Overview = ({ listing: { summary, the_space, the_availability } }) => {
  const [display, setDisplay] = useState(false);
  summary = summary.split('\n\n');
  the_space = the_space.split('\n\n');
  the_availability = the_availability.split('\n\n');

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <div id="details">
      <SumDiv className="the-intro">{summary}</SumDiv>
      <div style={{ marginTop: '16px' }}>
        <MainDiv style={{ display: display ? 'block' : 'none' }}>
          <div>
            <Div className="the-space">
              <span>The space</span>
            </Div>
            <Div className="the-space">
              {the_space.map((paragraph, idx) => (
                <Section key={idx} ltr={paragraph} />
              ))}
            </Div>
            <Div className="the-guest-access">
              <span>Guest access</span>
            </Div>
            <Div className="the-guest-access">
              {the_availability.map((paragraph, idx) => (
                <Section key={idx} ltr={paragraph} />
              ))}
            </Div>
            {/*<Div className="the-interaction-with-guests">*/}
            {/*  <span>Interaction with guests</span>*/}
            {/*</Div>*/}
            {/*<Div className="the-interaction-with-guests">*/}
            {/*  {this.props.section3.map((paragraph, idx) => (*/}
            {/*    <Section key={idx} ltr={paragraph} />*/}
            {/*  ))}*/}
            {/*</Div>*/}
            <Div className="the-other-things-to-note">
              <span>Other things to note</span>
            </Div>
            <Div className="the-other-things-to-note">
              <Section ltr={'Not added yet'} />
            </Div>
          </div>
        </MainDiv>
      </div>
      <div>
        <HideButton
          style={ButtonInLineStyle}
          onClick={toggleDisplay}
          showLabel="Read more about the space"
        />
      </div>
    </div>
  );
};
export default Overview;

Overview.propTypes = {};
