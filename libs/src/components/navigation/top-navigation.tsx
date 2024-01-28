/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalizeFirstLetter, getInitials } from '../../helpers';
import { useAppContext } from '../../store';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '../avatar';

interface DropdownContentProps {
  isVisible: boolean;
}

const NavbarContainer = styled.div`
    width: 100%;
    height: 45px;
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 999;
`
const NavbarWrapper = styled.div`
    height: 100%;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Logo = styled.span`
    font-weight: bold;
    font-size: 18px;
    color: #01463A;
    cursor: pointer;
`
const TopLeft = styled.div``
const TopRight = styled.div`
    display: flex;
    align-items: center;
`

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  background-color: #fff;
  border: 0px;
  border-radius: 0.375rem;
  cursor: pointer;
  padding: 8px;
`;

const DropdownIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  fill: #555;
`;

const DropdownMenu = styled.div<DropdownContentProps>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #333;
  cursor: pointer;
  border-radius: 8px;;

  &:hover {
    background-color: #01463a;
    color: #ffffff;
  }
`;

export function TopNavBar(): JSX.Element {
  const {
    state,
    setActivePlatform,
  } = useAppContext();

  const {
    activePlatform,
    userDetails,
  } = state;

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef?.current?.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <TopLeft>
          <DropdownContainer>
            <DropdownButton onClick={() => setIsExpanded(true)} aria-expanded={isExpanded} aria-haspopup="true">
              <Logo>{capitalizeFirstLetter(activePlatform)}</Logo>
              <DropdownIcon viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"></path>
              </DropdownIcon>
            </DropdownButton>
            <DropdownMenu isVisible={isExpanded} ref={dropdownRef}>
              {
                userDetails?.platforms?.map((option: any, index: number) => {
                  return (
                    <DropdownItem key={index} onClick={() => {
                      setActivePlatform(option);
                      setIsExpanded(false);
                    }}>
                      {capitalizeFirstLetter(option)}
                    </DropdownItem>
                  )
                })
              }
            </DropdownMenu>
          </DropdownContainer>
        </TopLeft>
        <TopRight>
          <Avatar initials={getInitials(userDetails?.first_name + " " + userDetails?.last_name)}/>
        </TopRight>
      </NavbarWrapper>
    </NavbarContainer>
  );
}
