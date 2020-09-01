import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Field } from 'formik';

import { S } from '../AddListingStyled';
import CheckBoxWithLabelV4 from '../../../shared/CheckBoxWithLabelV4';

const AMENITIES = {
  essentials: ['Essentials', 'Towels, bed sheets, soap, toilet paper, and pillows'],
  wifi: ['Wifi'],
  shampoo: ['Shampoo'],
  closet: ['Closet/drawers'],
  tv: ['TV'],
  heat: ['Heat'],
  air_conditioning: ['Air conditioning'],
  breakfast: ['Breakfast, coffee, tea'],
  desk: ['Desk/workspace'],
  fireplace: ['Fireplace'],
  iron: ['Iron'],
  hair_dryer: ['Hair dryer'],
  private_entrance: ['Private entrance'],
};

const SAFE_AMENITIES = {
  smoke_detector: [
    'Smoke detector',
    'Check your local laws, which may require a working smoke detector in every room',
  ],
  carbon_monoxide_detector: [
    'Carbon monoxide detector',
    'Check your local laws, which may require a working carbon monoxide detector in every room',
  ],
  first_aid_kit: ['First aid kit'],
  fire_extinguisher: ['Fire extinguisher'],
};

const getRenderAmenities = (baseAmenities) => {
  const amenities = { ...baseAmenities };
  return Object.keys(baseAmenities).map((item, index) => (
    <S.WrapperSelection4 key={index}>
      <Field
        name={`amenities.${item}`}
        component={CheckBoxWithLabelV4}
        color="primary"
        label={amenities[item][0]}
      />
      {amenities[item][1] && <S.WrapperText>{amenities[item][1]}</S.WrapperText>}
    </S.WrapperSelection4>
  ));
};
class PageAmenities extends Component {
  static propTypes = {};

  render() {
    const { classes, values } = this.props;
    const amenities = getRenderAmenities(AMENITIES);
    const safeAmenities = getRenderAmenities(SAFE_AMENITIES);
    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            What amenities do you offer?
          </Typography>
        </S.WrapperHeader>
        <S.WrapperText1>
          <Typography variant="body1">
            These are just the amenities guests usually expect, but you can add even more
            after you publish.
          </Typography>
        </S.WrapperText1>
        <div>
          <div>
            <S.WrapperSelection1>{amenities}</S.WrapperSelection1>
            <div style={{ marginTop: 48, marginBottom: 18 }}>
              <S.TypographyH6 variant="h6" style={{ fontWeight: 600 }}>
                Safety amenities
              </S.TypographyH6>
            </div>
            <S.WrapperSelection1>{safeAmenities}</S.WrapperSelection1>
          </div>
        </div>
      </section>
    );
  }
}
export default PageAmenities;
