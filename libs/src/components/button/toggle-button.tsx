import styled from 'styled-components';

interface ToggleButtonProps {
  name: string;
  label: string;
  isOn: boolean;
  onToggle: () => void;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.button`
  width: 36px;
  height: 18px;
  border-radius: 15px;
  background-color: ${({ isOn }: { isOn: boolean }) => (isOn ? '#216A4C' : '#ccc')};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: ${({ isOn }: { isOn: boolean }) => (isOn ? '18px' : '2px')};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    transition: left 0.3s;
  }
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: inherit;
`;

export function ToggleButton({ name, label, isOn, onToggle }: ToggleButtonProps): JSX.Element {
  return (
    <StyledContainer>
      <StyledLabel>
        {label}
      </StyledLabel>
      <ButtonWrapper name={name} isOn={isOn} onClick={onToggle} type='button' />
    </StyledContainer>
  );
}
