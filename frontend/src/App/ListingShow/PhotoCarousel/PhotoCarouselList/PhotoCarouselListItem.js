import React from 'react';
import styled from 'styled-components';

const PhotoCarouselListItem = (props) => {
  console.log(props.photo);
  const handleCarouselClick = (e) => {
    props.changePhoto(e.currentTarget, props.id);
  };
  return (
    <LiCarouselListItem onClick={handleCarouselClick}>
      <ButtonItem>
        <ImgItem src={props.photo.url} alt="pic" />
      </ButtonItem>
    </LiCarouselListItem>
  );
};

const LiCarouselListItem = styled.li`
  float: left !important;
  background-color: rgb(0, 0, 0) !important;
`;

const ButtonItem = styled.button`
  cursor: pointer;
  font-weight: inherit !important;
  opacity: 0.7 !important;
  backface-visibility: hidden !important;
  position: relative !important;
  display: inline-block !important;
  vertical-align: bottom !important;
  overflow: hidden !important;
  background: transparent !important;
  border-width: 0px !important;
  border-style: initial !important;
  border-color: initial !important;
  border-image: initial !important;
  margin: 0px !important;
  padding: 0px !important;
`;

const ImgItem = styled.img`
  width: 100px !important;
  height: 67px !important;
  vertical-align: middle;
  border: 0;
`;
export default PhotoCarouselListItem;
