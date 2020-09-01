import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { fieldToCheckbox } from 'formik-material-ui';

const CheckBoxWithLabelV4 = (props) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...fieldToCheckbox(props)}
          checked={Boolean(props.field.value)}
          color="primary"
        />
      }
      label={props.label}
    />
  );
};
export default CheckBoxWithLabelV4;
