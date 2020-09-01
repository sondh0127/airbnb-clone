import React from 'react';
import styled from 'styled-components';
import svg from './Svg';

const PhotoCarouselSlider = (props) => {
  const isRight = props.type === 'right';
  return (
    <ButtonCarouselSlider
      right={isRight}
      type="button"
      aria-label="Previous"
      onClick={() => props.handleSlider(isRight ? 1 : -1)}
    >
      {isRight ? svg.Right : svg.Left}
    </ButtonCarouselSlider>
  );
};

const ButtonCarouselSlider = styled.button`
  cursor: pointer !important;
  position: absolute !important;
  top: 0px !important;
  height: 100% !important;
  z-index: 3 !important;
  font-size: 0.5em !important;
  width: 40px !important;
  ${(props) => (props.right ? 'right: 0px' : 'left: 0px')};
  background: none !important;
  border-width: 0px !important;
  border-style: initial !important;
  border-color: initial !important;
  border-image: initial !important;
  width: 75px !important;
  font-size: medium !important;
  outline: none;
`;
export default PhotoCarouselSlider;
