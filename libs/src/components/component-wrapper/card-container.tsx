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
  flex-direction: column;
  display: block;
  width: 100%;
  overflow-x: auto
`;

const CardContainer: React.FC<ContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CardContainer;
