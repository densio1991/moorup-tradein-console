import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  name: string; // Formik field name
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: inherit;
`;

const InputField = styled.input<{ error?: boolean }>`
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

export const StyledInput: React.FC<StyledInputProps> = ({
  label,
  type,
  placeholder,
  error,
  errorMessage,
  name,
  ...inputProps
}) => {

  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputField
        type={type}
        placeholder={placeholder}
        error={error}
        {...inputProps}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};
