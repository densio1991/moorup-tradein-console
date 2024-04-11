import { ReactNode } from 'react';
import styled from 'styled-components';

interface FormGroupProps {
  children: ReactNode;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

const StyledFormGroup = styled.div<{ 
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}>`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;

  ${(props) => props.margin && `margin: ${props.margin};`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft};`}
  ${(props) => props.marginRight && `margin-right: ${props.marginRight};`}

  @media screen and (max-width: 425px) {
    flex-direction: column;
    align-items: start;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export function FormGroup({ 
  children, 
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}: FormGroupProps): JSX.Element {
  return (
    <StyledFormGroup 
      margin={margin}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
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
