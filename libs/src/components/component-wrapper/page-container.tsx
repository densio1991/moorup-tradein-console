import { ReactNode } from 'react';
import styled from 'styled-components';

interface PageContainerProps {
  children: ReactNode;
  bgColor?: string;
  padding?: string;
}

const PageContainerWrapper = styled.div<{ bgColor?: string, padding?: string }>`
  display: flex;
  ${(props) => props.bgColor && `background-color: ${props.bgColor};`}
  ${(props) => props.padding && `padding: ${props.padding};`}
`;

export function PageContainer({ children, bgColor, padding }: PageContainerProps): JSX.Element {
  return <PageContainerWrapper bgColor={bgColor} padding={padding}>{children}</PageContainerWrapper>;
}
