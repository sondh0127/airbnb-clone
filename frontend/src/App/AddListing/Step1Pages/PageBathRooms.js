import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import { S } from '../AddListingStyled';
import NumberPickerWithLabel from '../../../shared/UI/NumberPickerWithLabel';

class PageBathRooms extends Component {
  static propTypes = {};

  render() {
    const { values, setFieldValue } = this.props;

    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            How many bathrooms?
          </Typography>
        </S.WrapperHeader>
        <S.WrapperText1>
          <Typography variant="body1">
            Count bathrooms that don’t have a shower or bathtub as a half bathroom.
          </Typography>
        </S.WrapperText1>
        <div>
          <div>
            <S.WrapperSelection1>
              <S.WrapperSelection2>
                <NumberPickerWithLabel
                  value={values.num_bathrooms ? values.num_bathrooms : 0}
                  onMinusClick={() =>
                    setFieldValue('num_bathrooms', values.num_bathrooms - 0.5)
                  }
                  onPlusClick={() =>
                    setFieldValue('num_bathrooms', values.num_bathrooms + 0.5)
                  }
                  label="Bathrooms"
                  disabledMinus={values.num_bathrooms <= 0}
                />
              </S.WrapperSelection2>
            </S.WrapperSelection1>
          </div>
        </div>
      </section>
    );
  }
}
export default PageBathRooms;
