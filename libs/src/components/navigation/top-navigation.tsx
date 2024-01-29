/* eslint-disable @typescript-eslint/no-explicit-any */
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { capitalizeFirstLetter, getInitials } from '../../helpers'
import { useAuth } from '../../store'
import { Avatar } from '../avatar'

interface DropdownContentProps {
  isVisible: boolean
}

const StyledIcon = styled(FontAwesomeIcon)`
  color: #01463a;
  width: 14px;
  height: 14px;
`

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
  color: #01463a;
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
`

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
`

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
`

const DropdownItem = styled.div`
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #333;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #01463a;
    color: #ffffff;
  }
`

export function TopNavBar(): JSX.Element {
  const { state, setActivePlatform } = useAuth()

  const { activePlatform, userDetails } = state.auth

  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef?.current?.contains(event.target)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <TopLeft>
          <DropdownContainer>
            <DropdownButton
              onClick={() => setIsExpanded(true)}
              aria-expanded={isExpanded}
              aria-haspopup="true"
            >
              <Logo>{capitalizeFirstLetter(activePlatform)}</Logo>
              <StyledIcon icon={faCaretDown} />
            </DropdownButton>
            <DropdownMenu isVisible={isExpanded} ref={dropdownRef}>
              {userDetails?.platforms?.map((option: any, index: number) => {
                return (
                  <DropdownItem
                    key={index}
                    onClick={() => {
                      setActivePlatform(option)
                      setIsExpanded(false)
                    }}
                  >
                    {capitalizeFirstLetter(option)}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </DropdownContainer>
        </TopLeft>
        <TopRight>
          <Avatar
            initials={getInitials(
              userDetails?.first_name + ' ' + userDetails?.last_name,
            )}
          />
        </TopRight>
      </NavbarWrapper>
    </NavbarContainer>
  )
}
