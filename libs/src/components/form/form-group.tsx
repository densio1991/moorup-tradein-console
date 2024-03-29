import { ReactNode } from 'react';
import styled from 'styled-components';

interface FormGroupProps {
  children: ReactNode;
}

const StyledFormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;

  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: start;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export function FormGroup({ children }: FormGroupProps): JSX.Element {
  return (
    <StyledFormGroup>
      {children}
    </StyledFormGroup>
  );
}

const StyledFormGroupWithIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
`;

export function FormGroupWithIcon({ children }: FormGroupProps): JSX.Element {
  return (
    <StyledFormGroupWithIcon>
      {children}
    </StyledFormGroupWithIcon>
  );
}
