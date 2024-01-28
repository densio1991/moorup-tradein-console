import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { SIDENAV_ITEMS } from '../../constants';

interface NavLinkProps {
  isActive: boolean;
}

const SidebarContainer = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 50px;
  max-width: 270px;
  width: 100%;
  margin-top: 1px;
  border-top: 1px solid #F4F4F5;
`;
const SidebarWrapper = styled.div`
  padding: 0 20px;
  color: #555;
`;
const SidebarList = styled.ul`
  list-style: none;
  padding: 0px;
  border-bottom: 1px solid #E0E0E0;
`;

const Icon = styled.svg`
  width: 18px;
  height: 18px;
  fill: currentColor;
  margin-right: 1rem;
`;

const NavLink = styled.a<NavLinkProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  color: ${(props) => (props.isActive ? '#ffffff' : '#01463a')};
  background-color: ${(props) => (props.isActive ? '#01463a' : 'transparent')};
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    background-color: #01463a;
    color: #ffffff;
  }
`;

export function SideBar(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarList>
          {SIDENAV_ITEMS.map((item) => (
            <NavLink href={item.url} key={item.url} isActive={pathname === item.url}>
              <Icon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                {item.icon}
              </Icon>
              <span className="font-semibold text-sm flex">{item.title}</span>
            </NavLink>
          ))}
        </SidebarList>
      </SidebarWrapper>
    </SidebarContainer>
  );
}
