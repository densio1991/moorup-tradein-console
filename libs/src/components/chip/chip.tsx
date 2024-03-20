import styled from 'styled-components';

interface ChipProps {
  value: string;
  width?: string;
  bgColor?: string;
  textColor?: string;
}

const StyledChip = styled.span<{ value?: string; width?: string; bgColor?: string; textColor?: string }>`
  display: inline-block;
  border-radius: 4px;
  padding: 2px 20px;
  text-decoration: none;
  width: ${(props) => props.width ?? 'auto'};
  text-align: center;
  background-color: ${(props) => props.bgColor ?? '#216A4C'};
  color: ${(props) => props.textColor ?? 'white'};
`;

export function Chip({ value, textColor, bgColor, width }: ChipProps) {
  return <StyledChip value={value} textColor={textColor} bgColor={bgColor} width={width}>{value}</StyledChip>;
}
