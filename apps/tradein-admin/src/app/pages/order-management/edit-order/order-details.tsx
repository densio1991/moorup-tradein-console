import { OrderInterface } from '@tradein-admin/libs';
import React from 'react'

const OrderDetails = ({ order }: { order: OrderInterface }) => {

  const {
    user_id = {},
    payment = {},
    identification = {},
    order_items = [],
  } = order;
  const { address = {}, bank_details = {} } = user_id;

  const completeAddress =
    address.length > 0 ? `${address[0]?.region} ${address[0]?.state}` : '';
  const accountName = bank_details ? bank_details[0]?.account_name : '';
  const fullName = `${user_id?.first_name} ${user_id?.last_name}`;

  const products = order_items.map((item: OrderItems, idx) => {
    return <Badge key={idx}>{item?.product_name}</Badge>;
  });

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
      <DetailCardContainer className="md:col-span-1">
        <h4>Account Information</h4>
        <CardItem label="Name" value={fullName} />
        <CardItem label="Account" value={accountName} />
        <CardItem label="Address" value={completeAddress} />
        <CardItem label="Email" value={fullName} />
        <CardItem
          label="Email Verified"
          value={user_id.is_verified ? 'Yes' : 'No'}
        />
        <CardItem label="Mobile" value={user_id.mobile_number} />
      </DetailCardContainer>
      <DetailCardContainer>
        <h4>Quote Information</h4>
        <CardItem label="Quote #" value={order.order_number} />
        <CardItem label="Quote Status" value={order.status} />
        <CardItem label="Products" value={products} />
        <CardItem
          label="Date Created"
          value={formatDate(order.createdAt)}
        />
        <CardItem
          label="Last Updated"
          value={formatDate(order.updatedAt)}
        />
      </DetailCardContainer>
      <DetailCardContainer className="md:col-span-2 xl:col-span-1">
        <h4>Payment Details</h4>
        <CardItem label="Credit Timeframe" value={order.order_type} />
        <CardItem
          label="Payment Status"
          value={payment.payment_status}
        />
        <CardItem label="Payment Type" value={payment.payment_type} />
        <CardItem label="BSB & Account" value={user_id.bsb_account} />
        <h4>Identification</h4>
        <CardItem
          label="Identification"
          value={identification.id_state}
        />
        <CardItem
          label="Identification Type"
          value={identification.id_type}
        />
      </DetailCardContainer>
    </div>
  )
}

export default OrderDetails