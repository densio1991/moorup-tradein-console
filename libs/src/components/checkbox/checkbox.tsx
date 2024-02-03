/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledCheckboxLabel = styled.label`
  margin-left: 5px;
  font-size: 14px;
  color: inherit;
`;

const StyledCheckboxInput = styled.input`
  margin-left: 0px;
  margin-right: 5px;
  height: 16px;
  width: 16px;
  accent-color: #01463A;
`;

export function Checkbox({ label, checked, onChange }: CheckboxProps): JSX.Element {
  return (
    <StyledCheckboxContainer>
      <StyledCheckboxInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <StyledCheckboxLabel>{label}</StyledCheckboxLabel>
    </StyledCheckboxContainer>
  );
}
