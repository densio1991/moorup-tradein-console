/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/order */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { validateExpiry } from '../../helpers';
import { useAuth } from '../../store';

interface PublicRouteProps {}

export function PublicRoute(props: PublicRouteProps): JSX.Element {
  const { expiry } = useAuth();

  if (validateExpiry(expiry)) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
