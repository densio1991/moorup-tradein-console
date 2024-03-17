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
