/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/order */
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store';
import { validateExpiry } from '../../helpers';
import { ComponentWrapper } from './wrapper';
import { SideBar, TopNavBar } from '../navigation';
import PageContainer from './page-container';
import CardContainer from './card-container';

interface PrivateRouteProps {}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { expiry } = useAuth();

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
