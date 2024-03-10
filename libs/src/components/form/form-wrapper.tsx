import { ReactNode } from 'react';
import styled from 'styled-components';

interface FormWrapperProps {
  children: ReactNode;
  formTitle?: string;
  subtTitle?: string;
  width?: string;
  padding?: string;
}

const StyledFormWrapper = styled.div<FormWrapperProps>`
  padding: ${(props) => props.padding || '20px'};
  width: ${(props) => props.width || 'auto'};
  display: flex;
  flex-direction: column;
`;

const StyledFormTitle = styled.span`
  text-align: left;
  margin-top: auto;
  color: #01463a;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const StyledFormSubTitle = styled.span`
  text-align: left;
  color: #707070;
  font-size: 12px;
  line-spacing: 0px;
  margin-bottom: 40px;
`;

export function FormWrapper({ children, formTitle, subtTitle, width, padding }: FormWrapperProps): JSX.Element {
  return (
    <StyledFormWrapper width={width} padding={padding}>
      {formTitle && <StyledFormTitle>{formTitle}</StyledFormTitle>}
      {subtTitle && <StyledFormSubTitle>{subtTitle}</StyledFormSubTitle>}
      {children}
    </StyledFormWrapper>
  );
}
