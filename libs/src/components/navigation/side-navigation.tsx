import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { SIDENAV_ITEMS } from '../../constants'
import { useAuth } from '../../store'

interface NavLinkProps {
  active?: boolean
}

const SidebarContainer = styled.div`
  height: calc(100vh - 50px);
  background-color: white;
  position: sticky;
  top: 50px;
  margin-top: 1px;
  border-top: 1px solid #f4f4f5;
  width: auto;
`

const SidebarWrapper = styled.div`
  padding: 0 20px;
  color: #555;

  @media screen and (max-width: 768px) {
    padding: 0px;
  }
`

const SidebarList = styled.ul`
  list-style: none;
  padding: 0px;
  border-bottom: 1px solid #e0e0e0;
`

const StyledIcon = styled(FontAwesomeIcon)`
  color: #01463a;
  width: 14px;
  height: 14px;
`

const NavLink = styled.a<NavLinkProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  color: ${(props) => (props.active ? 'white' : '#01463a')};
  background: ${(props) => (props.active ? 'linear-gradient(to right, #216A4C, #01463A)' : 'transparent')};
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  justify-content: start;

  @media screen and (max-width: 768px) {
    #label {
      display: none;
    }

    border-radius: 0px;;
  }

  &:hover {
    background: linear-gradient(to right, #216A4C, #01463A);
    color: white;

    svg {
      color: white;
    }
  }

  svg {
    color: ${(props) => (props.active ? 'white' : '#01463a')};
  }

  #label {
    margin-left: 8px;
  }
`

export function SideBar(): JSX.Element {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { logoutUser } = useAuth()

  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarList>
          {SIDENAV_ITEMS.map((item, index) => (
            <NavLink
              key={item.url}
              active={item.activeUrl?.test(pathname)}
              onClick={() => navigate(item.url)}
            >
              <span>
                <StyledIcon icon={item.icon} />
              </span>
              <span id="label" className="font-semibold text-sm flex">{item.title}</span>
            </NavLink>
          ))}
        </SidebarList>
        <NavLink onClick={() => logoutUser()}>
          <span>
            <StyledIcon icon={faRightFromBracket} />
          </span>
          <span id="label" className="font-semibold text-sm flex">Logout</span>
        </NavLink>
      </SidebarWrapper>
    </SidebarContainer>
  )
}
