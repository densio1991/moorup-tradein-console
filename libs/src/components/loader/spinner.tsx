import styled, { keyframes } from 'styled-components';

// Define keyframes for the spinner animation
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component for the spinner
const Spinner = styled.div<{ size?: string }>`
  box-sizing: border-box;
  display: block;
  position: relative;
  width: ${(props) => props.size || '40px'};
  height: ${(props) => props.size || '40px'};
  border: 4px solid ${(props) => props.color || '#01463a'};
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  z-index: 999;
`;

// LoadingSpinner component
export function LoadingSpinner({ size, color }: { size?: string; color?: string }) {
  return <Spinner size={size} color={color} />;
}
