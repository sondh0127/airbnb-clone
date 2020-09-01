import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Form, Field, Formik } from 'formik';

import FormikPlacesAutoComplete from './FormikPlacesAutoComplete';
import GuestPicker from '../../shared/GuestPicker';
import DatePicker from '../../shared/DatePicker';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { DispatchContext, FiltersContext } from '../../store/context/filtersContext';
import * as types from '../../store/constants/actionTypes';

const Search = ({ history }) => {
  const state = useContext(FiltersContext);
  const dispatch = useContext(DispatchContext);
  return (
    <DivSearchRoot>
      <DivSearchContainerTable>
        <DivSearchTableCell>
          <DivSearchContainer>
            <TitleStyledTypography gutterBottom>
              Book unique homes and experiences.
            </TitleStyledTypography>
            <DivFormContainer>
              <FormSearch>
                <Formik
                  enableReinitialize={true}
                  initialValues={state}
                  onSubmit={(values, { setSubmitting }) => {
                    dispatch({
                      type: types.UPDATE_FILTER,
                      filter: values,
                      history: history,
                    });
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting, values, setValues }) => (
                    <Form autoComplete="off">
                      <LabelStyledTypography gutterBottom>WHERE</LabelStyledTypography>
                      <Field name="location" component={FormikPlacesAutoComplete} />
                      <DivChecking>
                        <LabelStyledTypography gutterBottom component="span">
                          CHECK IN
                        </LabelStyledTypography>
                      </DivChecking>
                      <DivChecking>
                        <LabelStyledTypography gutterBottom component="span">
                          CHECK OUT
                        </LabelStyledTypography>
                      </DivChecking>
                      <DatePicker
                        onDatesChange={(startDate, endDate) =>
                          setValues({
                            ...values,
                            checkIn: startDate,
                            checkOut: endDate,
                          })
                        }
                        startDate={values.checkIn}
                        endDate={values.checkOut}
                        forcusInput={null}
                        minimumNights={1}
                      />
                      <LabelStyledTypography gutterBottom>GUESTS</LabelStyledTypography>
                      <GuestPicker
                        maxGuests={16}
                        guestsValues={{
                          guests: values.guests,
                          adultsNum: values.adultsNum,
                          childrenNum: values.childrenNum,
                          infantsNum: values.infantsNum,
                        }}
                        onSetGuestsCount={(count) => {
                          setValues({
                            ...values,
                            guests: count.guests,
                            adultsNum: count.adultsNum,
                            childrenNum: count.childrenNum,
                            infantsNum: count.infantsNum,
                          });
                        }}
                        hideMaxGuest
                      />
                      <DivButtonContainer>
                        <ButtonSearch type="submit">Search</ButtonSearch>
                      </DivButtonContainer>
                    </Form>
                  )}
                </Formik>
              </FormSearch>
            </DivFormContainer>
          </DivSearchContainer>
        </DivSearchTableCell>
      </DivSearchContainerTable>
    </DivSearchRoot>
  );
};

const DivSearchRoot = styled.div`
  width: 100%;
  bottom: 0px;
  top: 0px;
  position: relative;
  @media (min-width: 744px) {
    top: 120px;
  }
`;

const DivSearchContainerTable = styled.div`
  display: table;
  position: relative;
  height: 100%;
  width: 100%;
`;

const DivSearchTableCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  max-width: 1080px;

  @media (min-width: 744px) {
    padding-left: 100px;
    padding-right: 24px;
  }

  @media (min-width: 1128px) {
    padding-left: 412px;
  }
`;

const DivSearchContainer = styled.div`
  padding-top: 168px;
  padding-bottom: 16px;

  @media (min-width: 744px) {
    background: #ffffff;
    border-radius: 4px;
    padding: 32px 32px 24px;
    width: 441px;
    boxshadow: '0 16px 40px rgba(0,0,0,0.12)';
  }
`;

const TitleStyledTypography = styled(Typography)`
  font-size: 30px;
  line-height: 36px;
  letter-spacing: normal;
  color: #ffffff;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
  @media (min-width: 744px) {
    color: #484848;
  }
`;

const DivFormContainer = styled.div`
  background: #ffffff;
  border-radius: 4px;
`;

const FormSearch = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const LabelStyledTypography = styled(Typography)`
  background: transparent;
  cursor: pointer;
  word-wrap: break-word;
  font-size: 12px;
  margin: 8px 0;
  font-family: Circular-Bold, sans-serif;
  line-height: 1.3333333333333333em;
  letter-spacing: 0.08333333333333333em;
  color: #484848;
`;

const DivChecking = styled.div`
  margin-top: 8px;
  width: 50%;
  display: inline-block;
  overflow: hidden;
`;

const ButtonSearch = styled.button`
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: normal;
  font-family: Circular-Bold, sans-serif;
  border-width: 2px;
  padding: 10px 22px;
  box-shadow: none;
  background: #ff5a5f;
  border-color: transparent;
  color: #ffffff;
`;

const DivButtonContainer = styled.div`
  padding-top: 8px;
  @media (min-width: 744px) {
    text-align: right;
  }
`;

export default withRouter(Search);
