/* eslint-disable @typescript-eslint/no-explicit-any */
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledIcon = styled(FontAwesomeIcon)`
  width: 14px;
  height: 14px;
  fill: currentColor;

  &:hover {
    color: #01463a;
    cursor: pointer;
  }
`;

const Menu = styled.div`
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  z-index: 1;
  top: 20px;
  right: 0;
`;

const MenuItem = styled.div`
  padding: 10px 10px;
  cursor: pointer;
  text-align-last: left;

  &:hover {
    background: #dff1f0;
  }
`;

interface MenuItem {
  label: string;
  icon: any;
  action: () => void;
}

export function StyledMenuIcon({
  menuItems,
  rowData,
}: {
  menuItems: MenuItem[];
  rowData: any;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = (action: (rowData: any) => void, label: string) => {
    action(rowData);
  };

  return (
    <div style={{ position: 'relative' }}>
      {showMenu && (
        <Menu ref={menuRef}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuItemClick(item.action, item.label)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      )}
      <StyledIcon icon={faEllipsisV} onClick={toggleMenu} />
    </div>
  );
}

