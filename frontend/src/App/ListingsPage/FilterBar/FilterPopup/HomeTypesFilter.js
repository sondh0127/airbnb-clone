import React, { useState } from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

import ControlButton from './ControlButton';
import CheckBoxWithLabelV4 from '../../../../shared/CheckBoxWithLabelV4';
import { useStyles } from './PopoverStyles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const homeTypes = {
  entire_place: ['Entire place', 'Have a place to yourself'],
  private_room: ['Private room', 'Have your own room and share some common spaces'],
  shared_room: ['Shared room', 'Stay in a shared space, like a common room'],
};
const HomeTypesFilter = ({ formikProps }) => {
  const initType = 'Type of place';
  const [typesLabel, setTypesLabel] = useState(initType);

  const [buttonActive, setButtonActive] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const classes = useStyles();

  const handleClick = (event) => {
    setButtonActive(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    handleHomeTypeSubmit();
    setAnchorEl(null);
  };

  const getIsShowClear = () => {
    const { entire_place, private_room, shared_room } = formikProps.values;
    return entire_place || private_room || shared_room;
  };

  const handleClearType = () => {
    const { setValues, values } = formikProps;
    setValues({
      ...values,
      entire_place: false,
      private_room: false,
      shared_room: false,
    });
  };

  const handleHomeTypeSubmit = () => {
    const {
      handleSubmit,
      values: { entire_place, private_room, shared_room },
    } = formikProps;
    const types = {
      [homeTypes.entire_place[0]]: entire_place,
      [homeTypes.private_room[0]]: private_room,
      [homeTypes.shared_room[0]]: shared_room,
    };
    const typesLabel = Object.keys(types).filter((key) => types[key]);
    const totalLabel = typesLabel.length;
    if (totalLabel === 0) {
      setTypesLabel(initType);
      setButtonActive(false);
    } else {
      if (totalLabel > 1) {
        setTypesLabel(initType.concat(' · ').concat(totalLabel.toString()));
      } else {
        setTypesLabel(typesLabel[0]);
      }
      setButtonActive(true);
    }
    handleSubmit();
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
              {Object.keys(homeTypes).map((key, index) => (
                <div
                  key={index}
                  style={{
                    maxWidth: 'none',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Field
                    name={key}
                    component={CheckBoxWithLabelV4}
                    color="primary"
                    label={homeTypes[key][0]}
                  />
                  <S.WrapperText>{homeTypes[key][1]}</S.WrapperText>
                </div>
              ))}
              <ControlButton
                handleApply={handleClose}
                handleClear={handleClearType}
                isShowClear={getIsShowClear()}
              />
            </>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
};

const S = {
  WrapperText: styled.div`
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: normal;
    color: rgb(72, 72, 72);
    margin-top: -10px;
    margin-bottom: 5px;
    padding-left: 34px;
  `,
};

export default HomeTypesFilter;
