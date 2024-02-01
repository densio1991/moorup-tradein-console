import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: ReactNode;
}

const Container = styled.div`
display: flex;
`;

export const PageContainer: React.FC<ContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};
