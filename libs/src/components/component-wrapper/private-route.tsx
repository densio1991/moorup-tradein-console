import { Navigate, Outlet } from 'react-router-dom';
import { validateExpiry } from '../../helpers';
import { useAuth } from '../../store';
import { SideBar, TopNavBar } from '../navigation';
import CardContainer from './card-container';
import PageContainer from './page-container';
import { ComponentWrapper } from './wrapper';

interface PrivateRouteProps {}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {
    state,
  } = useAuth();

  const {
    expiry,
  } = state.auth

  if (!validateExpiry(expiry)) {
    return <Navigate to="/" />;
  }

  return (
    <ComponentWrapper>
      <TopNavBar />
      <PageContainer>
        <SideBar />
        <CardContainer>
          <Outlet />
        </CardContainer>
      </PageContainer>
    </ComponentWrapper>
  );
}
