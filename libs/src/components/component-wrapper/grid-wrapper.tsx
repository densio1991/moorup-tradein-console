import styled from 'styled-components';

const GridContainer = styled.div<{ columns: string; gap?: string }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, minmax(0, 1fr))`};
  gap: ${(props) => props.gap ?? '20px'};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media (min-width: 481px) and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StyledGridItem = styled.div<{ padding?: string; border?: string }>`
  padding: ${(props) => props.padding ?? '20px'};
  display: flex;
  flex-direction: column;
  ${(props) => props.border && `border: ${props.border};`}
`;

interface GridProps {
  children: React.ReactNode;
  columns: string;
  gap?: string;
}

export function Grid({ children, columns, gap }: GridProps): JSX.Element {
  return <GridContainer columns={columns} gap={gap}>{children}</GridContainer>;
}

interface GridItemProps {
  children: React.ReactNode;
  padding?: string;
  border?: string;
}

export function GridItem({ children, padding, border }: GridItemProps): JSX.Element {
  return <StyledGridItem padding={padding} border={border}>{children}</StyledGridItem>;
}
