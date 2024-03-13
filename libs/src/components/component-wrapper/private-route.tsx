/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import {
  ADMIN,
  CUSTOMER_SERVICE,
  PRODUCTS,
  REGULAR,
  SUPERADMIN,
  WAREHOUSE
} from '../../constants';
import { validateExpiry } from '../../helpers';
import { useAuth } from '../../store';
import { SideBar, TopNavBar } from '../navigation';
import { CardContainer } from './card-container';
import { PageContainer } from './page-container';
import { ComponentWrapper } from './wrapper';

export function PrivateRoute(): JSX.Element {
  const navigate = useNavigate();
  const {
    state, setLoading,
  } = useAuth();

  const {
    expiry,
    userDetails,
  } = state

  useEffect(() => {
    if (!isEmpty(userDetails)) {
      switch (userDetails?.role) {
        case REGULAR:
          setLoading(false);
          navigate('/dashboard/promotion');
          break;
  
        case ADMIN:
          setLoading(false);
          navigate('/dashboard/product');
          break;
  
        case WAREHOUSE:
          setLoading(false);
          navigate('/dashboard/order');
          break;
  
        case PRODUCTS:
          setLoading(false);
          navigate('/dashboard/product');
          break;
  
        case CUSTOMER_SERVICE:
          setLoading(false);
          navigate('/dashboard/product');
          break;
  
        case SUPERADMIN:
          setLoading(false);
          navigate('/dashboard');
          break;
  
        default:
          // Redirect to 404 if role is not valid
          setLoading(false);
          navigate('/404');
          break;
      }
    }
  }, [userDetails])

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
