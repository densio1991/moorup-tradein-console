import { ReactNode } from 'react';
import styled from 'styled-components';

interface CardContainerProps {
  children: ReactNode;
}

const CardContainerWrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  padding: 20px;
  margin: 10px;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
`;

export function CardContainer({ children }: CardContainerProps): JSX.Element {
  return <CardContainerWrapper>{children}</CardContainerWrapper>;
}
