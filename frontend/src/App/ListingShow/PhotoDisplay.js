import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const PhotoDisplay = ({ photos, showCarousel }) => {
  return (
    <DivContainer>
      <HeaderPicsContainer>
        {photos && photos.length >= 1 && (
          <Grid container alignItems="stretch" style={{ height: '100%' }}>
            <DivPicsLarge item xs={6}>
              <ImgPic src={photos[0].url} />
            </DivPicsLarge>
            {photos[1] && (
              <DivPicsSmall
                item
                xs
                container
                direction="column"
                style={{ borderRight: '1px solid #484848' }}
              >
                <DivPicContainer item xs>
                  <ImgPic src={photos[1].url} alt="photo2" />
                </DivPicContainer>
                {photos[2] && (
                  <DivPicContainer item xs>
                    <ImgPic src={photos[2].url} alt="photo3" />
                  </DivPicContainer>
                )}
              </DivPicsSmall>
            )}
            {photos[3] && (
              <DivPicsSmall item xs container direction="column">
                <DivPicContainer item xs>
                  <ImgPic src={photos[3].url} alt="photo4" />
                </DivPicContainer>
                {photos[4] && (
                  <DivPicContainer item xs>
                    <ImgPic src={photos[2].url} alt="photo5" />
                  </DivPicContainer>
                )}
              </DivPicsSmall>
            )}
          </Grid>
        )}
      </HeaderPicsContainer>
      <DivViewButton>
        <ButtonFeature type="button" onClick={showCarousel}>
          <span>View Photos</span>
        </ButtonFeature>
      </DivViewButton>
      <DivSaveButton>
        <ButtonFeature type="button">
          <DivTableSaveButton>
            <DivCellSaveButton>
              <div style={{ marginRight: '12px' }}>
                <svg
                  viewBox="0 0 32 32"
                  fill="#484848"
                  fillOpacity="0"
                  stroke="#484848"
                  strokeWidth="1.5"
                  focusable="false"
                  aria-hidden="true"
                  role="presentation"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    height: '15px',
                    width: '15px',
                    display: 'block',
                    overflow: 'visible',
                  }}
                >
                  <path d="m23.99 2.75c-.3 0-.6.02-.9.05-1.14.13-2.29.51-3.41 1.14-1.23.68-2.41 1.62-3.69 2.94-1.28-1.32-2.46-2.25-3.69-2.94-1.12-.62-2.27-1-3.41-1.14a7.96 7.96 0 0 0 -.9-.05c-1.88 0-7.26 1.54-7.26 8.38 0 7.86 12.24 16.33 14.69 17.95a1 1 0 0 0 1.11 0c2.45-1.62 14.69-10.09 14.69-17.95 0-6.84-5.37-8.38-7.26-8.38" />
                </svg>
              </div>
            </DivCellSaveButton>
            <DivCellSaveButton>Save</DivCellSaveButton>
          </DivTableSaveButton>
        </ButtonFeature>
      </DivSaveButton>
    </DivContainer>
  );
};

PhotoDisplay.propTypes = {
  showCarousel: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
};

const DivContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffffff;
  cursor: pointer;
`;

const HeaderPicsContainer = styled.header`
  align-items: center;
  display: flex;
  flex_direction: row;
  overflow: hidden;
  background: #484848;
  height: 592px;
  height: 63vh;
  &:hover img {
    opacity: 0.7;
  }
`;

const DivPicsLarge = styled(Grid)`
  //width: 50%;
  background-color: #484848;
  border-right: solid 1px #484848;
  border-bottom: solid 0.4px #484848;
`;

const DivPicsSmall = styled(Grid)`
  height: 100%;
  //width: 25%;
  flex_direction: column;
  position: relative;
  overflow: hidden;
`;

const DivPicContainer = styled(Grid)`
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  background-color: #484848;
  position: relative;
  //height: 100%;
  border: solid 0.4px #484848;
`;

const ImgPic = styled.div`
  display: inline-block;
  left: 0px;
  transform: scale(1);
  opacity: 1;
  width: 100%;
  height: 100%;
  background-size: cover;
  ${(props) => (props.src ? `background-image: url("${props.src}")` : null)};
  transition: transform 450ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s,
    opacity 450ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  &:hover {
    opacity: 1 !important;
    transform: scale(1.1);
    transition: transform 450ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }
`;

const DivViewButton = styled.div`
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
  position: absolute;
  left: auto;
  right: 24px;
  bottom: 24px;
  transform: translateY(0);
  z-index: 1;
`;
const ButtonFeature = styled.button`
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: normal;
  padding-top: 6px;
  padding-bottom: 6px;
  font-weight: 600;
  border-width: 1px;
  padding-left: 15px;
  padding-right: 15px;
  background: #ffffff;
  border-color: transparent;
  color: #484848;
`;

const DivSaveButton = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 1;
  /* If have share button add a div between  */
  white-space: nowrap;
  line-height: 0;
  display: inline-block;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
  border-radius: 4px;
`;

const DivTableSaveButton = styled.div`
  display: table;
  white-space: nowrap;
  line-height: 0;
  margin: 0px auto;
`;

const DivCellSaveButton = styled.div`
  display: inline-block;
  display: table-cell;
  vertical-align: middle;
`;
export default PhotoDisplay;
