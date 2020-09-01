import React, { useState } from 'react';
import { Svg, S } from '../AddListingStyled';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';

const ConfirmButton = ({ index, removeListingPhoto }) => {
  const [confirm, setConfirm] = useState(false);

  const handleClickDelete = (index) => {
    if (confirm) {
      removeListingPhoto(index);
    } else {
      setConfirm(true);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setConfirm(false)}>
      <S.DivDelButton>
        <Grid container alignContent="center">
          <S.Button
            variant="extended"
            del={confirm ? 1 : 0}
            onClick={() => handleClickDelete(index)}
          >
            <Grid item>{Svg.del}</Grid>
            <Grid item>
              <S.SpanText del={confirm ? 1 : 0}>Remove?</S.SpanText>
            </Grid>
          </S.Button>
        </Grid>
      </S.DivDelButton>
    </ClickAwayListener>
  );
};
export default ConfirmButton;
