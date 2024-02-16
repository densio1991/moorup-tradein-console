import { ReactNode } from 'react';
import styled from 'styled-components';

interface FormWrapperProps {
  children: ReactNode;
  formTitle?: string;
  width?: string;
  padding?: string;
}

const StyledFormWrapper = styled.div<FormWrapperProps>`
  padding: ${(props) => props.padding || '20px'};
  width: ${(props) => props.width || 'auto'};
`;

const StyledFormTitle = styled.h2`
  text-align: left;
  margin-top: auto;
  color: #01463a;
`;

export function FormWrapper({ children, formTitle, width, padding }: FormWrapperProps): JSX.Element {
  return (
    <StyledFormWrapper width={width} padding={padding}>
      {formTitle && <StyledFormTitle>{formTitle}</StyledFormTitle>}
      {children}
    </StyledFormWrapper>
  );
}
