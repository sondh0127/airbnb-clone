import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainDiv = styled.div`
  font-weight: 600 !important;
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
`;
const Button = styled.button`
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
  &:focus {
    outline: none !important;
  }
`;
const TblDiv = styled.div`
  display: table !important;
`;
const TblCellDiv = styled.div`
  display: table-cell !important;
  vertical-align: middle !important;
`;

const SpanText = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;

const ArrowDiv = styled.div`
  display: table-cell !important;
  vertical-align: middle !important;
  transition-property: -ms-transform, -webkit-transform, transform !important;
  transition-duration: 250ms !important;
  transition-timing-function: ease-in-out !important;
`;
const ButtonInLineStyle = {
  height: '10px',
  width: '10px',
  display: 'block',
  fill: 'currentColor',
};
const HideButton = ({ onClick, showLabel }) => {
  const [expanded, setExpanded] = useState(false);
  const [arrow, setArrow] = useState({ transform: 'rotate(0deg)' });

  const clickHandler = () => {
    const arrowDegree = !expanded
      ? { transform: 'rotate(180deg)' }
      : { transform: 'rotate(0deg)' };
    setExpanded(!expanded);
    setArrow(arrowDegree);
    onClick();
  };
  return (
    <div style={{ marginTop: '8px', marginBottom: '24px' }}>
      <MainDiv>
        <Button
          type="button"
          aria-expanded={expanded}
          aria-busy="false"
          onClick={clickHandler}
        >
          <TblDiv>
            <TblCellDiv>
              <SpanText>{expanded ? 'Hide' : `${showLabel}`}</SpanText>
            </TblCellDiv>
            <TblCellDiv>
              <div style={{ marginLeft: '8px' }}>
                <ArrowDiv style={arrow}>
                  <svg
                    viewBox="0 0 18 18"
                    role="presentation"
                    aria-hidden="true"
                    focusable="false"
                    style={ButtonInLineStyle}
                  >
                    <path
                      d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z"
                      fillRule="evenodd"
                    />
                  </svg>
                </ArrowDiv>
              </div>
            </TblCellDiv>
          </TblDiv>
        </Button>
      </MainDiv>
    </div>
  );
};
export default HideButton;

HideButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
