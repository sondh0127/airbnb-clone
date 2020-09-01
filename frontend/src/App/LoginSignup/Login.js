import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import { TextField } from 'formik-material-ui';

import { S, Svg } from './styled';
import { WrapperTable, WrapperCol, WrapperCell } from '../../shared/UI/Wrapper';
import { demoLogin, loginUser } from '../../store/actions/AuthActions';
import { withRouter } from 'react-router-dom';
import CheckBoxWithLabelV4 from '../../shared/CheckBoxWithLabelV4';

const Login = ({ setSignUp, setPassword, loginUser, history, demoLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  setPassword = setPassword ? setPassword : () => history.push('/password');
  setSignUp = setSignUp ? setSignUp : () => history.push('/signup');
  const handleClickShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  return (
    <div>
      <S.DivMarginBottom>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          Log in to continue
        </Typography>
      </S.DivMarginBottom>
      {/* Server response */}
      <Formik
        initialValues={{ email: '', password: '', rememberMe: 'false' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
          password: Yup.string()
            .min(8, 'Your password must be at least 8 characters. Please try again.')
            .required('Password is required.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          loginUser(values.email, values.password, values.rememberMe).then(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <Field
              name="email"
              placeholder="Email address"
              type="email"
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">{Svg.email}</InputAdornment>,
              }}
            />
            <Field
              name="password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
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
            <WrapperTable fullWidth>
              <WrapperCol align="left">
                <Field
                  name="rememberMe"
                  component={CheckBoxWithLabelV4}
                  label="Remember me"
                />
              </WrapperCol>
              <WrapperCol align="right">
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickShowPassword}
                  variant="subtitle2"
                >
                  {showPassword ? 'Hide' : 'Show'} password
                </Link>
              </WrapperCol>
            </WrapperTable>
            <S.DivSubtitle2>
              <Button
                size="large"
                variant="contained"
                fullWidth
                color="secondary"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </S.DivSubtitle2>
            <S.DivSubtitle2 style={{ textAlign: 'center' }}>
              <Link
                type="button"
                component="button"
                onClick={setPassword}
                variant="subtitle2"
              >
                Forgot password?
              </Link>
            </S.DivSubtitle2>
            <S.DivSubtitle2>
              <Button
                size="large"
                variant="contained"
                fullWidth
                color="secondary"
                type="button"
                onClick={demoLogin}
                disabled={isSubmitting}
              >
                Demo Login
              </Button>
            </S.DivSubtitle2>
          </Form>
        )}
      </Formik>
      <Divider />
      <Typography variant="body1" align="center" component="div">
        <span>Don’t have an account?</span>
        <S.SpanMarginLogin>
          <Link onClick={setSignUp}>Sign up</Link>
        </S.SpanMarginLogin>
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link component="button" onClick={() => {}} variant="subtitle2">
            <WrapperTable>
              <WrapperCell style={{ paddingRight: '8px' }}>{Svg.back}</WrapperCell>
              <WrapperCell>Back</WrapperCell>
            </WrapperTable>
          </Link>
        </div>
      </Typography>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.AuthReducer.loading,
});

const mapDispatchToProps = {
  loginUser,
  demoLogin,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setPassword: PropTypes.func,
  setSignUp: PropTypes.func,
};
