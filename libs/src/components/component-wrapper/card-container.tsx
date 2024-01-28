import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  padding: 20px;
  margin: 20px;
`;

const CardContainer: React.FC<ContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CardContainer;
