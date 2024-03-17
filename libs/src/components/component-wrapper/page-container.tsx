import { ReactNode } from 'react';
import styled from 'styled-components';

interface PageContainerProps {
  children: ReactNode;
  bgColor?: string
}

const PageContainerWrapper = styled.div<{ bgColor?: string }>`
  display: flex;
  ${(props) => props.bgColor && `background-color: ${props.bgColor};`}
`;

export function PageContainer({ children, bgColor }: PageContainerProps): JSX.Element {
  return <PageContainerWrapper bgColor={bgColor}>{children}</PageContainerWrapper>;
}
