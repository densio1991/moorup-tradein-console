/* eslint-disable @typescript-eslint/no-explicit-any */
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

interface CustomButtonProps {
  isLoading?: boolean;
  icon?: any;
  width?: string;
  disabled?: boolean;
  type?: any;
  onClick?: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button<CustomButtonProps>`
  width: ${(props) => (props.width ? props.width : '100%')};
  padding: 8px 20px;
  background: ${(props) => (props.isLoading ? '#ccc' : 'linear-gradient(to right, #216A4C, #01463A)')};
  color: #fff;
  border: 1px solid #01463a;
  border-radius: 4px;
  cursor: ${(props) => (props.isLoading ? 'not-allowed' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:disabled {
    cursor: not-allowed;
    background-color: #ccc;
    border-color: #ccc;
  }

  &:hover {
    opacity: 90%;
  }

  svg {
    margin-right: 8px; 
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  margin-right: 8px;
`;

const LoadingSpinner = styled(FontAwesomeIcon)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export function AppButton({
  isLoading = false,
  icon,
  width,
  disabled,
  type,
  onClick,
  children,
}: CustomButtonProps) {
  return (
    <StyledButton
      isLoading={isLoading}
      width={width}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
    >
      {isLoading && <LoadingSpinner icon={faSpinner} />}
      {icon && !isLoading && (
        <StyledIcon icon={icon} />
      )}
      {children}
    </StyledButton>
  );
}
