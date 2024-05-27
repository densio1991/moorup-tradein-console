import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AppButton, CustomButtonProps } from './app-button';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div<{ visible: boolean; top: number; left: number }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background-color: #f9f9f9;
  min-width: 160px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 8px 0;
`;

const DropdownItem = styled.div<{ disabled?: boolean }>`
  padding: 8px 16px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.disabled ? '#aaa' : 'inherit')};
  &:hover {
    background-color: ${(props) => (props.disabled ? 'inherit' : '#eee')};
  }
`;

export function DropdownButton({
  id,
  isLoading = false,
  width,
  padding,
  disabled,
  type,
  variant = 'fill',
  children,
  dropdownItems = [],
}: CustomButtonProps & { dropdownItems: { label: string; onClick: () => void; disabled?: boolean }[] }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom, left: rect.left });
    }
  };

  const handleClick = () => {
    if (!disabled && !isLoading) {
      handleDropdownToggle();
    }
  };

  const handleDropdownToggle = () => {
    updateDropdownPosition();
    setDropdownVisible(!dropdownVisible);
  };

  const handleItemClick = (onClick: () => void, itemDisabled?: boolean) => {
    if (!itemDisabled) {
      onClick();
      setDropdownVisible(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      updateDropdownPosition();
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <DropdownContainer ref={buttonRef}>
      <AppButton
        id={id}
        isLoading={isLoading}
        icon={faCaretDown}
        width={width}
        padding={padding}
        disabled={disabled || isLoading}
        type={type}
        onClick={handleClick}
        variant={variant}
      >
        {children}
      </AppButton>
      {createPortal(
        <DropdownContent
          ref={dropdownRef}
          visible={dropdownVisible}
          top={dropdownPosition.top}
          left={dropdownPosition.left}
        >
          {dropdownItems.map((item, index) => (
            <DropdownItem 
              key={index} 
              disabled={item.disabled}
              onClick={() => handleItemClick(item.onClick, item.disabled)}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownContent>,
        document.body
      )}
    </DropdownContainer>
  );
}
