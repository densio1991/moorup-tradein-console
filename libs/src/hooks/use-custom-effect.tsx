/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useEffect, useRef } from 'react';

type EffectCallback = () => void;

export function useCustomEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    return effect();
  }, deps);
}

