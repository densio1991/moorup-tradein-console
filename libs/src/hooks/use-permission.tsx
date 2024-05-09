import { PermissionCodes } from '../constants';
import { useAuth } from '../store';

export function usePermission() {
  const { state } = useAuth();
  const { userDetails } = state;

  const permissions = userDetails?.permissions || [];
  const hasViewDashboardPermission = permissions.includes(PermissionCodes.VIEW_DASHBOARD);
  const hasViewProductsPermission = permissions.includes(PermissionCodes.VIEW_PRODUCTS);
  const hasAddProductPermission = permissions.includes(PermissionCodes.ADD_PRODUCT);
  const hasEditProductPermission = permissions.includes(PermissionCodes.EDIT_PRODUCT);
  const hasImportProductsPermission = permissions.includes(PermissionCodes.IMPORT_PRODUCTS);
  const hasExportProductsPermission = permissions.includes(PermissionCodes.EXPORT_PRODUCTS);
  const hasExportProductUploadTemplatePermission = permissions.includes(PermissionCodes.EXPORT_PRODUCT_UPLOAD_TEMPLATE);
  const hasViewOrdersPermission = permissions.includes(PermissionCodes.VIEW_ORDERS);
  const hasViewOrderDetailsPermission = permissions.includes(PermissionCodes.VIEW_ORDER_DETAILS);
  const hasEditIMEISerialPermission = permissions.includes(PermissionCodes.EDIT_IMEI_SERIAL);
  const hasResendLabelPermission = permissions.includes(PermissionCodes.RESEND_LABEL);
  const hasMarkAsReceivedPermission = permissions.includes(PermissionCodes.MARK_AS_RECEIVED);
  const hasUpdateOrderItemStatusPermission = permissions.includes(PermissionCodes.UPDATE_ORDER_ITEM_STATUS);
  const hasCancelItemPermission = permissions.includes(PermissionCodes.CANCEL_ITEM);
  const hasCancelGiftCardsPermission = permissions.includes(PermissionCodes.CANCEL_GIFT_CARDS);
  const hasAddOrderClaimsPermission = permissions.includes(PermissionCodes.ADD_ORDER_CLAIMS);
  const hasViewDiscrepanciesPermission = permissions.includes(PermissionCodes.VIEW_DISCREPANCIES);
  const hasViewActionablesPermission = permissions.includes(PermissionCodes.VIEW_ACTIONABLES);
  const hasPrintLabelPermission = permissions.includes(PermissionCodes.PRINT_LABEL);
  const hasViewUsersPermission = permissions.includes(PermissionCodes.VIEW_USERS);
  const hasAddUserPermission = permissions.includes(PermissionCodes.ADD_USER);
  const hasEditUserDetailsPermission = permissions.includes(PermissionCodes.EDIT_USER_DETAILS);
  const hasEditUserPermissionsPermission = permissions.includes(PermissionCodes.EDIT_USER_PERMISSIONS);
  const hasViewPromotionsPermission = permissions.includes(PermissionCodes.VIEW_PROMOTIONS);
  const hasAddPromotionPermission = permissions.includes(PermissionCodes.ADD_PROMOTION);
  const hasEditPromotionPermission = permissions.includes(PermissionCodes.EDIT_PROMOTION);
  const hasViewPromotionClaimsPermission = permissions.includes(PermissionCodes.VIEW_PROMOTION_CLAIMS);
  const hasUpdatePromotionClaimPermission = permissions.includes(PermissionCodes.UPDATE_PROMOTION_CLAIM);
  const hasViewPromotionClaimsPaymentPermission = permissions.includes(PermissionCodes.VIEW_PROMOTION_CLAIMS_PAYMENT);
  const hasProcessPromotionClaimPaymentPermission = permissions.includes(PermissionCodes.PROCESS_PROMOTION_CLAIM_PAYMENT);
  const hasViewPlatformConfigsPermissions = permissions.includes(PermissionCodes.VIEW_PLATFORM_CONFIGS);
  const hasEditPlatformConfigsPermissions = permissions.includes(PermissionCodes.EDIT_PLATFORM_CONFIGS);

  return {
    hasViewDashboardPermission,
    hasViewProductsPermission,
    hasAddProductPermission,
    hasEditProductPermission,
    hasImportProductsPermission,
    hasExportProductsPermission,
    hasExportProductUploadTemplatePermission,
    hasViewOrdersPermission,
    hasViewOrderDetailsPermission,
    hasEditIMEISerialPermission,
    hasResendLabelPermission,
    hasMarkAsReceivedPermission,
    hasUpdateOrderItemStatusPermission,
    hasCancelItemPermission,
    hasCancelGiftCardsPermission,
    hasAddOrderClaimsPermission,
    hasViewDiscrepanciesPermission,
    hasViewActionablesPermission,
    hasPrintLabelPermission,
    hasViewUsersPermission,
    hasAddUserPermission,
    hasEditUserDetailsPermission,
    hasEditUserPermissionsPermission,
    hasViewPromotionsPermission,
    hasAddPromotionPermission,
    hasEditPromotionPermission,
    hasViewPromotionClaimsPermission,
    hasUpdatePromotionClaimPermission,
    hasViewPromotionClaimsPaymentPermission,
    hasProcessPromotionClaimPaymentPermission,
    hasViewPlatformConfigsPermissions,
    hasEditPlatformConfigsPermissions,
  };
}
