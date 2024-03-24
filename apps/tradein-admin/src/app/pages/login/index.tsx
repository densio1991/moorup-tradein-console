/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppButton,
  StyledInput,
  useAuth,
  useCommon,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../../../../public/Moorup.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background-color: white;
  row-gap: 10px;
`;

const StyledText = styled.span<{
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  center?: boolean;
}>`
  ${(props) => props.center && 'align-self: center;'}
  ${(props) => props.color && `color: ${props.color};`}
  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${(props) => props.fontSize && `font-size: ${props.fontSize};`}
  ${(props) => props.margin && `margin: ${props.margin};`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft};`}
  ${(props) => props.marginRight && `margin-right: ${props.marginRight};`}
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight};`}
`;

const Image = styled.img`
  width: auto;
  height: 10rem;
  display: block;
  object-fit: cover;
  align-self: center;
`;

export function LoginPage() {
  const { state, loginUser } = useAuth();
  const { isAuthenticating } = state;

  const { setShowSideNav } = useCommon();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Automatically toggle showSideNav based on viewport width
    setShowSideNav(viewportWidth > 1200);
  }, [viewportWidth]);

  return (
    <Container>
      <FormContainer onSubmit={formik.handleSubmit}>
        <Image src={Logo} alt="" />
        <StyledText color="#01463a" fontSize="1.5rem" fontWeight="700" center>
          Welcome Back!
        </StyledText>
        <StyledText
          color="#216A4C"
          fontSize="0.75rem"
          fontWeight="400"
          marginBottom="2rem"
          center
        >
          Please Sign in to continue
        </StyledText>
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
        <AppButton type="submit" isLoading={isAuthenticating} padding="10px">
          Submit
        </AppButton>
      </FormContainer>
    </Container>
  );
}
