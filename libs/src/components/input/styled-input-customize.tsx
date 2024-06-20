/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty, isUndefined } from 'lodash';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledInputContainer = styled.div<{ error?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => (isUndefined(props.error) ? '0px' : '20px')};
  width: 100%;

  & > svg {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px 10px;
    color: #ccc;
    transition: 0.3s;
  }
  
  &.inputWithIcon {
    position: relative;
  }
`;

const StyledInputLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: inherit;
`;

const StyledInputField = styled.input<{ error?: boolean, name?: string }>`
  padding: 10px;
  border: 1px solid ${(props) => (props.error ? '#f44336' : '#ccc')};
  border-radius: ${(props) => (props.name === 'search' ? '20px' : '4px')}; /* Adjusted border-radius */
  outline: none;
  transition: border-color 0.2s ease-in-out;
  padding-right: 30px; /* Added padding for the icon */

  &:focus, &:hover {
    border-color: #01463a;
  }

  &::placeholder {
    color: #ccc;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
`;

const CustomizeLabel = styled.div`
  font-size: 12px;
  margin-top: 5px;
  text-align: right;
`;

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  name: string;
  enableHoverImage?: boolean;
  onCustomize: any;
  value: any;
}

export function StyledInputCustomize({
  label,
  type,
  placeholder,
  error,
  errorMessage,
  name,
  value,
  onBlur,
  onCustomize,
  ...inputProps
}: StyledInputProps): JSX.Element {

  return (
    <StyledInputContainer error={error}>
      {label && <StyledInputLabel>{label}</StyledInputLabel>}
      <StyledInputField
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
        error={error}
        value={value}
        name={name}
        disabled={true}
        {...inputProps}
      />
      <CustomizeLabel onClick={onCustomize}>Customize</CustomizeLabel>
      {!isUndefined(error) && error && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </StyledInputContainer>
  );
}
