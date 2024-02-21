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
  padding: 10px;
  cursor: pointer;
  box-shadow: 0px 1px 0px 0px #ccc;

  :first-child {
    width: 100%;
  }

  :last-child {
    padding: 0px;
    box-shadow: 0px 1px 1px 0px #ccc;
  }
`;

export const AccordionTitle = styled.span`
  font-size: 16px;
  padding: 8px;
  font-weight: bold;
`;

export const AccordionContent = styled.div<{ isOpen?: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  padding: 10px;
  box-sizing: border-box;
`;

export const StyledIcon = styled(FontAwesomeIcon)<{
  color?: string;
  hovercolor?: string;
  disabled?: boolean;
}>`
  color: ${(props) => (props.color ? props.color : 'inherit')};
  margin: 0 12px;

  &:hover {
    color: ${(props) => (props.hovercolor ? props.hovercolor : 'inherit')};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;