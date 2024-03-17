/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppButton, StyledInput, useAuth } from '@tradein-admin/libs';
import { useFormik } from 'formik';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.form`
  width: 400px;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export function LoginPage() {
  const { state, loginUser } = useAuth();
  const { isAuthenticating } = state;

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values: any) => {
    loginUser(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <LoginContainer>
      <FormContainer onSubmit={formik.handleSubmit}>
        <StyledInput
          type="text"
          id="email"
          label="Email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <StyledInput
          type="password"
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <AppButton type="submit" isLoading={isAuthenticating}>
          Submit
        </AppButton>
      </FormContainer>
    </LoginContainer>
  );
}
