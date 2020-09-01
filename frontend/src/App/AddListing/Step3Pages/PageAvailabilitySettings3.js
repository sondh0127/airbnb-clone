import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { S } from '../AddListingStyled';
import NumberPickerWithLabel from '../../../shared/UI/NumberPickerWithLabel';

class PageAvailabilitySettings3 extends Component {
  static propTypes = {};
  render() {
    const { values, setFieldValue } = this.props;
    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            How long can guests stay?
          </Typography>
        </S.WrapperHeader>
        <S.WrapperSelection1>
          <S.WrapperSelection2>
            <NumberPickerWithLabel
              value={values.min_nights ? values.min_nights : 0}
              onMinusClick={() => setFieldValue('min_nights', values.min_nights - 1)}
              onPlusClick={() => setFieldValue('min_nights', values.min_nights + 1)}
              label="Min Nights"
              disabledMinus={values.min_nights <= 0}
            />
          </S.WrapperSelection2>
        </S.WrapperSelection1>
        <S.WrapperSelection1>
          <S.WrapperSelection2>
            <NumberPickerWithLabel
              value={values.max_nights ? values.max_nights : 0}
              onMinusClick={() => setFieldValue('max_nights', values.max_nights - 1)}
              onPlusClick={() => setFieldValue('max_nights', values.max_nights + 1)}
              label="Max Nights"
              disabledMinus={values.max_nights <= 0}
            />
          </S.WrapperSelection2>
        </S.WrapperSelection1>
      </section>
    );
  }
}
export default PageAvailabilitySettings3;
