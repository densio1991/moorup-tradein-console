/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import {
  ReactNode,
  createContext,
} from 'react';

import { useAppReducer } from './globalReducer';

interface RootContextProps {
  state: any;
  dispatch: any;
}

export const RootContext = createContext<RootContextProps>({
  state: {},
  dispatch: () => {
    // Placeholder function; it will be replaced by the actual dispatch function
  },
});

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  // @ts-ignore
  const [state, dispatch] = useAppReducer();

  return (
    <RootContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}
