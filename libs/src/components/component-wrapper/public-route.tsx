import { Navigate, Outlet } from 'react-router-dom';
import { validateExpiry } from '../../helpers';
import { useAuth } from '../../store';

interface PublicRouteProps {}

export function PublicRoute(props: PublicRouteProps): JSX.Element {
  const {
    state,
  } = useAuth();

  const {
    expiry,
  } = state

  if (validateExpiry(expiry)) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
