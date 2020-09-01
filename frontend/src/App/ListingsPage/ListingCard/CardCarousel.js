import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        width: '75px',
        height: '100%',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
        backgroundImage: 'linear-gradient(to right, transparent, rgba(0,0,0,0.2))',
        display: 'flex',
        color: 'white',
        fontSize: '6em',
        right: '0px',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <ChevronRight style={{ width: '2em', height: '2em' }} />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        width: '75px',
        height: '100%',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
        backgroundImage: 'linear-gradient(to left, transparent, rgba(0,0,0,0.6))',
        display: 'flex',
        color: 'white',
        fontSize: '6em',
        left: '0px',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <ChevronLeft style={{ width: '2em', height: '2em' }} />
    </div>
  );
};
const settings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,

  appendDots: (dots) => (
    <div
      style={{
        bottom: 10,
      }}
    >
      <ul style={{ margin: '0px', padding: 0, color: 'white' }}> {dots} </ul>
    </div>
  ),
};

const CardCarousel = ({ listing, small, arrows, big }) => {
  return (
    <S.DivImageContainer>
      <S.DivImageContent>
        <Link to={`/listings/${listing.id}`}>
          <Slider {...settings} arrows={arrows}>
            {listing.photos &&
              listing.photos.length > 0 &&
              listing.photos.map((item, index) => (
                <div key={index}>
                  <S.ImageDiv src={item.url} alt="listing" small={small} big={big} />
                </div>
              ))}
          </Slider>
        </Link>
      </S.DivImageContent>
    </S.DivImageContainer>
  );
};

const S = {
  DivImageContainer: styled.div`
    contain: strict !important;
    position: relative !important;
    width: 100% !important;
    z-index: 0 !important;
    border-radius: 3px;
    overflow: hidden !important;
    padding-top: 66.6667%;
    background: rgb(216, 216, 216);
  `,

  DivImageContent: styled.div`
    position: absolute !important;
    top: 0px !important;
    bottom: 0px !important;
    left: 0px !important;
    right: 0px !important;
    height: 100% !important;
    width: 100% !important;
  `,

  DivImageWrapped: styled.div`
    height: 100% !important;
    width: 100% !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    display: inline-block !important;
    vertical-align: middle !important;
    position: relative !important;
  `,
  ImageDiv: styled.div`
    width: 300px !important;
    height: 200px !important;
    background-image: url(${(props) => props.src});
    background-size: cover;
    border-radius: 3px;
    ${(props) =>
      props.small
        ? `width: 280px !important;
    height: calc(280px/3*2) !important;`
        : null};
    ${(props) =>
      props.big
        ? `width: 333px !important;
    height: calc(333px/3*2) !important;`
        : null};
  `,
};

export default CardCarousel;
