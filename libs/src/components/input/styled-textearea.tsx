/* eslint-disable @typescript-eslint/no-explicit-any */
import { isUndefined } from 'lodash';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledTextareaContainer = styled.div<{ error?: boolean }>`
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

const StyledTextareaLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: inherit;
`;

const StyledTextareaField = styled.textarea<{ error?: boolean, name?: string }>`
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

interface StyledTextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  name: string;
  value: any;
  rows?: number;
}

export function StyledTextarea({
  label,
  type,
  placeholder,
  error,
  errorMessage,
  name,
  value,
  onBlur,
  rows = 5,
  ...inputProps
}: StyledTextareaProps): JSX.Element {
  return (
    <StyledTextareaContainer error={error}>
      {label && <StyledTextareaLabel>{label}</StyledTextareaLabel>}
      <StyledTextareaField
        placeholder={placeholder}
        onBlur={onBlur}
        error={error}
        name={name}
        value={value}
        rows={rows}
        {...inputProps}
      />
      {!isUndefined(error) && error && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </StyledTextareaContainer>
  );
}
