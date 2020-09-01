import React, { Component } from 'react';
import styled from 'styled-components';

import PhotoCarouselListItem from './PhotoCarouselListItem';
import PhotoCarouselListHeader from './PhotoCarouselListHeader';

class PhotoCarouselList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListHidden: true,
    };

    this.toggleCarouselList = this.toggleCarouselList.bind(this);
    this.handleChangePhoto = this.handleChangePhoto.bind(this);
  }

  get carouselList() {
    return this.props.carouselList.current;
  }

  animationAction() {
    return this.state.isListHidden ? 'closing' : 'opening';
  }

  componentDidMount() {
    this.carouselList.addEventListener('animationend', () => {
      const actionName = this.animationAction();
      this.carouselList.classList.remove(actionName);
    });
  }

  toggleCarouselList() {
    this.setState({
      isListHidden: !this.state.isListHidden,
    });
  }

  handleChangePhoto(target, id) {
    this.props.changePhoto(id);
  }

  render() {
    const photo = this.props.photos[this.props.photoIdx] || {};
    return (
      <DivCarouselListContainer>
        <DivMargin>
          <DivContainer>
            <DivTransition hide={this.state.isListHidden}>
              <PhotoCarouselListHeader
                photoIdx={this.props.photoIdx}
                photo={photo}
                photosCount={this.props.photos.length}
                isListHidden={this.state.isListHidden}
                toggleCarouselList={this.toggleCarouselList}
              />
              <Div1u7p6zg>
                <Divzotus7>
                  <UlCarouseList
                    hide={this.state.isListHidden}
                    ref={this.props.carouselList}
                  >
                    {this.props.photos.map((photo, idx) => (
                      <PhotoCarouselListItem
                        photo={photo}
                        id={idx}
                        key={idx}
                        changePhoto={this.handleChangePhoto}
                      />
                    ))}
                  </UlCarouseList>
                </Divzotus7>
              </Div1u7p6zg>
            </DivTransition>
          </DivContainer>
        </DivMargin>
      </DivCarouselListContainer>
    );
  }
}

const DivCarouselListContainer = styled.div`
  background-image: none !important;
  background-color: transparent !important;
  position: relative !important;
  right: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  z-index: 2 !important;
  text-align: center !important;
  color: rgb(255, 255, 255) !important;
  overflow: hidden !important;
  border-radius: 0px !important;
`;

const DivMargin = styled.div`
  margin-bottom: 24px;
`;

const DivContainer = styled.div`
  max-width: 105vh !important;
  margin-left: auto !important;
  margin-right: auto !important;
  overflow: hidden !important;
`;

const UlCarouseList = styled.ul`
  position: absolute !important;
  list-style-type: none !important;
  left: 0px !important;
  transition: -ms-transform 0.3s ease-out 0s, -webkit-transform 0.3s ease-out 0s,
    transform 0.3s ease-out 0s !important;
  margin: 0px !important;
  padding: 0px !important;

  /* animation-name: ${(props) => (props.hide ? 'slideout' : 'slidein')};
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  animation-duration: 0.5s;
  animation-delay: 0; */
`;

const DivTransition = styled.div`
  margin-left: auto !important;
  margin-right: auto !important;
  position: relative !important;
  transform: translateY(${(props) => (props.hide ? '0px' : '67px')}) !important;
  transition: -ms-transform 0.2s ease-out 0s, -webkit-transform 0.2s ease-out 0s,
    transform 0.2s ease-out 0s !important;
`;

const Div1u7p6zg = styled.div`
  position: relative !important;
  height: 67px !important;
  overflow: hidden !important;
`;

const Divzotus7 = styled.div`
  position: absolute !important;
  width: 11110px !important;
`;

export default PhotoCarouselList;
