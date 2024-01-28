import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
`;

const PageContainer: React.FC<ContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PageContainer;
