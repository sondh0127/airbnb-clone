import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Select } from 'formik-material-ui';
import moment from 'moment';
import times from 'lodash/times';

import { WrapperBeforeAfter } from '../../shared/UI/Wrapper';
import { S, Svg } from './styled';
import { registerUser } from '../../store/actions/AuthActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  input: { paddingTop: '13.5px', paddingBottom: '13.5px' },
});
const Signup = ({ setLogin, error, registerUser, history }) => {
  setLogin = setLogin ? setLogin : () => history.push('/login');
  const classes = useStyles();
  const StyledOutlinedInput = (props) => (
    <OutlinedInput
      {...props}
      classes={{
        input: classes.input,
      }}
    />
  );
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          firstname: '',
          lastname: '',
          password: '',
          month: '',
          day: '',
          year: '',
        }}
        validate={(values) => {
          let errors = {};
          if (!values.month || !values.year || !values.day) {
            errors.birthday = 'Select your birth date to continue.';
          }
          return errors;
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
          firstname: Yup.string().required('First name is required.'),
          lastname: Yup.string().required('Last name is required.'),
          password: Yup.string()
            .min(8, 'Password must contain at least 8 characters.')
            .matches(/[0-9]|\W/, 'Password must contain a number or symbol.')
            .required('Password is required.'),
          month: Yup.string().required(),
          day: Yup.string().required(),
          year: Yup.string().required(),
        })}
        //   Cannot contain your name or email address
        //   Contains a number or symbol
        onSubmit={(values, { setSubmitting }) => {
          const birthday = values.day + '/' + values.month + '/' + values.year;
          registerUser(
            values.email,
            values.firstname,
            values.lastname,
            values.password,
            birthday
          ).then(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form autoComplete="off">
            <Divider />
            <Field
              name="email"
              placeholder="Email address"
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">{Svg.email}</InputAdornment>,
              }}
            />
            {error && (
              <FormHelperText error style={{ margin: '0 12px' }}>
                {error}
              </FormHelperText>
            )}
            <Field
              id="firstname"
              name="firstname"
              placeholder="First name"
              type="text"
              component={TextField}
              variant="outlined"
              margin="dense"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{Svg.person}</InputAdornment>
                ),
              }}
            />
            <Field
              name="lastname"
              placeholder="Last name"
              type="text"
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{Svg.person}</InputAdornment>
                ),
              }}
            />
            <Field
              name="password"
              placeholder="Create password"
              type="password"
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{Svg.password}</InputAdornment>
                ),
              }}
            />
            <S.DivSubtitle2>
              <Typography variant="body1">Birthday</Typography>
            </S.DivSubtitle2>

            <S.DivSubtitle2>
              <Typography variant="body2">
                To sign up, you must be 18 or older. Other people won’t see your birthday.
              </Typography>
            </S.DivSubtitle2>
            <WrapperBeforeAfter
              style={{
                marginLeft: '-8px',
                marginRight: '-8px',
              }}
            >
              <S.WrapperMonth>
                <Field
                  name="month"
                  type="select"
                  component={Select}
                  native
                  fullWidth
                  error={Boolean(errors.month)}
                  input={<StyledOutlinedInput id="month" name="month" labelWidth={0} />}
                >
                  <option disabled value="">
                    Month
                  </option>
                  {moment.months().map((value) => (
                    <option
                      key={value}
                      value={moment()
                        .month(value)
                        .format('M')}
                    >
                      {value}
                    </option>
                  ))}
                </Field>
              </S.WrapperMonth>
              <S.WrapperDay>
                <Field
                  name="day"
                  type="select"
                  error={Boolean(errors.day)}
                  component={Select}
                  native
                  fullWidth
                  input={<StyledOutlinedInput id="day" name="day" labelWidth={0} />}
                >
                  <option disabled value="">
                    Day
                  </option>
                  {times(30, (t) => {
                    const n = t + 1;
                    return (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    );
                  })}
                </Field>
              </S.WrapperDay>
              <S.WrapperSelection>
                <Field
                  name="year"
                  type="select"
                  error={Boolean(errors.year)}
                  component={Select}
                  native
                  fullWidth
                  input={<StyledOutlinedInput id="year" name="year" labelWidth={0} />}
                >
                  <option disabled value="">
                    Year
                  </option>
                  {times(121, (t) => {
                    const startYear = moment().year();
                    const n = startYear - t;
                    return (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    );
                  })}
                </Field>
              </S.WrapperSelection>
            </WrapperBeforeAfter>
            <S.DivSubtitle2>
              {errors.birthday && touched.month && touched.day && touched.year ? (
                <FormHelperText error style={{ margin: '8px 12px 0' }}>
                  {errors.birthday}
                </FormHelperText>
              ) : null}
            </S.DivSubtitle2>
            <S.DivSubtitle2>
              <Typography variant="body2">
                We’ll send you marketing promotions, special offers, inspiration, and
                policy updates via email.
              </Typography>
            </S.DivSubtitle2>
            <S.DivSubtitle2>
              <Button
                size="large"
                variant="contained"
                fullWidth
                color="secondary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  `Sign up`
                )}
              </Button>
            </S.DivSubtitle2>
          </Form>
        )}
      </Formik>
      <Divider />
      <Typography variant="body1" align="center">
        <span>Already have an Airbnb account?</span>
        <S.SpanMarginLogin>
          <Link onClick={setLogin}>Log in</Link>
        </S.SpanMarginLogin>
      </Typography>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.AuthReducer.loading,
  error: state.AuthReducer.error,
});

const mapDispatchToProps = {
  registerUser,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Signup)
);

Signup.propTypes = {
  error: PropTypes.string,
  registerUser: PropTypes.func.isRequired,
  setLogin: PropTypes.func,
};
