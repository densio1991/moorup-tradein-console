/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DetailCardContainer,
  OrderItemStatus,
  OrderItems,
  Badge,
  parseStatus,
  formatDate,
  useOrder,
  CopyToClipboardButton,
  DataLine,
} from '@tradein-admin/libs';

type CardItemProps = {
  label: string;
  value: any;
  copy?: boolean;
};

export const CardItem = ({ label, value, copy }: CardItemProps) => {
  return (
    <DataLine>
      <dl>{label}</dl>
      <dt>
        {value || '---'}
        {copy && value && <CopyToClipboardButton textToCopy={value} />}
      </dt>
    </DataLine>
  );
};

const QuoteDetails = () => {
  const { state, cancelOrderById } = useOrder();
  const { order = {}, giftCard = {}, isUpdatingOrder } = state;

  const user_id = order?.user_id || {};
  const address = order?.address || {};
  const order_items = order?.order_items || [];
  const payment = order?.payment || {};
  const { bank_details = {} } = user_id;

  const creditType: any = {
    'post-assessment': 'Post Assessment',
    post_assessment: 'Post Assessment',
    upfront: 'Upfront',
    online: 'Online',
  };

  const completeAddress = [
    address?.line_1,
    address?.suburb,
    address?.city,
    address?.zipcode,
    address?.state,
  ].join(', ');
  const accountName = bank_details ? bank_details[0]?.account_name : '';
  const fullName = `${user_id?.first_name} ${user_id?.last_name}`;

  const products = order_items.map((item: OrderItems, idx: number) => {
    return <Badge key={idx}>{item?.product_name}</Badge>;
  });

  const giftCardStatus = () => {
    return <div className="flex">{giftCard?.status}</div>;
  };

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
      <DetailCardContainer className="lg:col-span-2 2xl:col-span-1">
        <h4>Quote Information</h4>
        <CardItem label="Quote #" value={order.order_number} copy />
        <CardItem label="Quote Status" value={parseStatus(order.status)} />
        <CardItem
          label="Products"
          value={<div className="flex flex-wrap gap-1">{products}</div>}
        />
        <CardItem label="Date Created" value={formatDate(order.createdAt)} />
        <CardItem label="Last Updated" value={formatDate(order.updatedAt)} />
      </DetailCardContainer>
      <DetailCardContainer className="lg:col-span-1">
        <h4>Account Information</h4>
        <CardItem label="Name" value={fullName} copy />
        <CardItem label="Address" value={completeAddress} copy />
        <CardItem label="Email" value={user_id?.email} copy />
        <CardItem
          label="Email Verified"
          value={user_id?.is_verified ? 'Yes' : 'No'}
        />
        <CardItem label="Mobile" value={user_id?.mobile_number} copy />
        <CardItem label="Account" value={accountName} copy />
      </DetailCardContainer>
      <DetailCardContainer className="lg:col-span-1">
        <h4>Payment Details</h4>
        <CardItem
          label="Credit Timeframe"
          value={creditType[order.credit_type]}
        />
        <CardItem label="Payment Status" value={payment.payment_status} />
        <CardItem label="Payment Type" value={payment?.payment_type} />
        <CardItem label="BSB & Account" value={user_id?.bsb_account} copy />
        <CardItem label="Gift Card Status" value={giftCardStatus()} />
        {order?.status !== OrderItemStatus.CANCELLED && (
          <div className="flex gap-2 pt-2 mt-auto">
            <button
              className="text-md font-medium text-white bg-red-500 py-1 px-3 rounded-md hover:bg-red-600"
              onClick={() => cancelOrderById(order?._id)}
              disabled={isUpdatingOrder}
            >
              Cancel Order
            </button>
          </div>
        )}
      </DetailCardContainer>
    </div>
  );
};

export default QuoteDetails;
