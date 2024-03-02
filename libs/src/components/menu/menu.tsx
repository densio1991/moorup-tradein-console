/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const MenuIconContainer = styled.div`
  position: relative;
`;

const MenuIcon = styled(FontAwesomeIcon)`
  width: 14px;
  height: 14px;
  fill: currentColor;
  cursor: pointer;

  &:hover {
    color: #01463a;
    cursor: pointer;
  }
`;

const MenuList = styled.div`
  position: absolute;
  top: calc(100% - 2px);
  right: 0;
  background-color: #fff;
  border: 0px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 16px 0px;
  padding: 0;
  min-width: min-content;
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px 15px;
  cursor: pointer;
  text-align-last: left;
  border-radius: 4px;

  transition: background-color 0.3s ease;
  &:hover {
    background-color: #dff1f0;
    color: #01463a;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)<{ margin?: any }>`
  width: 14px;
  height: 14px;
  fill: currentColor;
  margin-right: ${(props) => (props.margin ? props.margin : '0px')};

  &:hover {
    color: #01463a;
    cursor: pointer;
  }
`;

interface MenuAction {
  label: string;
  action: () => void;
  icon?: any;
}

interface MenuProps {
  menuItems: MenuAction[];
  rowData: any;
}

export function StyledMenuIcon({ menuItems, rowData }: MenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (action: (rowData: any) => void, label: string) => {
    action(rowData);
  };

  return (
    <MenuIconContainer ref={menuRef}>
      <MenuIcon icon={faEllipsisV} onClick={toggleMenu} />
      {isMenuOpen && (
        <MenuList>
          {menuItems.map((item, index) => (
            <MenuItem key={index} onClick={() => handleMenuItemClick(item.action, item.label)}>
              {item.icon && <StyledIcon icon={item.icon} margin='8px' />}
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </MenuIconContainer>
  );
}
