import styled from 'styled-components';

interface TabProps {
  label: string;
  children: React.ReactNode;
}

const TabWrapper = styled.div`
  display: inline;
`;

export function Tab({ children }: TabProps) {
  return <TabWrapper>{children}</TabWrapper>;
}
