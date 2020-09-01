import React, { Component } from 'react';
import styled from 'styled-components';
import svg from '../Svg';

class PhotoCarouselListHeader extends Component {
  render() {
    const carouselListHideTitle = this.props.isListHidden ? 'Hide' : 'Show';
    const svgIcon = this.props.isListHidden ? svg.Hide : svg.Show;
    return (
      <DivMargin>
        <DivCarouselListHeader>
          <DivCarouselListHeaderItem>
            <div>
              {this.props.photoIdx + 1}/{this.props.photosCount}:{' '}
            </div>
            <div>{this.props.photo.caption}</div>
          </DivCarouselListHeaderItem>
          <DivCarouselListHeadItem>
            <ButtonHide onClick={this.props.toggleCarouselList}>
              <span>
                {carouselListHideTitle} photo list {svgIcon}
              </span>
            </ButtonHide>
          </DivCarouselListHeadItem>
        </DivCarouselListHeader>
      </DivMargin>
    );
  }
}
const DivMargin = styled.div`
  margin-bottom: 12px;
`;

const DivCarouselListHeader = styled.div`
  display: table !important;
  width: 100% !important;
`;

const DivCarouselListHeaderItem = styled.div`
  text-align: left !important;
  vertical-align: middle !important;
  display: table-cell !important;
  padding-left: 0px !important;
`;
const DivCarouselListHeadItem = styled.div`
  text-align: right !important;
  vertical-align: middle !important;
  display: table-cell !important;
`;

const ButtonHide = styled.button`
  outline: none;
  color: inherit !important;
  -webkit-appearance: none !important;
  cursor: pointer !important;
  text-align: left !important;
  user-select: auto !important;
  vertical-align: bottom !important;
  background: transparent !important;
  border-width: 0px !important;
  border-style: initial !important;
  border-color: initial !important;
  border-image: initial !important;
  margin: 0px !important;
  padding: 0px !important;
`;

export default PhotoCarouselListHeader;
