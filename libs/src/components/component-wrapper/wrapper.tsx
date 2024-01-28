/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { decodeJWT, validateExpiry } from "../../helpers";
import { useAppContext, useAuth } from "../../store";

interface ComponentWrapperProps {
  children: ReactNode;
}

const StyledApp = styled.div`
  background-color: #F4F4F5;
  display: flex;
  flex-direction: column;
`;

export function ComponentWrapper({ children }: ComponentWrapperProps): JSX.Element {
  const navigate = useNavigate();
  const { token, expiry } = useAuth();
  const { state, getUserDetailsById } = useAppContext();
  const {
    token: authToken,
    userDetails,
  } = state;

  const shouldRun = useRef(false);

  const clearStorage = () => {
    localStorage.removeItem("FTK");
    localStorage.removeItem("FTKX");
  };

  // Token validation function
  const validateToken = () => {
    
    try {
      if (!validateExpiry(expiry)) {
        clearStorage();
        navigate("/login");
      }
    } catch (error) {
      clearStorage();
    }
  };

  useEffect(() => {
    // Validate token on component mount
    validateToken();

    // Set up interval to validate token every second
    const intervalId = setInterval(() => validateToken(), 1000);

    // Clean up the interval when the component is unmounted or when the token changes
    return () => {
      clearInterval(intervalId);
    };
  }, [token, validateToken, userDetails]);

  useEffect(() => {
    if ((authToken && isEmpty(userDetails) && !shouldRun.current)) {
      const decodedToken = decodeJWT(authToken);
      getUserDetailsById(decodedToken?.id);
      shouldRun.current = true;
    }

  }, [authToken]);

  return (
    <StyledApp>
      {children}
    </StyledApp>
  );
}
