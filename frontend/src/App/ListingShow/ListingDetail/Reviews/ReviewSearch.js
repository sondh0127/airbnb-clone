import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import svg from './Svg';
import DivWrapTable from './DivWrapTable';
import StarRating from './StarRating';

const ReviewSearch = ({ totalReviews, totalRating, filterReviews }) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    filterReviews('');
    return () => {};
  }, []);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (target) => {
    if (target.charCode === 13) {
      filterReviews(searchText);
    }
  };

  const handleSearchClose = () => {
    setSearchText('');
    filterReviews('');
  };

  return (
    <DivContainer>
      <Div2h22gn>
        <DivtotalReviews>
          <Divf8t6x1>
            <Divdjxl322>
              <Div17erhr0e>
                <Divvy3ibx>
                  <H2totalReviewsWords>
                    <SpanWord>{totalReviews} Reviews</SpanWord>
                  </H2totalReviewsWords>
                  <DivtotalReviewStars>
                    <StarRating rating={totalRating} />
                  </DivtotalReviewStars>
                </Divvy3ibx>
              </Div17erhr0e>
            </Divdjxl322>
          </Divf8t6x1>
        </DivtotalReviews>
        <Divtvh5ly1>
          <Divf8t6x1>
            <Divdjxl322>
              <Div17erhr0e>
                <Divvy3ibx>
                  <DivsearchContainer hasFocus={hasFocus}>
                    <DivSvg>
                      <DivWrapTable align="middle">{svg.search}</DivWrapTable>
                    </DivSvg>
                    <DivSearch>
                      <Inputsearch
                        onFocus={() => setHasFocus(true)}
                        onBlur={() => setHasFocus(false)}
                        type="text"
                        value={searchText}
                        placeholder="Search reviews"
                        onChange={handleSearchTextChange}
                        onKeyPress={handleKeyPress}
                      />
                      {searchText && (
                        <Div1cyay8zu>
                          <DivWrapTable align="middle">
                            <ButtonClose onClick={handleSearchClose} type="button">
                              {svg.searchClose}
                            </ButtonClose>
                          </DivWrapTable>
                        </Div1cyay8zu>
                      )}
                    </DivSearch>
                  </DivsearchContainer>
                </Divvy3ibx>
              </Div17erhr0e>
            </Divdjxl322>
          </Divf8t6x1>
        </Divtvh5ly1>
        {/* End Search Container */}
      </Div2h22gn>
    </DivContainer>
  );
};

const DivContainer = styled.div`
  margin-bottom: 12px;
  overflow: hidden;
`;

const Div2h22gn = styled.div`
  overflow: auto;
  margin-left: -8px !important;
  margin-right: -8px !important;
`;

const DivtotalReviews = styled.div`
  width: 66.6667% !important;
  float: left !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  min-height: 1px !important;
  position: relative !important;
`;

const Divf8t6x1 = styled.div`
  height: 56px !important;
`;

const Divdjxl322 = styled.div`
  display: table !important;
  position: relative !important;
  height: 100% !important;
  width: 100% !important;
`;

const Div17erhr0e = styled.div`
  display: table-cell !important;
  vertical-align: bottom !important;
`;

const Divvy3ibx = styled.div`
  padding-bottom: 4px !important;
  margin-bottom: 4px !important;
`;

const H2totalReviewsWords = styled.h2`
  color: inherit !important;
  font-size: 1em !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  margin: 0px !important;
  padding: 0px !important;
  display: inline !important;
`;

const SpanWord = styled.span`
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 24px !important;
  font-weight: bold;
  line-height: 1.25em !important;
  color: #484848 !important;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
`;

const DivtotalReviewStars = styled.div`
  display: inline-block !important;
  margin-left: 16px !important;
`;

const Divtvh5ly1 = styled.div`
  width: 32% !important;
  float: left !important;
`;

const DivsearchContainer = styled.div`
  background-color: #ffffff !important;
  margin-bottom: 8px !important;
  font-size: 14px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  color: #484848 !important;
  width: 100% !important;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: ${(props) =>
    props.hasFocus ? 'rgb(0, 132, 137)' : 'rgb(235, 235, 235)'} !important;
  border-radius: 4px !important;
`;

const DivSvg = styled.div`
  float: left !important;
  height: 34px;
`;

const DivSearch = styled.div`
  position: relative !important;
  overflow: hidden !important;
`;

const Div1cyay8zu = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  height: 100%;
`;

const Inputsearch = styled.input`
  background-color: transparent !important;
  font-size: 14px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  color: #484848 !important;
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  font-weight: 600 !important;
  padding-left: 7px !important;
  padding-right: 7px !important;
  border-width: 0px !important;
  border-style: initial !important;
  border-color: initial !important;
  border-image: initial !important;
  margin: 0px !important;

  &:focus {
    outline: none;
  }
`;

const Divq2vo16 = styled.div`
  vertical-align: middle !important;
  display: inline-block !important;
`;

const ButtonClose = styled.button`
  color: #767676 !important;
  padding-left: 7px !important;
  padding-right: 7px !important;
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  background: transparent !important;
  border-width: 0px !important;
  border-style: initial !important;
  border-color: initial !important;
  border-image: initial !important;
`;

export default ReviewSearch;
