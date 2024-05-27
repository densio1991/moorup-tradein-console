import styled, { keyframes } from 'styled-components';
import Logo from '../../Moorup.png';

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const BlinkingImage = styled.img`
  width: auto;
  height: 8rem;
  animation: ${blink} 1s linear infinite;
`;

export function LogoLoader() {
  return <BlinkingImage src={Logo} alt="Loading..." />;
}
