import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Field } from 'formik';

import { S } from '../AddListingStyled';
import CheckBoxWithLabelV4 from '../../../shared/CheckBoxWithLabelV4';

const SPACES = {
  pool: 'Pool',
  kitchen: 'Kitchen',
  washer: 'Laundry – washer',
  dryer: 'Laundry – dryer',
  parking: 'Parking',
  elevator: 'Elevator',
  hot_tub: 'Hot tub',
  gym: 'Gym',
};

class PageSpaces extends Component {
  static propTypes = {};

  render() {
    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            What spaces can guests use?
          </Typography>
        </S.WrapperHeader>
        <S.WrapperText1>
          <Typography variant="body1">
            Include common areas, but don’t add spaces that aren’t on your property.
          </Typography>
        </S.WrapperText1>
        <div>
          <div>
            <S.WrapperSelection1>
              {Object.keys(SPACES).map((item, index) => (
                <S.WrapperSelection4 key={index}>
                  <Field
                    name={`spaces.${item}`}
                    component={CheckBoxWithLabelV4}
                    color="primary"
                    label={SPACES[item]}
                  />
                </S.WrapperSelection4>
              ))}
            </S.WrapperSelection1>
          </div>
        </div>
      </section>
    );
  }
}
export default PageSpaces;
