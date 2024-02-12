import { ReactNode } from 'react';
import styled from 'styled-components';

interface FormContainerProps {
  children: ReactNode;
  onSubmit: () => void;
}

const StyledFormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export function FormContainer({ children, onSubmit }: FormContainerProps): JSX.Element {
  return (
    <StyledFormContainer onSubmit={onSubmit}>
      {children}
    </StyledFormContainer>
  );
}
