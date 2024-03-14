import { ReactNode } from 'react';
import styled from 'styled-components';

interface CardContainerProps {
  children: ReactNode;
  direction?: string;
}

const CardContainerWrapper = styled.div<{ direction?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #F4F4F5;
  overflow: auto;
  padding: 10px;
`;

export function CardContainer({ children, direction }: CardContainerProps): JSX.Element {
  return <CardContainerWrapper direction={direction}>{children}</CardContainerWrapper>;
}
