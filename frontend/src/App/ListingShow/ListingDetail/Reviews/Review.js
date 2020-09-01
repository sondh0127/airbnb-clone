import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReviewText from './ReviewText';
import HostResponse from './HostResponse';
import svg from './Svg';

const shortenText = (body) => {
  if (typeof body !== 'string') {
    const strings = [];
    let counter = 0;
    let isTooLong = false;
    body.props.children.forEach((text) => {
      if (typeof text === 'string') {
        let tempString = '';
        for (let i = 0; i < text.length; i += 1) {
          tempString += text[i];
          counter += 1;
          if (counter > 280) {
            strings.push(tempString);
            isTooLong = true;
            return;
          }
        }
        strings.push(tempString);
      } else if (!isTooLong) {
        strings.push(text);
      }
    });
    if (isTooLong) {
      return strings;
    }
    return false;
  }
  if (body.length > 280) {
    return body.substring(0, 280);
  }
  return false;
};

const month = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const Review = ({ review }) => {
  const [state, setState] = useState({ shortText: true });
  const date = review.review_date.split('/');
  const formattedDate = `${month[date[1]]} ${date[0]}`;

  const superUser =
    review.id % 5 === 0 ? <div id="superUser">{svg.superUser}</div> : null;

  const handleReadMoreClick = () => {
    setState({
      ...state,
      shortText: false,
    });
  };

  const hostResponse = review.id % 10 === 0 && (
    <div id="hostResponse">
      <HostResponse
        date={formattedDate}
        hostResponse={review}
        shortenText={shortenText}
        shortText={state.shortText}
        handleReadMoreClick={handleReadMoreClick}
      />
    </div>
  );

  return (
    <div>
      <DivTable>
        <DivCell>
          <DivPhoto>
            <ImgguestPhoto src={review.guest_photo} alt="" />
          </DivPhoto>
        </DivCell>
        <DivCell>
          <DivsuperUser>{superUser}</DivsuperUser>
        </DivCell>
        <DivCell style={{ width: '100%' }}>
          <DivreviewHeader>
            <DivguestName>{review.guest_name}</DivguestName>
            <Divdate>{formattedDate}</Divdate>
          </DivreviewHeader>
        </DivCell>
      </DivTable>
      <DivreviewText>
        <ReviewText
          body={review.body}
          shortenText={shortenText}
          shortText={state.shortText}
          handleReadMoreClick={handleReadMoreClick}
        />
      </DivreviewText>
      {/*<div>{hostResponse}</div>*/}
      <DivbottomSpace>
        <DivbottomBorder />
      </DivbottomSpace>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
};
const DivReviewContainer = styled.div``;

const DivTable = styled.div`
  display: table !important;
  width: 100% !important;
  border-spacing: 0px !important;
`;

const DivCell = styled.div`
  display: table-cell !important;
  vertical-align: top !important;
`;

const DivPhoto = styled.a`
  height: 48px;
  width: 48px;
  display: block;
  position: relative !important;
  background: transparent !important;
  cursor: pointer !important;
  user-select: auto !important;
  text-decoration: none !important;
  border-radius: 50% !important;
  overflow: hidden !important;
`;

const ImgguestPhoto = styled.img`
  vertical-align: middle;
  position: absolute !important;
`;

const DivreviewHeader = styled.div`
  margin-left: 16px;
`;

const DivguestName = styled.div`
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  line-height: 1.375em !important;
  color: #484848 !important;
`;

const DivsuperUser = styled.div`
  z-index: 1;
  position: relative;
  width: 0;
  height: 0;
  left: -15px;
  top: 23px;
`;

const Divdate = styled.span`
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 1.2857142857142858em !important;
  color: #484848 !important;
`;

const DivreviewText = styled.div`
  margin-top: 16px;
`;

const DivbottomSpace = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const DivbottomBorder = styled.div`
  border-bottom: 1px solid #dbdbdb;
`;

export default Review;
