import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: start;
`;

const StyledCheckboxChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  margin-left: 20px;
`;

const StyledCheckboxLabel = styled.label`
  margin-left: 5px;
  font-size: 14px;
  color: inherit;
  cursor: pointer;
`;

const StyledCheckboxInput = styled.input`
  margin-left: 0px;
  height: 16px;
  width: 16px;
  accent-color: #01463a;
  cursor: pointer;
`;

const StyledSectionLabel = styled.span`
  text-align: left;
  margin-top: auto;
  color: #01463a;
  font-size: 16px;
  font-weight: 600;
`;

export function Checkbox({
  label,
  checked,
  onChange,
}: CheckboxProps): JSX.Element {
  return (
    <StyledCheckboxContainer>
      <StyledCheckboxInput
        type="checkbox"
        id={label.toLowerCase().replace(/\s/g, '-')}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <StyledCheckboxLabel htmlFor={label.toLowerCase().replace(/\s/g, '-')}>
        {label}
      </StyledCheckboxLabel>
    </StyledCheckboxContainer>
  );
}

interface ParentCheckboxProps {
  sectionLabel?: string;
  label: string;
  children: React.ReactNode;
  onChange: (checked: boolean) => void;
}

export function ParentCheckbox({
  sectionLabel,
  label,
  children,
  onChange,
}: ParentCheckboxProps): JSX.Element {
  const [checked, setChecked] = useState(false);
  const parentCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const childCheckboxes = React.Children.toArray(children).filter(
      (child) =>
        React.isValidElement(child) &&
        (child as React.ReactElement).type === Checkbox,
    ) as React.ReactElement[];

    const checkedCount = childCheckboxes.filter(
      (checkbox) => checkbox.props.checked,
    ).length;

    setChecked(checkedCount === childCheckboxes.length);

    if (parentCheckboxRef.current) {
      parentCheckboxRef.current.indeterminate =
        checkedCount > 0 && checkedCount < childCheckboxes.length;
    }
  }, [children]);

  return (
    <>
      {sectionLabel && <StyledSectionLabel>{sectionLabel}</StyledSectionLabel>}
      <StyledCheckboxContainer>
        <StyledCheckboxInput
          type="checkbox"
          id={label.toLowerCase().replace(/\s/g, '-')}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          ref={parentCheckboxRef}
        />
        <StyledCheckboxLabel htmlFor={label.toLowerCase().replace(/\s/g, '-')}>
          {label}
        </StyledCheckboxLabel>
      </StyledCheckboxContainer>
      <StyledCheckboxChildContainer>
        {children}

      </StyledCheckboxChildContainer>
    </>
  );
}

