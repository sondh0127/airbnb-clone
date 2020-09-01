import React, { Component } from 'react';
import styled from 'styled-components';

import PhotoCarouselDisplay from './PhotoCarouselDisplay';
import PhotoCarouselList from './PhotoCarouselList/PhotoCarouselList';
import PhotoCarouselSlider from './PhotoCarouselSlider';
import svg from './Svg';

const WIDTH_OF_LIST_ITEM = 140;
const carouselPadding = 0.02;

// const scrollTime = 1000;
const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;

// requestAnimationFrame cross browser
const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  (() => {});

const cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame || (() => {});

class PhotoCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    this.handleHideCarousel = this.handleHideCarousel.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    this.handleSlider = this.handleSlider.bind(this);

    this._carouselList = React.createRef();
    this.animationId = null;
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (this.props.isHidden) {
        return;
      }
      const direction =
        (e.keyCode === RIGHT_ARROW_KEY_CODE && 1) ||
        (e.keyCode === LEFT_ARROW_KEY_CODE && -1) ||
        false;

      direction && this.handleSlider(direction);
    });
  }

  get carouselList() {
    return this._carouselList.current;
  }

  handleSlider(changeBy) {
    this.changePhoto(this.state.index + changeBy);
  }

  handleHideCarousel() {
    if (!this.props.isHidden) {
      this.props.hideCarousel();
    }
  }

  changePhoto(newIndex, opts) {
    if (newIndex >= this.props.photos.length) {
      newIndex = 0;
    }

    if (newIndex < 0) {
      newIndex = this.props.photos.length - 1;
    }

    this.setState(
      {
        index: newIndex,
      },
      () => {
        this.animate(this.carouselList.children[newIndex].offsetLeft);
      }
    );
  }

  getCenterOfScreen() {
    const screenWidth = window.innerWidth - window.innerWidth * carouselPadding;
    const halfOfListItem = WIDTH_OF_LIST_ITEM / 2;

    return (screenWidth - halfOfListItem) / 2;
  }

  animate(to) {
    const centerOfScreen = this.getCenterOfScreen();
    const lastScrollPosition = this.carouselList.scrollLeft;

    const centerPositionForItem = Math.floor(to - centerOfScreen);

    const scrollBy = Math.floor((centerPositionForItem - lastScrollPosition) / 10);

    this.slide(centerPositionForItem, scrollBy);
  }

  clearAnimation() {
    return cancelAnimationFrame(this.animationId);
  }

  slide(to, scrollBy) {
    const isGoingDown = scrollBy < 0;
    let lastPosition = null;

    this.clearAnimation();

    const step = () => {
      const newScrollValue = this.carouselList.scrollLeft + scrollBy;
      const maxScrollLeft = this.carouselList.scrollWidth - this.carouselList.clientWidth;

      let hasInvalidNewPosition =
        (!isGoingDown && newScrollValue >= to) || (isGoingDown && newScrollValue <= to);

      if (newScrollValue < 0 || newScrollValue >= this.getCenterOfScreen() * 2) {
        this.carouselList.scrollLeft = newScrollValue < 0 ? 0 : window.innerWidth;

        hasInvalidNewPosition = true;
      }

      if (hasInvalidNewPosition || newScrollValue >= maxScrollLeft) {
        this.carouselList.scrollLeft = to;
        this.clearAnimation();
        return;
      }

      this.carouselList.scrollLeft = newScrollValue;

      lastPosition = this.carouselList.scrollLeft;
      requestAnimationFrame(step);
    };

    this.animationId = requestAnimationFrame(step);
  }

  render() {
    const photo = this.props.photos[this.state.index] || {};

    return (
      <DivPhotoGalleryCarousel hide={this.props.isHidden} style={{ top: window.scrollY }}>
        <DivTable>
          <DivTableCell>
            <DivDialog role="dialog">
              <DivPhotoGalleryCarouselTop>
                <ButtonClose
                  type="button"
                  aria-busy="false"
                  onClick={this.props.hideCarousel}
                >
                  {svg.Close}
                </ButtonClose>
              </DivPhotoGalleryCarouselTop>
              <DivCarousel>
                <DivPaddingRow />
                <DivPhotoRow>
                  <DivPhotoContainer>
                    <PhotoCarouselSlider type="left" handleSlider={this.handleSlider} />
                    <PhotoCarouselSlider type="right" handleSlider={this.handleSlider} />
                    <PhotoCarouselDisplay photo={photo} />
                  </DivPhotoContainer>
                  <PhotoCarouselList
                    carouselList={this._carouselList}
                    photoIdx={this.state.index}
                    photos={this.props.photos}
                    changePhoto={this.changePhoto}
                  />
                </DivPhotoRow>
              </DivCarousel>
            </DivDialog>
          </DivTableCell>
        </DivTable>
      </DivPhotoGalleryCarousel>
    );
  }
}

const DivPhotoGalleryCarousel = styled.div`
  display: ${(props) => (props.hide ? 'none' : 'block')};
  background-color: rgba(0, 0, 0, 0.85) !important;
  position: fixed !important;
  z-index: 2000 !important;
  top: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  overflow-y: auto !important;
  transform: translate3d(0px, 0px, 0px) !important;
`;

const DivTable = styled.div`
  display: table !important;
  table-layout: fixed !important;
  height: 100% !important;
  width: 100% !important;
`;

const DivTableCell = styled.div`
  display: table-cell !important;
  height: 100% !important;
  width: 100% !important;
  vertical-align: middle !important;
  padding: 0px !important;
`;

const DivDialog = styled.div`
  background-color: transparent !important;
  height: 100% !important;
  max-width: 100% !important;
  position: relative !important;
  margin-left: auto !important;
  margin-right: auto !important;
  overflow: hidden !important;
  border-radius: 2px !important;
`;

const DivPhotoGalleryCarouselTop = styled.div`
  position: absolute !important;
  right: 0px !important;
  top: 0px !important;
  padding: 16px 28px 8px !important;
`;

const ButtonClose = styled.button`
    padding: 0px;
    margin: 0px;
    cursor: pointer !important;
    outline:none
    background-color: transparent !important;
    color: buttontext !important;
    display: block !important;
    border-width: 0px !important;
    border-style: initial !important;
    border-color: initial !important;
    border-image: initial !important;
}
`;

const DivCarousel = styled.div`
  display: table !important;
  width: 100% !important;
  height: 100% !important;
`;

const DivPaddingRow = styled.div`
  overflow: auto,
  display: table-row !important;
  padding: 66px 15px 20px !important;
`;

const DivPhotoRow = styled.div`
  display: table-row !important;
  height: 100% !important;
`;

const DivPhotoContainer = styled.div`
  position: relative !important;
`;
export default PhotoCarousel;
