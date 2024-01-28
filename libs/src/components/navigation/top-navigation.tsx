import React from 'react';
import styled from 'styled-components';

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

const Avatar = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
`

export function TopNavBar(): JSX.Element {
  return (
    <NavbarContainer>
      <NavbarWrapper>
        <TopLeft>
          <Logo>Moorup</Logo>
        </TopLeft>
        <TopRight>
          <Avatar src="https://ui-avatars.com/api/?background=0D8ABC&color=#01463a" />
        </TopRight>
      </NavbarWrapper>
    </NavbarContainer>
  );
}
