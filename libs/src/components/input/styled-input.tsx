import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  name: string;
}

const StyledInputContainer = styled.div<{ error?: boolean; }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => (props.error ? '0px' : '20px')};
  width: 100%;
`;

const StyledInputLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: inherit;
`;

const StyledInputField = styled.input<{ error?: boolean }>`
  padding: 10px;
  border: 1px solid ${(props) => (props.error ? '#f44336' : '#ccc')};
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
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

export function StyledInput({
  label,
  type,
  placeholder,
  error,
  errorMessage,
  name,
  onBlur,
  ...inputProps
}: StyledInputProps): JSX.Element {
  return (
    <StyledInputContainer error={error}>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledInputField
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
        error={error}
        {...inputProps}
      />
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </StyledInputContainer>
  );
}
