/* eslint-disable @typescript-eslint/no-explicit-any */
import { faAngleDown, faAngleRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuItem, MenuItemStyles, Sidebar, SubMenu } from 'react-pro-sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../Moorup.png';
import {
  ADMIN,
  CUSTOMER_SERVICE,
  PRODUCTS,
  REGULAR,
  SIDENAV_ITEMS,
  SUPERADMIN,
  WAREHOUSE,
} from '../../constants';
import { hexToRgba } from '../../helpers';
import { useAuth, useCommon } from '../../store';
import { Typography } from '../typography';

const Image = styled.img`
  height: 6rem;
  width: 100%;
  display: block;
  object-fit: cover;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  padding: 0px 60px;
`;

const StyledIcon = styled(FontAwesomeIcon)``;

export function SideBar(): JSX.Element {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { state: authState, logoutUser } = useAuth();
  const { userDetails } = authState;

  const { state: commonState, setShowSideNav } = useCommon();
  const { showSideNav } = commonState;

  const filteredSideNavItems = SIDENAV_ITEMS.filter((item) => {
    switch (userDetails?.role) {
      case REGULAR:
        return item.title === 'Promotions';

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

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '14px',
      fontWeight: 600,
    },
    icon: {
      color: '#216A4C',
      '&.disabled': {
        color: '#ccc',
      },
      '&:hover': {
        color: 'white',
      },
      '&.ps-active': {
        color: 'white'
      }
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba('#fbfcfd', 1)
          : 'transparent',
    }),
    button: {
      '&.disabled': {
        color: '#9fb6cf',
      },
      '&:hover': {
        background: 'linear-gradient(to right, #216A4C, #01463A)',
        color: 'white',

        '& svg': {
          color: 'white'
        }
      },
      '&.ps-active': {
        background: 'linear-gradient(to right, #216A4C, #01463A)',
        color: 'white',

        '& svg': {
          color: 'white'
        }
      }
    },
  };

  return (
    <div style={{ display: 'flex', height: '100vh', zIndex: '999'}}>
      <Sidebar 
        toggled={showSideNav}
        onBackdropClick={() => setShowSideNav(false)}
        onBreakPoint={(broken) => setShowSideNav(!broken)}
        breakPoint="md"
        backgroundColor='white'
        rootStyles={{
          color: '#607489'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Image src={Logo} alt="" />
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ letterSpacing: '0.5px' }}
              >
                General
              </Typography>
            </div>
            <Menu
              menuItemStyles={menuItemStyles}
              renderExpandIcon={(params) => <StyledIcon icon={params.open ? faAngleDown : faAngleRight} />}
              transitionDuration={400}
            >
              {
                filteredSideNavItems?.map((item, index) => {
                  if (item.submenu) {
                    return (
                      <SubMenu 
                        label={item.title} 
                        key={index} 
                        icon={<StyledIcon icon={item.icon} />}
                        disabled={item.disabled}
                        defaultOpen
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <MenuItem 
                            key={subIndex} 
                            onClick={() => navigate(subItem.url)} 
                            active={subItem.activeUrl?.test(pathname)}
                            disabled={subItem.disabled}
                            icon={<StyledIcon icon={subItem.icon} />}
                          >
                            {subItem.title}
                          </MenuItem>
                        ))}
                      </SubMenu>
                    );
                  } else {
                    return (
                      <MenuItem 
                        key={index} 
                        onClick={() => navigate(item.url)} 
                        active={item.activeUrl?.test(pathname)}
                        icon={<StyledIcon icon={item.icon} />}
                        disabled={item.disabled}
                      >
                        {item.title}
                      </MenuItem>
                    )
                  }
                })
              }
            </Menu>
            <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '16px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ letterSpacing: '0.5px', opacity: 0.7 }}
              >
                Account
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem 
                key='logout' 
                onClick={() => logoutUser()} 
                icon={<StyledIcon icon={faArrowRightFromBracket} />}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
