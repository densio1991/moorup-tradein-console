import { ReactNode } from 'react';
import styled from 'styled-components';

interface PageContainerProps {
  children: ReactNode;
}

const PageContainerWrapper = styled.div`
  display: flex;
`;

export function PageContainer({ children }: PageContainerProps): JSX.Element {
  return <PageContainerWrapper>{children}</PageContainerWrapper>;
}
