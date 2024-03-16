/* eslint-disable @typescript-eslint/no-explicit-any */
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

interface CustomButtonProps {
  isLoading?: boolean;
  icon?: any;
  width?: string;
  padding?: string;
  disabled?: boolean;
  type?: any;
  onClick?: () => void;
  variant?: 'outlined' | 'fill' | 'text';
  children: React.ReactNode;
}

const StyledButton = styled.button<CustomButtonProps>`
  width: ${(props) => (props.width ? props.width : '100%')};
  padding: ${(props) => (props.padding ? props.padding : '8px 20px')};
  color: ${(props) =>
    props.variant === 'text' ? '#01463A' : props.variant === 'outlined' ? '#01463A' : '#fff'};
  background: ${(props) => {
    if (props.variant === 'outlined' || props.variant === 'text') return 'transparent';
    return 'linear-gradient(to right, #216A4C, #01463A)';
  }};
  border: ${(props) =>
    props.variant === 'text' ? 'none' : '1px solid #01463A'};
  border-radius: 4px;
  cursor: ${(props) => (props.isLoading ? 'not-allowed' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  white-space: nowrap;
  opacity: ${(props) => (props.isLoading ? '50%' : '100%')};
  font-size: 13.3333px;
  font-weight: normal;

  &:disabled {
    cursor: not-allowed;
    opacity: 50%;
  }

  &:hover {
    opacity: ${(props) => (props.disabled ? '50%' : '90%')}
  }

  svg {
    margin-right: 8px;
    font-size: 13.3333px;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  margin-right: 8px;
`;

const LoadingSpinner = styled(FontAwesomeIcon)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export function AppButton({
  isLoading = false,
  icon,
  width,
  padding,
  disabled,
  type,
  onClick,
  variant = 'fill',
  children,
}: CustomButtonProps) {
  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    }
  };

  return (
    <StyledButton
      isLoading={isLoading}
      width={width}
      padding={padding}
      onClick={handleClick}
      disabled={disabled || isLoading}
      type={type}
      variant={variant}
    >
      {isLoading && <LoadingSpinner icon={faSpinner} />}
      {icon && !isLoading && <StyledIcon icon={icon} />}
      {children}
    </StyledButton>
  );
}

