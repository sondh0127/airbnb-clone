import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

import PricePhotoSlider from './PricePhotoSlider.svg';
import ControlButton from './ControlButton';
import { connect } from 'react-redux';
import { useStyles } from './PopoverStyles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const calculateAVGPrice = (listings) => {
  const sum = listings.reduce((total, listing) => total + listing.price, 0);
  return Math.round(sum / listings.length);
};

const minMax = (listings) => {
  const items = listings.map((listing) => listing.price);
  return items.reduce(
    (accumulator, currentValue) => {
      return [
        Math.min(currentValue, accumulator[0]),
        Math.max(currentValue, accumulator[1]),
      ];
    },
    [Number.MAX_VALUE, Number.MIN_VALUE]
  );
};

const PriceFilter = ({ listings, formikProps }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [priceValue, setPriceValue] = useState([minPrice, maxPrice]);
  const avgPrice = calculateAVGPrice(listings);

  const initPrice = (listings) => {
    const rangePrice = minMax(listings);
    setMinPrice(rangePrice[0]);
    setMaxPrice(rangePrice[1]);
    setPriceValue(rangePrice);
  };

  const submitAble = priceValue[0] !== minPrice || priceValue[1] !== maxPrice;

  useEffect(() => {
    initPrice(listings);
    return () => {};
  }, [formikProps.values.location]);

  const initLabel = 'Price';
  const [typesLabel, setTypesLabel] = useState(initLabel);

  const [buttonActive, setButtonActive] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const classes = useStyles();

  const handleClick = (event) => {
    setButtonActive(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (priceValue[0] !== minPrice && priceValue[1] !== maxPrice) {
      setTypesLabel(`$${priceValue[0]}-$${priceValue[1]}`);
    } else if (priceValue[0] !== minPrice) {
      setTypesLabel(`$${priceValue[0]}+`);
    } else if (priceValue[1] !== maxPrice) {
      setTypesLabel(`Up to $${priceValue[1]}`);
    } else {
      setTypesLabel(initLabel);
      setButtonActive(false);
    }
    formikProps.handleSubmit();
    setAnchorEl(null);
  };
  const onSliderChange = (value) => {
    setPriceValue(value);
    formikProps.setFieldValue('price_range', value);
  };

  return (
    <div className={classes.FilterPopup}>
      <Button
        className={buttonActive ? classes.active : classes.inactive}
        onClick={handleClick}
        variant="outlined"
      >
        {typesLabel}
      </Button>
      <Popover
        id="dates-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.popover}
        PaperProps={{ classes: { root: classes.rightPaper } }}
        BackdropProps={{
          classes: {
            root: classes.backDropStyling,
          },
        }}
      >
        <Card className={classes.card}>
          <CardContent className={classes.cardcontent}>
            <>
              <S.Range>
                <S.Row>
                  <S.PriceNightTitle>
                    {'The average nightly price is '} ${avgPrice}
                  </S.PriceNightTitle>
                </S.Row>
                <S.SliderContent>
                  <S.ImgSlider src={PricePhotoSlider} alt="" />
                  <S.SliderContainer>
                    <Range
                      defaultValue={[minPrice, maxPrice]}
                      min={minPrice}
                      max={maxPrice}
                      onChange={onSliderChange}
                      style={{ color: '#484848' }}
                      value={priceValue}
                    />
                  </S.SliderContainer>
                </S.SliderContent>
                <S.TypographyInterval>{`$${priceValue[0]} — $${
                  priceValue[1]
                }+`}</S.TypographyInterval>
              </S.Range>
              <ControlButton
                handleApply={handleClose}
                handleClear={() => initPrice()}
                isShowClear={submitAble}
              />
            </>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
};

const S = {
  Range: styled.div`
    width: 300px;
    margin-bottom: 16px;
  `,

  TypographyInterval: styled(Typography)`
    margin: 16px 0;
    text-align: center;
  `,

  Row: styled.div`
    display: flex;
  `,

  PriceNightTitle: styled.p`
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.28571em;
  `,

  SliderContent: styled.div`
    width: 88% !important;
    margin: 16px auto !important;
    position: relative;
  `,

  ImgSlider: styled.img`
    width: 100%;
  `,

  SliderContainer: styled.div`
    width: 100%;
    position: absolute;
    bottom: 0px;
  `,
};
const mapStateToProps = (state) => ({
  listings: state.ListingReducer.listings,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceFilter);
