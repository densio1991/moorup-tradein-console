import { ReactNode } from 'react';
import styled from 'styled-components';

interface TabProps {
  label: string;
  children: ReactNode;
}

const StyledTab = styled.div`
  display: inline;
`;

export function Tab({ children }: TabProps) {
  return <StyledTab>{children}</StyledTab>;
}
