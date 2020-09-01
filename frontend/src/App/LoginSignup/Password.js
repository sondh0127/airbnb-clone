import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Yup from 'yup';

import { S, Svg } from './styled';
import { WrapperTable, WrapperCol, WrapperCell } from '../../shared/UI/Wrapper';
import { TextField } from 'formik-material-ui';
import { withRouter } from 'react-router-dom';

const Password = ({ setLogin, history }) => {
  setLogin = setLogin ? setLogin : () => history.push('/login');
  return (
    <div>
      <S.DivMarginBottom>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          Reset password
        </Typography>
      </S.DivMarginBottom>
      <Typography variant="body1">
        Enter the email address associated with your account, and we’ll email you a link
        to reset your password.
      </Typography>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            {/* //TODO: Add token input */}
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
            <div style={{ marginTop: '24px', marginBottom: '16px' }} />
            <WrapperTable fullWidth>
              <WrapperCol>
                <Link
                  type="button"
                  component="button"
                  onClick={setLogin}
                  variant="subtitle2"
                >
                  <WrapperTable fullWidth>
                    <WrapperCell style={{ paddingRight: '8px' }}>{Svg.back}</WrapperCell>
                    <WrapperCell>Back to Login</WrapperCell>
                  </WrapperTable>
                </Link>
              </WrapperCol>
              <WrapperCol style={{ paddingRight: '100px', paddingLeft: '100px' }} />
              <WrapperCol>
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Send reset link
                </Button>
              </WrapperCol>
            </WrapperTable>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(Password);

Password.propTypes = {
  setLogin: PropTypes.func,
};
