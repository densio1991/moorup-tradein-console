/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faAngleRight,
  faAngleUp,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  ADMIN,
  CUSTOMER_SERVICE,
  PRODUCTS,
  REGULAR,
  SIDENAV_ITEMS,
  SUPERADMIN,
  WAREHOUSE,
} from '../../constants';
import { useAuth, useCommon } from '../../store';
import { LoaderContainer } from '../loader';

interface NavLinkProps {
  active?: boolean;
  disabled?: boolean;
}

const SidebarContainer = styled.div`
  position: sticky;
  top: 50px;
  height: calc(100vh - 52px);
  background-color: white;
  border-top: 1px solid #f4f4f5;
  width: auto;
  min-width: 240px;
  z-index: 99;

  @media screen and (max-width: 1200px) {
    position: absolute;
    width: 100%;
    left: 0;
    height: auto;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 52px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 98;
  display: none;

  @media screen and (max-width: 1200px) {
    display: block;
    height: 100%;
  }
`;

const SidebarWrapper = styled.div`
  padding: 0px;
  color: #555;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0px;
  border-bottom: 1px solid #e0e0e0;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #01463a;
  width: 14px;
  height: 14px;
  margin-left: auto;
`;

const NavLink = styled.a<NavLinkProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.8rem 1rem;
  color: ${(props) =>
    props.active ? 'white' : props.disabled ? '#ccc' : '#01463a'};
  background: ${(props) =>
    props.active
      ? 'linear-gradient(to right, #216A4C, #01463A)'
      : props.disabled
        ? 'transparent'
        : 'transparent'};
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  justify-content: start;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  position: relative;

  &:hover {
    background: ${(props) =>
      props.disabled
        ? 'transparent'
        : 'linear-gradient(to right, #216A4C, #01463A)'};
    color: ${(props) => (props.disabled ? '#ccc' : 'white')};

    svg {
      color: ${(props) => (props.disabled ? '#ccc' : 'white')};
    }
  }

  svg {
    color: ${(props) =>
      props.active ? 'white' : props.disabled ? '#ccc' : '#01463a'};
  }

  #label {
    margin-left: 8px;
  }
`;

const SubMenu = styled.ul<{ active?: boolean }>`
  list-style: none;
  margin: 0px;
  padding: 0px 20px;
`;

const SubLink = styled.a<NavLinkProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.8rem 1rem;
  color: ${(props) =>
    props.active ? 'white' : props.disabled ? '#ccc' : '#01463a'};
  background: ${(props) =>
    props.active
      ? 'linear-gradient(to right, rgba(33, 106, 76, 0.7), rgba(1, 70, 58, 0.7))'
      : props.disabled
        ? 'transparent'
        : 'transparent'};
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  justify-content: start;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  position: relative;

  &:hover {
    background: ${(props) =>
      props.disabled
        ? 'transparent'
        : 'linear-gradient(to right, rgba(33, 106, 76, 0.7), rgba(1, 70, 58, 0.7))'};
    color: ${(props) => (props.disabled ? '#ccc' : 'white')};

    svg {
      color: ${(props) => (props.disabled ? '#ccc' : 'white')};
    }
  }

  svg {
    color: ${(props) =>
      props.active ? 'white' : props.disabled ? '#ccc' : '#01463a'};
  }

  #label {
    margin-left: 8px;
  }
`;

export function SideBar(): JSX.Element {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { state: authState, logoutUser } = useAuth();
  const { isFetchingUserDetails, userDetails } = authState;

  const { state: commonState, setShowSideNav } = useCommon();
  const { showSideNav } = commonState;

  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const toggleExpanded = (url: string) => {
    setExpandedItems((prevItems) =>
      prevItems.includes(url)
        ? prevItems.filter((item) => item !== url)
        : [...prevItems, url],
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredSideNavItems = SIDENAV_ITEMS.filter((item) => {
    switch (userDetails?.role) {
      case REGULAR:
        return item.title === 'Claims';

      case ADMIN:
        return [
          'Product Management',
          'Order Management',
          'Promotions',
          'Actionables',
        ].includes(item.title);

      case WAREHOUSE:
        return item.title === 'Order Management';

      case PRODUCTS:
        return item.title === 'Product Management';

      case CUSTOMER_SERVICE:
        return item.title === 'Product Management';

      case SUPERADMIN:
        return true;

      default:
        return false;
    }
  });

  const handleOnClick = (item: any) => {
    if (!isEmpty(item.submenu)) {
      toggleExpanded(item.url);
    } else {
      navigate(item.url);

      if (viewportWidth <= 1200) {
        setShowSideNav(false);
      }
    }
  }

  return (
    showSideNav && (
      <>
        <SidebarContainer>
          <LoaderContainer
            loading={isFetchingUserDetails || isEmpty(userDetails)}
          >
            <SidebarWrapper>
              <SidebarList>
                {filteredSideNavItems?.map((item) => (
                  <Fragment key={item.url}>
                    <NavLink
                      onClick={() => handleOnClick(item)}
                      active={item.activeUrl?.test(pathname)}
                      disabled={item.disabled}
                    >
                      <span>
                        <StyledIcon icon={item.icon} />
                      </span>
                      <span id="label" className="font-semibold flex">
                        {item.title}
                      </span>
                      {item.submenu && (
                        <StyledIcon
                          icon={
                            expandedItems.includes(item.url)
                              ? faAngleUp
                              : faAngleRight
                          }
                        />
                      )}
                    </NavLink>
                    {expandedItems.includes(item.url) && item.submenu && (
                      <SubMenu>
                        {item.submenu.map((subItem: any, index: number) => (
                          <SubLink
                            key={index}
                            active={subItem.activeUrl?.test(pathname)}
                            onClick={() => {
                              navigate(subItem.url);

                              if (viewportWidth <= 1200) {
                                setShowSideNav(false);
                              }
                            }}
                            disabled={subItem.disabled}
                          >
                            <span>
                              <StyledIcon icon={subItem.icon} />
                            </span>
                            <span id="label" className="font-semibold flex">
                              {subItem.title}
                            </span>
                          </SubLink>
                        ))}
                      </SubMenu>
                    )}
                  </Fragment>
                ))}
              </SidebarList>
              <NavLink onClick={() => logoutUser()}>
                <span>
                  <StyledIcon icon={faRightFromBracket} />
                </span>
                <span id="label" className="font-semibold flex">
                  Logout
                </span>
              </NavLink>
            </SidebarWrapper>
          </LoaderContainer>
        </SidebarContainer>
        <Overlay onClick={() => setShowSideNav(false)} />
      </>
    )
  );
}
