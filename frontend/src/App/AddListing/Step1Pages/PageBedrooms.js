import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { Field } from 'formik';
import { Select } from 'formik-material-ui';
import styled from 'styled-components';
import times from 'lodash/times';

import NumberPickerWithLabel from '../../../shared/UI/NumberPickerWithLabel';

import { S } from '../AddListingStyled';
import BedsPicker from './BedsPicker';

S.Label = styled.label`
  color: #767676;
  display: block;
  padding-top: 9px;
  padding-bottom: 8px;
  font-size: 17px !important;
`;

S.WrapperAddBed = styled.div`
  width: auto;
  overflow: auto;
`;

S.WrapperBedContainer = styled.div`
  border-top: 1px solid #dce0e0;
  padding-top: 28px;
  overflow: auto;
`;

const initCommon = {
  sofaBed: 0,
  couch: 0,
  floorMattress: 0,
};
const initBeds = {
  double: 0,
  queen: 0,
  single: 0,
  sofaBed: 0,
};

const PageBedrooms = ({ setFieldValue, values, errors }) => {
  let mergeRooms,
    initRooms,
    initCommonRoom = [];
  const num_bedrooms = Number(values.num_bedrooms);
  const sleeping_arrangements = values.sleeping_arrangements;

  let additionLength = Math.max(num_bedrooms - sleeping_arrangements.length + 1, 0);

  const photoCopyArray = (length) =>
    Array.from(Array(length)).map(() => JSON.parse(JSON.stringify(initBeds)));
  if (additionLength === 0) {
    mergeRooms = [...sleeping_arrangements];
  } else {
    if (sleeping_arrangements.length === 0) {
      initCommonRoom = JSON.parse(JSON.stringify(initCommon));
      initRooms = photoCopyArray(additionLength - 1);
      mergeRooms = [initCommonRoom, ...initRooms];
    } else {
      initRooms = photoCopyArray(additionLength);
      mergeRooms = [...sleeping_arrangements, ...initRooms];
    }
  }

  useEffect(() => {
    setFieldValue('sleeping_arrangements', mergeRooms);
  }, []);

  return (
    <section>
      <S.WrapperHeader>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          How many guests can your place accommodate?
        </Typography>
      </S.WrapperHeader>
      <S.WrapperText1>
        <Typography variant="body1">
          Check that you have enough beds to accommodate all your guests comfortably.
        </Typography>
      </S.WrapperText1>
      <div>
        <div>
          <S.WrapperSelection1>
            <S.WrapperSelection2>
              <NumberPickerWithLabel
                value={values.num_guests ? values.num_guests : 1}
                onMinusClick={() => setFieldValue('num_guests', values.num_guests - 1)}
                onPlusClick={() => setFieldValue('num_guests', values.num_guests + 1)}
                label="Guests"
                disabledMinus={values.num_guests <= 1}
                disabledPlus={values.num_guests >= 16}
              />
            </S.WrapperSelection2>
          </S.WrapperSelection1>
          <S.WrapperSelection1>
            <S.Label>How many bedrooms can guests use?</S.Label>
            <S.WrapperSelection2>
              <Field
                name="num_bedrooms"
                type="select"
                component={Select}
                native
                fullWidth
                error={Boolean(errors.num_bedrooms)}
                input={<OutlinedInput name="num_bedrooms" labelWidth={0} />}
              >
                <option value={0}>Studio</option>
                {times(50, (t) => {
                  const n = t + 1;
                  return (
                    <option key={n} value={n}>
                      {`${n} ${n === 1 ? `bedroom` : `bedrooms`}`}
                    </option>
                  );
                })}
              </Field>
            </S.WrapperSelection2>
          </S.WrapperSelection1>
          <S.WrapperSelection1>
            <S.Label>How many beds can guests use?</S.Label>
            <S.WrapperSelection2>
              <NumberPickerWithLabel
                value={values.num_beds ? values.num_beds : 1}
                onMinusClick={() => setFieldValue('num_beds', values.num_beds - 1)}
                onPlusClick={() => setFieldValue('num_beds', values.num_beds + 1)}
                label="Beds"
                disabledMinus={values.num_beds <= 1}
              />
            </S.WrapperSelection2>
          </S.WrapperSelection1>
        </div>
        <div>
          <S.WrapperHeader>
            <Typography variant="h5">Sleeping arrangements</Typography>
          </S.WrapperHeader>
          <S.WrapperText1>
            <Typography variant="body1">
              Sharing the types of beds in each room can help people understand the
              sleeping arrangements.
            </Typography>
          </S.WrapperText1>
          <S.WrapperAddBed>
            <S.WrapperBedContainer>
              <>
                {mergeRooms &&
                  mergeRooms.length > 0 &&
                  mergeRooms.map(
                    (room, index) =>
                      index !== 0 &&
                      index <= num_bedrooms && (
                        <BedsPicker
                          key={`bedroom ${index}`}
                          name={`sleeping_arrangements[${index}]`}
                          label={`Bedroom ${index}`}
                          beds={room}
                        />
                      )
                  )}
                <BedsPicker
                  name={`sleeping_arrangements[0]`}
                  key={`commonSpaces`}
                  label={`Common spaces`}
                  beds={mergeRooms[0]}
                />
              </>
            </S.WrapperBedContainer>
          </S.WrapperAddBed>
        </div>
      </div>
    </section>
  );
};

export default PageBedrooms;
