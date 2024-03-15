import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledFlex = styled.div<{ direction?: string, center?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : 'column')};
  background-color: white;
  padding: 20px;
  justify-content: ${(props) => (props.center ? 'center' : 'left')};
  align-items: ${(props) => (props.center ? 'center' : 'left')};
`;

interface FlexProps {
  children: ReactNode;
  direction?: string;
  center?: boolean;
}

export function Flex({ children, direction, center }: FlexProps): JSX.Element {
  return <StyledFlex direction={direction} center={center}>{children}</StyledFlex>;
}
