import React, { Component } from 'react';
import styled from 'styled-components';

class PhotoCarouselDisplay extends Component {
  render() {
    return (
      <DivCarouselMain>
        <DivCarouselImage>
          <Div2scij5>
            <Uljpemon>
              <Liyrgbo5>
                <span>
                  <ImageCarousel src={this.props.photo.url} alt="carousel" />
                </span>
              </Liyrgbo5>
            </Uljpemon>
          </Div2scij5>
        </DivCarouselImage>
      </DivCarouselMain>
    );
  }
}

const DivCarouselMain = styled.div`
  width: 100% !important;
  max-width: 105vh !important;
  margin: 0px auto !important;
`;

const DivCarouselImage = styled.div`
  padding-bottom: 67% !important;
  position: relative !important;
  width: 100% !important;
  height: 0px !important;
`;

const Div2scij5 = styled.div`
  position: absolute !important;
  top: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  width: 100% !important;
  height: 100% !important;
`;

const Uljpemon = styled.ul`
  position: relative !important;
  height: 100% !important;
  list-style-type: none !important;
  margin: 0px !important;
  padding: 0px !important;
`;

const ImageCarousel = styled.img`
  height: 100%;
  max-width: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: 0px auto;
  vertical-align: middle;
  border: 0px;
  opacity: 1;
  transform: translateX(0px);
  transition: opacity 150ms ease-out 0s, transform 150ms ease-out 0s;
`;

const Liyrgbo5 = styled.li`
  background-color: transparent !important;
  cursor: pointer !important;
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
  opacity: 1 !important;
  z-index: 2 !important;
  top: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  right: 0px !important;
  display: block !important;
  backface-visibility: hidden !important;
  vertical-align: bottom !important;
  text-align: center !important;
  overflow: hidden !important;
`;

export default PhotoCarouselDisplay;
