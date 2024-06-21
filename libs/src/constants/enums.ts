export enum OrderStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  DELETED = 'deleted',
}

export enum OrderItemStatus {
  CREATED = 'created',
  CANCELLED = 'cancelled',
  RECEIVED = 'received',
  LABEL_SENT = 'label-sent',
  EVALUATED = 'evaluated',
  COMPLETED = 'completed',
  DELETED = 'deleted',
  FOR_REVISION = 'for-revision',
  REVISED = 'revised',
  REVISION_REJECTED = 'revision-rejected',
  HOLD = 'hold',
  DEVICE_RETURED = 'device-returned',
}

export enum DropdownOrderItemStatus {
  RECEIVED = 'received',
  EVALUATED = 'evaluated',
  COMPLETED = 'completed',
  FOR_REVISION = 'for-revision',
}

export enum OrderPaymentStatus {
  PENDING = 'pending',
}

export enum ClaimStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  COMPLETED = 'completed',
  PROCESSING = 'processing'
}

export enum DefaultStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum PromotionStatus {
  ENDED = 'ended',
  NOT_STARTED = 'not_started',
  ONGOING = 'ongoing',
}

export enum OrderTypes {
  ONLINE = 'online',
  INSTORE = 'in-store',
  IN_STORE = 'in_store'
}

export enum CreditTypes {
  UPFRONT = 'upfront',
  POSTASSESSMENT = 'post-assessment',
  POST_ASSESSMENT = 'post_assessment',
}

export enum ProductTypes {
  LAPTOPS = 'laptops',
  TABLETS = 'tablets',
  PHONES = 'phones',
  WATCHES = 'watches',
}

export enum ConfirmationModalTypes {
  APPROVE_CLAIM_REGULAR = 'APPROVE_CLAIM_REGULAR',
  REJECT_CLAIM_REGULAR = 'REJECT_CLAIM_REGULAR',
  OVERRIDE_CLAIM_STATUS = 'OVERRIDE_CLAIM',
  BULK_APPROVE_CLAIM_REGULAR = 'BULK_APPROVE_CLAIM_REGULAR',
  BULK_PROCESS_CLAIM_PAYMENT = 'BULK_PROCESS_CLAIM_PAYMENT',
}

export enum PermissionCodes {
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
  VIEW_PRODUCTS = 'VIEW_PRODUCTS',
  ADD_PRODUCT = 'ADD_PRODUCT',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  IMPORT_PRODUCTS = 'IMPORT_PRODUCTS',
  EXPORT_PRODUCTS = 'EXPORT_PRODUCTS',
  EXPORT_PRODUCT_UPLOAD_TEMPLATE = 'EXPORT_PRODUCT_UPLOAD_TEMPLATE',
  VIEW_ORDERS = 'VIEW_ORDERS',
  VIEW_ORDER_DETAILS = 'VIEW_ORDER_DETAILS',
  EDIT_IMEI_SERIAL = 'EDIT_IMEI_SERIAL',
  RESEND_LABEL = 'RESEND_LABEL',
  MARK_AS_RECEIVED = 'MARK_AS_RECEIVED',
  UPDATE_ORDER_ITEM_STATUS = 'UPDATE_ORDER_ITEM_STATUS',
  CANCEL_ITEM = 'CANCEL_ITEM',
  CANCEL_GIFT_CARDS = 'CANCEL_GIFT_CARDS',
  ADD_ORDER_CLAIMS = 'ADD_ORDER_CLAIMS',
  VIEW_DISCREPANCIES = 'VIEW_DISCREPANCIES',
  VIEW_ACTIONABLES = 'VIEW_ACTIONABLES',
  PRINT_LABEL = 'PRINT_LABEL',
  VIEW_USERS = 'VIEW_USERS',
  ADD_USER = 'ADD_USER',
  EDIT_USER_DETAILS = 'EDIT_USER_DETAILS',
  EDIT_USER_PERMISSIONS = 'EDIT_USER_PERMISSIONS',
  VIEW_PROMOTIONS = 'VIEW_PROMOTIONS',
  ADD_PROMOTION = 'ADD_PROMOTION',
  EDIT_PROMOTION = 'EDIT_PROMOTION',
  VIEW_PROMOTION_CLAIMS = 'VIEW_PROMOTION_CLAIMS',
  UPDATE_PROMOTION_CLAIM = 'UPDATE_PROMOTION_CLAIM',
  VIEW_PROMOTION_CLAIMS_PAYMENT = 'VIEW_PROMOTION_CLAIMS_PAYMENT',
  PROCESS_PROMOTION_CLAIM_PAYMENT = 'PROCESS_PROMOTION_CLAIM_PAYMENT',
  VIEW_PLATFORM_CONFIGS = 'VIEW_PLATFORM_CONFIGS',
  EDIT_PLATFORM_CONFIGS = 'EDIT_PLATFORM_CONFIGS',
}

export enum ProductUploadLogsStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}
