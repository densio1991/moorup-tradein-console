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
  StyledIcon,
} from '@tradein-admin/libs';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

type CardItemProps = {
  label: string;
  value: any;
  defaultValue?: string;
  copy?: boolean;
};

export const CardItem = ({
  label,
  value,
  defaultValue = '---',
  copy,
}: CardItemProps) => {
  return (
    <DataLine>
      <dl>{label}</dl>
      <dt>
        {value || defaultValue}
        {copy && value && <CopyToClipboardButton textToCopy={value} />}
      </dt>
    </DataLine>
  );
};

const CREDIT_TYPE: any = {
  'post-assessment': 'Post Assessment',
  post_assessment: 'Post Assessment',
  upfront: 'Upfront',
  online: 'Online',
};

const QuoteDetails = () => {
  const { state, cancelOrderById, getGiftCardStatus } = useOrder();
  const [voucherDetails, setVoucherDetails] = useState({});
  const {
    order = {},
    giftCard = {},
    isUpdatingOrder,
    isFetchingGiftCard,
  } = state;

  const userId = order?.user_id || {};
  const address = order?.address || {};
  const orderItems = order?.order_items || [];
  const payment = order?.payment || {};
  const voucherLinks = order?.voucher_links || [];
  const bankDetails = userId?.bank_details || [];

  const completeAddress = [
    address?.line_1,
    address?.suburb,
    address?.city,
    address?.zipcode,
    address?.state,
  ].join(', ');
  const accountName = bankDetails ? bankDetails[0]?.account_name : '';
  const fullName = `${userId?.first_name} ${userId?.last_name}`;
  const products = orderItems.map((item: OrderItems, idx: number) => {
    return <Badge key={idx}>{item?.product_name}</Badge>;
  });
  const hasGiftCard = payment?.payment_type === 'voucher' || !isEmpty(voucherDetails);

  const refreshGiftCardStatus = () => {
    const params: any = Object.assign({}, voucherDetails);
    delete params['amount'];

    getGiftCardStatus(order?._id, params);
  }

  const giftCardStatus = () => {
    return (
      <div className="flex items-center gap-2">
        {isFetchingGiftCard ? (
          'Loading...'
        ) : (
          <>
            {giftCard?.status || '---'}
            <StyledIcon
              icon={faRefresh}
              color="#666666"
              onClick={() => refreshGiftCardStatus()}
            />
          </>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (voucherLinks && voucherLinks.length > 1) {
      let voucher = JSON.parse(voucherLinks[1]);
      const params = {
        pan: voucher?.pincredentials?.pin,
        pin: voucher?.pincredentials?.scode,
        txId: voucher?.txid,
        currency: voucher?.currency,
      }
      if (isEmpty(voucherDetails)) {
        getGiftCardStatus(order?._id, params);
      }
      setVoucherDetails({
        amount: voucher?.balance?.currency?.balance,
        ...params,
      });

      console.log(voucher)
    }
  }, [voucherLinks]);

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
        <CardItem label="Date Created" value={formatDate(order.createdAt, 'DD/MM/YYYY HH:mm A')} />
        <CardItem label="Last Updated" value={formatDate(order.updatedAt, 'DD/MM/YYYY HH:mm A')} />
      </DetailCardContainer>
      <DetailCardContainer className="lg:col-span-1">
        <h4>Account Information</h4>
        <CardItem label="Name" value={fullName} copy />
        <CardItem label="Address" value={completeAddress} copy />
        <CardItem label="Email" value={userId?.email} copy />
        <CardItem
          label="Email Verified"
          value={userId?.is_verified ? 'Yes' : 'No'}
        />
        <CardItem label="Mobile" value={userId?.mobile_number} copy />
        <CardItem label="Account" value={accountName} copy />
      </DetailCardContainer>
      <DetailCardContainer className="lg:col-span-1">
        <h4>Payment Details</h4>
        <CardItem
          label="Credit Timeframe"
          value={CREDIT_TYPE[order.credit_type]}
        />
        <CardItem
          label="Payment Status"
          value={payment.payment_status}
          defaultValue="Unpaid"
        />
        <CardItem label="Payment Type" value={payment?.payment_type} />
        <CardItem label="BSB & Account" value={userId?.bsb_account} copy />
        {hasGiftCard && (
          <CardItem
            label="Gift Card Status"
            value={giftCardStatus()}
            defaultValue="Unpaid"
          />
        )}
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
