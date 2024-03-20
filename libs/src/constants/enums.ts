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
  BOX_SENT = 'box-sent',
  EVALUATED = 'evaluated',
  COMPLETED = 'completed',
  FOR_REVISION = 'for-revision',
  REVISED = 'revised',
}

export enum DropdownOrderItemStatus {
  CANCELLED = 'cancelled',
  EVALUATED = 'evaluated',
  COMPLETED = 'completed',
  FOR_REVISION = 'for-revision',
  REVISED = 'revised',
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
