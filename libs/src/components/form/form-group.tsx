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
`;

export function FormGroup({ children }: FormGroupProps): JSX.Element {
  return (
    <StyledFormGroup>
      {children}
    </StyledFormGroup>
  );
}
