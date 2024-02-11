import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from './spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Overlay = styled.div`;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
  height: 100%;
`;

export function Loader({ loading, color, children }: { loading: boolean; color?: string; children: React.ReactNode }) {
  return (
    <Container>
      {loading ? (
        <Overlay>
          <LoadingSpinner color={color} />
        </Overlay>
      ) : (
        children
      )}
    </Container>
  );
}
