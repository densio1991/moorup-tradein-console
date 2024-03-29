import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AccordionInnerContainer = styled.div`
  margin: 4px 0px;
`;

export const AccordionHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const AccordionHeader = styled.div<{ isOpen?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 12px;
  cursor: pointer;
  box-shadow: 0px 2px 4px 1px #ccc;
  width: 100%;
  margin-bottom: 4px;
`;

export const AccordionTitle = styled.span`
  font-size: 16px;
  padding: 8px;
  font-weight: bold;
`;

export const AccordionContent = styled.div<{ isOpen?: boolean, removePadding?: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  padding: ${(props) => (props.removePadding ? '0' : '10px')};
  box-sizing: border-box;
`;

export const StyledIcon = styled(FontAwesomeIcon)<{
  color?: string;
  hovercolor?: string;
  disabled?: boolean;
}>`
  color: ${(props) => (props.color ? props.color : 'inherit')};
  margin: 0 4px;

  &:hover {
    color: ${(props) => (props.disabled ? props.color : props.hovercolor ? props.hovercolor : 'inherit')};
    cursor: ${(props) => (props.disabled ? '' : 'pointer')};
  }
`;
