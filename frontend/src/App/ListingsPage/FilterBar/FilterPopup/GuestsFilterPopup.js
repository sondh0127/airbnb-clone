import React, { useEffect, useState } from 'react';
import GuestDropDownPicker from '../../../../shared/GuestPicker/GuestDropDownPicker';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from './PopoverStyles';

const GuestsFilterPopup = ({
  maxGuests: mGuests,
  hideMaxGuest: hideMGuests,
  formikProps,
}) => {
  const initLabel = 'Guests';
  const initGuests = {
    guests: 1,
    adultsNum: 1,
    childrenNum: 0,
    infantsNum: 0,
  };
  const [state, setState] = useState({
    maxGuests: mGuests || 16,
    hideMaxGuest: hideMGuests || true,
    guests: formikProps.values.guests,
    adultsNum: formikProps.values.adultsNum,
    childrenNum: formikProps.values.childrenNum,
    infantsNum: formikProps.values.infantsNum,
  });

  useEffect(() => {
    setState({
      ...state,
      guests: formikProps.values.guests,
      adultsNum: formikProps.values.adultsNum,
      childrenNum: formikProps.values.childrenNum,
      infantsNum: formikProps.values.infantsNum,
    });
    setButtonActive(formikProps.values.guests > 0);
    return () => {};
  }, [formikProps.values]);

  const classes = useStyles();
  const [buttonActive, setButtonActive] = useState(formikProps.values.guests > 1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { guests, adultsNum, childrenNum, infantsNum, maxGuests, hideMaxGuest } = state;

  const handleClick = (event) => {
    setButtonActive(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    onSetGuestsCount();
    setAnchorEl(null);
  };

  const onSetGuestsCount = () => {
    const count = state;
    const { handleSubmit, setFieldValue } = formikProps;

    setFieldValue('guests', count.guests, false);
    setFieldValue('adultsNum', count.adultsNum, false);
    setFieldValue('childrenNum', count.childrenNum, false);
    setFieldValue('infantsNum', count.infantsNum, false);
    if (guests > 0) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
    handleSubmit();
  };

  const handleAddGuests = (label) => {
    const { maxGuests, infantsNum } = state;
    const stateLabel = `${label.toLowerCase()}Num`;
    const otherLabel = stateLabel === 'adultsNum' ? 'childrenNum' : 'adultsNum';

    let labelNum = state[stateLabel];

    let { guests } = state;
    if (stateLabel === 'infantsNum') {
      if (infantsNum < 5) {
        labelNum += 1;
      }
    } else {
      if (labelNum < maxGuests - state[otherLabel]) {
        labelNum += 1;
      }
      if (guests < maxGuests) {
        guests += 1;
      }
    }
    setState({ ...state, guests, [stateLabel]: labelNum });
  };

  const handleMinusGuests = (label) => {
    const stateLabel = `${label.toLowerCase()}Num`;
    const otherLabel = stateLabel === 'adultsNum' ? 'childrenNum' : 'adultsNum';
    let labelNum = state[stateLabel];
    let { guests } = state;
    if (labelNum > 0) {
      labelNum -= 1;
    }
    if (label !== 'Infants' && guests - state[otherLabel] > 0) {
      guests -= 1;
    }
    setState({ ...state, guests, [stateLabel]: labelNum });
  };

  const getLabel = () => {
    if (guests > 1) {
      const guestsNumLabel = guests === 1 ? `${guests} guest` : `${guests} guests`;
      const infantsNumLabel =
        infantsNum > 0
          ? infantsNum === 1
            ? `, ${infantsNum} infant`
            : `, ${infantsNum} infants`
          : '';
      return guestsNumLabel.concat(infantsNumLabel);
    } else {
      return initLabel;
    }
  };
  const handleClearGuests = () => {
    setState({ ...state, ...initGuests });
  };

  return (
    <div className={classes.FilterPopup}>
      <Button
        className={buttonActive ? classes.active : classes.inactive}
        onClick={handleClick}
        variant="outlined"
      >
        {getLabel()}
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
            <GuestDropDownPicker
              adultsNum={adultsNum}
              childrenNum={childrenNum}
              infantsNum={infantsNum}
              guests={guests}
              maxGuests={maxGuests}
              hideMaxGuest={hideMaxGuest}
              handleMinusGuests={handleMinusGuests}
              handleAddGuests={handleAddGuests}
              handleSetGuests={handleClose}
              handleClearGuests={handleClearGuests}
            />
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
};

export default GuestsFilterPopup;
