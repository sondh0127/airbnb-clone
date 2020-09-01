import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { S } from '../AddListingStyled';
import { WrapperTable, WrapperCell } from '../../../shared/UI/Wrapper';
import { Field, FieldArray } from 'formik';
import StylesSwitch from './StylesSwitch';

const PageHouseRules = ({ values }) => {
  const [additionRule, setAdditionRule] = useState('');

  const handleOnChange = (e) => {
    const rule = e.target.value;
    setAdditionRule(rule);
  };

  const handleAddRule = (push) => {
    if (additionRule) {
      push(additionRule);
    }
    setAdditionRule('');
  };

  return (
    <section>
      <S.WrapperHeader>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          Set house rules for your guests
        </Typography>
      </S.WrapperHeader>
      <S.WrapperText1>
        <Typography variant="body1">
          Guests must agree to your house rules before they book.
        </Typography>
      </S.WrapperText1>
      <div style={{ width: '90%' }}>
        <WrapperTable style={{ marginTop: '6px', marginBottom: '12px' }}>
          <WrapperCell fullWidth>
            <S.TypographyH6 variant="h6">
              Suitable for children (2-12 years)
            </S.TypographyH6>
          </WrapperCell>
          <WrapperCell>
            <Field name="house_rules.children" component={StylesSwitch} color="primary" />
          </WrapperCell>
        </WrapperTable>
        <WrapperTable style={{ marginTop: '6px', marginBottom: '12px' }}>
          <WrapperCell fullWidth>
            <S.TypographyH6 variant="h6">
              Suitable for infants (Under 2 years)
            </S.TypographyH6>
          </WrapperCell>
          <WrapperCell>
            <Field name="house_rules.infants" component={StylesSwitch} color="primary" />
          </WrapperCell>
        </WrapperTable>
        <WrapperTable style={{ marginTop: '6px', marginBottom: '12px' }}>
          <WrapperCell fullWidth>
            <S.TypographyH6 variant="h6">Suitable for pets</S.TypographyH6>
          </WrapperCell>
          <WrapperCell>
            <Field name="house_rules.pets" component={StylesSwitch} color="primary" />
          </WrapperCell>
        </WrapperTable>
        <WrapperTable style={{ marginTop: '6px', marginBottom: '12px' }}>
          <WrapperCell fullWidth>
            <S.TypographyH6 variant="h6">Smoking allowed</S.TypographyH6>
          </WrapperCell>
          <WrapperCell>
            <Field name="house_rules.smoking" component={StylesSwitch} color="primary" />
          </WrapperCell>
        </WrapperTable>
        <WrapperTable style={{ marginTop: '6px', marginBottom: '12px' }}>
          <WrapperCell fullWidth>
            <S.TypographyH6 variant="h6">Events or parties allowed</S.TypographyH6>
          </WrapperCell>
          <WrapperCell>
            <Field name="house_rules.events" component={StylesSwitch} color="primary" />
          </WrapperCell>
        </WrapperTable>
        <S.WrapperSubtitle style={{ marginTop: 12 }}>
          <S.TypographyH6 variant="h6" style={{ fontWeight: 800 }}>
            Addition Rules
          </S.TypographyH6>
        </S.WrapperSubtitle>
        <FieldArray
          name="house_rules.addition_rules"
          render={({ push, remove }) => (
            <>
              {values.house_rules.addition_rules &&
                values.house_rules.addition_rules.length > 0 &&
                values.house_rules.addition_rules.map((rule, index) => (
                  <WrapperTable style={{ marginBottom: '12px' }} key={index}>
                    <WrapperCell fullWidth>
                      <S.TypographyH6 variant="h6">{rule}</S.TypographyH6>
                    </WrapperCell>
                    <WrapperCell>
                      <S.FabRemove
                        variant="extended"
                        size="small"
                        onClick={() => remove(index)}
                      >
                        X
                      </S.FabRemove>
                    </WrapperCell>
                  </WrapperTable>
                ))}
              <WrapperTable>
                <WrapperCell fullWidth>
                  <TextField
                    value={additionRule}
                    onChange={handleOnChange}
                    placeholder="Quiet hours? No shoes in the house?"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                </WrapperCell>
                <WrapperCell>
                  <S.ButtonAdd
                    size="large"
                    variant="outlined"
                    color="inherit"
                    onClick={() => handleAddRule(push)}
                  >
                    Add
                  </S.ButtonAdd>
                </WrapperCell>
              </WrapperTable>
            </>
          )}
        />
      </div>
    </section>
  );
};
export default PageHouseRules;
