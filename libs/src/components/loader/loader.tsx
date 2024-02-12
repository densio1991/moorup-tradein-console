import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from './spinner';

interface LoaderContainerProps {
  loading: boolean;
  color?: string;
  children: React.ReactNode;
  title?: string;
}

const StyledLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
`;

const StyledPrimaryText = styled.span`
  color: #01463a;
  font-weight: bold;
`;

export function LoaderContainer({ loading, color, children, title }: LoaderContainerProps) {
  return (
    <StyledLoaderContainer>
      {loading ? (
        <StyledOverlay>
          <LoadingSpinner color={color} />
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
