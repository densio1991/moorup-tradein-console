import React from 'react';
import styled from 'styled-components';
import { LogoLoader } from './logo-loader';
import { LoadingSpinner } from './spinner';

interface LoaderContainerProps {
  loading: boolean;
  color?: string;
  children: React.ReactNode;
  title?: string;
  height?: string;
  margin?: string;
  padding?: string;
  bgColor?: string;
}

const StyledLoaderContainer = styled.div<{ height?: string; margin?: string; padding?: string; bgColor?: string }>`
  display: flex;
  flex-direction: column;
  height: ${({ height }) => (height ?? '100%')};
  background-color: ${({ bgColor }) => (bgColor ?? 'white')};
  overflow-y: auto;
  ${(props) => props.margin && `margin: ${props.margin};`}
  ${(props) => props.padding && `padding: ${props.padding};`}
`;

const StyledOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
  height: 100%;
`;

const StyledContainerTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: #000;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;

const StyledPrimaryText = styled.span`
  color: #01463a;
  font-weight: bold;
`;

export function LoaderContainer({ loading, color, children, title, height, margin, padding, bgColor }: LoaderContainerProps) {
  return (
    <StyledLoaderContainer height={height} margin={margin} padding={padding} bgColor={bgColor}>
      {loading ? (
        <StyledOverlay>
          <LogoLoader />
        </StyledOverlay>
      ) : (
        <>
          {title && (
            <StyledContainerTitle>
              <StyledPrimaryText>
                {title}
              </StyledPrimaryText>
            </StyledContainerTitle>
          )}
          {children}
        </>
      )}
    </StyledLoaderContainer>
  );
}

export const Loader = ({color}: {color?: string}) => {
  return (
    <StyledOverlay>
      <LoadingSpinner color={color} />
    </StyledOverlay>
  );
};
