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
  HOLD = 'hold'
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
  REJECT = 'reject',
  CANCELLED = 'cancelled',
  DELETED = 'deleted'
}

export enum DefaultStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
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
