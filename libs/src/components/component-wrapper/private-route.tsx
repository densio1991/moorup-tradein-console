/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { validateExpiry } from '../../helpers';
import { usePermission } from '../../hooks';
import { useAuth } from '../../store';
import { SideBar, TopNavBar } from '../navigation';
import { CardContainer } from './card-container';
import { PageContainer } from './page-container';
import { ComponentWrapper } from './wrapper';

interface Permissions {
  [path: string]: boolean;
}

export function PrivateRoute(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    state, setLoading,
  } = useAuth();

  const {
    expiry,
    userDetails,
  } = state

  const {
    hasViewDashboardPermission,
    hasViewProductsPermission,
    hasViewOrdersPermission,
    hasViewDiscrepanciesPermission,
    hasViewActionablesPermission,
    hasViewPromotionsPermission,
    hasViewPromotionClaimsPermission,
    hasViewPromotionClaimsPaymentPermission,
    hasViewUsersPermission,
    hasViewPlatformConfigsPermissions,
  } = usePermission();

  useEffect(() => {
    if (!isEmpty(userDetails)) {
      const permissions: Permissions = {
        '/dashboard': hasViewDashboardPermission,
        '/dashboard/product': hasViewProductsPermission,
        '/dashboard/order/list': hasViewOrdersPermission,
        '/dashboard/order/discrepancy': hasViewDiscrepanciesPermission,
        '/dashboard/order/actionables': hasViewActionablesPermission,
        '/dashboard/promotion/list': hasViewPromotionsPermission,
        '/dashboard/promotion/claims': hasViewPromotionClaimsPermission,
        '/dashboard/promotion/payment': hasViewPromotionClaimsPaymentPermission,
        '/dashboard/user': hasViewUsersPermission,
        '/dashboard/configurations': hasViewPlatformConfigsPermissions,
      };

      let redirectTo = null;

      // Check if user has permission for the current path
      if (!permissions[pathname]) {
        // If user doesn't have permission for current path, find the first path with permissions
        Object.entries(permissions).some(([path, permission]) => {
          if (permission) {
            redirectTo = path;
            return true; // Stop iterating once a path with permissions is found
          }
          return false;
        });
      } else {
        redirectTo = pathname;
      }

      if (!redirectTo) {
        // If no path with permissions found, default to '/404'
        redirectTo = '/404';
      }

      setLoading(false);
      navigate(redirectTo);
    }
  }, [userDetails])

  if (!validateExpiry(expiry)) {
    return <Navigate to="/" />;
  }
  
  return (
    <ComponentWrapper>
      <PageContainer>
        <SideBar />
        <CardContainer>
          <TopNavBar />
          <Outlet />
        </CardContainer>
      </PageContainer>
    </ComponentWrapper>
  );
}
