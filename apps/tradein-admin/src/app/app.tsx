import { NotFound, PrivateRoute, PublicRoute } from '@tradein-admin/libs';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  ActionablesPage,
  DashboardPage,
  DiscrepancyPage,
  EditOrderPage,
  EditProductPage,
  LoginPage,
  OrderManagementPage,
  PaymentsPage,
  ProductManagementPage,
  PromotionClaimsPage,
  PromotionsPage,
  UserManagementPage,
} from './pages';
import { ConfigurationsPage } from './pages/configurations';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Will redirect unauthenticated users to /login */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/" element={<DashboardPage />} />
          <Route
            path="/dashboard/product"
            element={<ProductManagementPage />}
          />
          <Route path="/dashboard/product/:id" element={<EditProductPage />} />
          <Route path="/dashboard/order/:id" element={<EditOrderPage />} />
          <Route
            path="/dashboard/order/list"
            element={<OrderManagementPage />}
          />
          <Route
            path="/dashboard/order/discrepancy"
            element={<DiscrepancyPage />}
          />
          <Route
            path="/dashboard/order/actionables"
            element={<ActionablesPage />}
          />
          <Route path="/dashboard/user" element={<UserManagementPage />} />
          <Route
            path="/dashboard/promotion/list"
            element={<PromotionsPage />}
          />
          <Route
            path="/dashboard/promotion/claims"
            element={<PromotionClaimsPage />}
          />
          <Route
            path="/dashboard/promotion/payment"
            element={<PaymentsPage />}
          />
          <Route
            path="/dashboard/configurations"
            element={<ConfigurationsPage />}
          />
        </Route>

        {/* Will redirect authenticated users to /dashboard */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
