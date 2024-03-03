import styled from 'styled-components';

interface AvatarProps {
  initials: string;
  size?: number;
}

const StyledAvatar = styled.div<{ size: number }>`
  display: none;

  @media (min-width: 769px) {
    display: flex;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    background: linear-gradient(to right, #216A4C, #01463A);
    color: #fff;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export function Avatar({ initials, size = 35 }: AvatarProps) {
  return <StyledAvatar size={size}>{initials}</StyledAvatar>;
}
