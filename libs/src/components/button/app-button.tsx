/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

interface CustomButtonProps {
  isLoading?: boolean;
  icon?: any;
  width?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button<CustomButtonProps>`
  width: ${(props) => (props.width ? props.width : '100%')};
  padding: 8px 20px;
  background-color: ${(props) => (props.isLoading ? '#ccc' : '#01463a')};
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
`;

export function AppButton({
  isLoading = false,
  icon,
  width,
  disabled,
  onClick,
  children,
}: CustomButtonProps) {
  return (
    <StyledButton
      isLoading={isLoading}
      width={width}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {icon && (
        <StyledIcon icon={icon} />
      )}
      {children}
    </StyledButton>
  );
}

