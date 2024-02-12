import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTabContainer = styled.div`
  display: flex;
  margin: 20px 0px;
`;

const StyledTabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px 20px;
  background-color: transparent;
  color: ${({ active }) => (active ? '#01463a' : '#000')};
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? '#01463a' : '#ccc')};
  cursor: pointer;
  outline: none;
  transition: all 0.3s;

  &:hover {
    border-bottom: 2px solid #01463a;
  }
`;

const StyledTabContent = styled.div`
  margin-top: 20px;
`;

export function Tabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <StyledTabContainer>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <StyledTabButton
                key={index}
                active={index === activeTab}
                onClick={() => handleTabClick(index)}
              >
                {child.props.label}
              </StyledTabButton>
            );
          }
          return null;
        })}
      </StyledTabContainer>
      <StyledTabContent>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && index === activeTab) {
            return child;
          }
          return null;
        })}
      </StyledTabContent>
    </>
  );
}
