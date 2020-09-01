import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReviewText from './ReviewText';
import svg from './Svg';

const ImgHostPhoto = styled.img`
  float: left;
  position: relative;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  left: 20px;
  top: 20px;
`;

const DivSuperUser = styled.div`
  z-index: 1;
  position: relative;
  width: 0;
  height: 0;
  left: 6px;
  top: 35px;
`;

const DivReviewHeader = styled.div`
  width: 100%;
  vertical-align: top;
  margin: 0 0 15px 60px;
  position: relative;
  left: 10px;
  top: -8px;
`;

const DivHostName = styled.div`
  position: relative;
  left: 5px;
  top: 25px;
  font-weight: 600;
  color: #484848;
  margin: 0px;
  font-size: 16px;
  line-height: 22px;
`;

const DivHostTextAndDate = styled.div`
  position: relative;
  top: 0px;
  left: 75px;
  width: 570px;
`;

const DivReviewText = styled.div`
  margin-top: 16px;
  color: #484848;
  margin: 0px;
  font-size: 16px;
  line-height: 22px;
  font-weight: normal;
`;

const HostDate = styled.div`
  margin-top: 10px;
  color: #767676 !important;
`;
const HostResponse = ({
  date,
  hostResponse,
  shortenText,
  shortText,
  handleReadMoreClick,
}) => {
  const superUser = hostResponse.id % 5 === 0 ? svg.superUser : null;
  return (
    <div>
      <ImgHostPhoto src={hostResponse.host_photo} alt="ImgHostPhoto" />
      <DivSuperUser>{superUser}</DivSuperUser>
      <DivReviewHeader>
        <DivHostName>Response from {hostResponse.host_name}:</DivHostName>
      </DivReviewHeader>
      <DivHostTextAndDate>
        <DivReviewText>
          <ReviewText
            body={hostResponse.host_text}
            shortenText={shortenText}
            shortText={shortText}
            handleReadMoreClick={handleReadMoreClick}
          />
        </DivReviewText>
        <HostDate>{date}</HostDate>
      </DivHostTextAndDate>
    </div>
  );
};

HostResponse.propTypes = {
  hostResponse: PropTypes.objectOf(PropTypes.node).isRequired,
  date: PropTypes.string.isRequired,
  shortText: PropTypes.bool.isRequired,
  shortenText: PropTypes.func.isRequired,
  handleReadMoreClick: PropTypes.func.isRequired,
};

export default HostResponse;
