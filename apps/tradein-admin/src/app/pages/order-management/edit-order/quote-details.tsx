/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DetailCardContainer,
  OrderItems,
  Badge,
  parseStatus,
  formatDate,
  useOrder,
  CopyToClipboardButton,
  DataLine,
  StyledIcon,
  amountFormatter,
  Modal,
} from '@tradein-admin/libs';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

type CardItemProps = {
  label: string;
  value: any;
  defaultValue?: string;
  copy?: boolean;
  capitalize?: boolean;
};

export const CardItem = ({
  label,
  value,
  defaultValue = '---',
  copy,
  capitalize = false,
}: CardItemProps) => {
  return (
    <DataLine>
      <dl>{label}</dl>
      <dt className={capitalize ? 'capitalize' : ''}>
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

const PAYMENT_TYPE: any = {
  voucher: 'Gift Card',
  bank: 'Bank',
};

const PAYMENT_STATUS: any = {
  unpaid: 'Unpaid',
  paid: 'paid',
  redeemed: 'Redeemed',
};

const QuoteDetails = () => {
  const { state, getGiftCardStatus, cancelGiftCard } = useOrder();
  const [voucherDetails, setVoucherDetails] = useState<any>([]);
  const {
    order = {},
    giftCard = {},
    isFetchingGiftCard,
    isUpdatingGiftCard,
  } = state;
  const [activeGiftCard, setActiveGiftCard] = useState<any>({});
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const userId = order?.user_id || {};
  const address = order?.address || {};
  const orderItems = order?.order_items || [];
  const payment = order?.payment || {};
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
  const hasGiftCard =
    payment?.payment_type === 'voucher' || !isEmpty(voucherDetails);

  const refreshGiftCardStatus = (voucher: any) => {
    const params = {
      pan: voucher?.pan,
      pin: voucher?.pin,
      txId: voucher?.txId,
      currency: voucher?.currency,
    };
    setActiveGiftCard(voucher);
    getGiftCardStatus(order?._id, params);
  };

  const onCancelGiftCard = () => {
    cancelGiftCard(order?._id, activeGiftCard?.itemNumber);
  };

  const giftCardStatus = (voucher: any) => {
    console.log(activeGiftCard, voucher);
    return (
      <div className="flex items-center justify-between gap-2">
        {(isFetchingGiftCard || isUpdatingGiftCard) &&
        voucher.pan === activeGiftCard?.pan ? (
          'Loading...'
        ) : (
          <>
            {voucher?.status || '---'}
            <div className="flex items-center gap-2">
              <StyledIcon
                icon={faRefresh}
                color="#666666"
                onClick={() => refreshGiftCardStatus(voucher)}
              />
              {voucher?.provider === 'ezipay' && (
                <button
                  className="bg-red-500 py-[2px] px-2 rounded text-xs text-white place-self-end self-end"
                  onClick={() => {
                    setActiveGiftCard(voucher);
                    setIsConfirmDialogOpen(true);
                  }}
                  disabled={isUpdatingGiftCard}
                >
                  Cancel
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (payment?.additional_info && payment?.additional_info?.length > 0) {
      // clarify how to handle multiple vouchers
      const vouchers: any = [];
      payment?.additional_info.forEach((voucher: any) => {
        const params = {
          pan: voucher?.voucherPan,
          pin: voucher?.voucherPin,
          txId: voucher?.voucherReference,
          currency: voucher?.voucherCurrency,
          amount: voucher?.voucherBalance,
          status: voucher?.voucherStatus,
          itemNumber: voucher?.voucherOrderNumber,
          provider: voucher?.voucherProvider,
        };
        vouchers.push(params);
      });
      setVoucherDetails(vouchers);
    }
  }, [order, payment]);

  useEffect(() => {
    if (!isEmpty(giftCard)) {
      let voucher = {};
      let index = -1;
      voucherDetails.forEach((item: any, idx: number) => {
        if (item.pan === activeGiftCard) {
          voucher = item;
          index = idx;
        }
      });
      if (index !== -1) {
        const vouchers = [...voucherDetails];
        vouchers[index] = {
          ...voucher,
          amount: giftCard?.balance?.currency?.balance,
          status: giftCard?.status || giftCard?.resulttext,
        };
        setVoucherDetails(vouchers);
      }
    }
  }, [giftCard]);

  return (
    <div
      className={`grid md:grid-cols-1 lg:grid-cols-2 gap-2 ${!hasGiftCard && '2xl:grid-cols-3'}`}
    >
      <DetailCardContainer className="lg:col-span-2 2xl:col-span-1">
        <h4>Quote Information</h4>
        <CardItem label="Quote #" value={order.order_number} copy />
        <CardItem label="Quote Status" value={parseStatus(order.status)} />
        <CardItem
          label="Products"
          value={<div className="flex flex-wrap gap-1">{products}</div>}
        />
        <CardItem
          label="Date Created"
          value={formatDate(order.createdAt, 'DD/MM/YYYY HH:mm A')}
        />
        <CardItem
          label="Last Updated"
          value={formatDate(order.updatedAt, 'DD/MM/YYYY HH:mm A')}
        />
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
          value={PAYMENT_STATUS[payment.payment_status]}
          defaultValue={PAYMENT_STATUS.unpaid}
          capitalize
        />
        <CardItem
          label="Payment Type"
          value={PAYMENT_TYPE[payment?.payment_type]}
          capitalize
        />
        <CardItem label="BSB & Account" value={userId?.bsb_account} copy />
      </DetailCardContainer>
      {hasGiftCard && (
        <DetailCardContainer className="lg:col-span-2 2xl:col-span-1">
          <h4>Gift Card</h4>
          <div className="w-full mx-auto">
            <div className="overflow-x-auto max-w-full pb-2 text-sm">
              <table className="w-full text-nowrap border-t-[1px]">
                <thead className="text-left font-semibold text-gray-700">
                  <td className="p-2">Order Item Number</td>
                  <td className="p-2">Card PAN</td>
                  <td className="p-2">Balance</td>
                  <td className="p-2">Status</td>
                </thead>
                {voucherDetails.map((voucher: any, idx: number) => (
                  <tr className="border-t-[1px]">
                    <td className="p-2">{voucher?.itemNumber}</td>
                    <td className="p-2">{voucher?.pan}</td>
                    <td className="p-2">
                      {amountFormatter(voucher?.amount / 100)}
                    </td>
                    <td className="p-2">{giftCardStatus(voucher)}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </DetailCardContainer>
      )}
      <Modal
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
      >
        <div className="flex flex-col p-6">
          <h2 className="mb-6">
            Are you sure you want to cancel the gift card?
          </h2>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-transparent hover:bg-red-50 text-red-700 font-medium py-1 px-3 border border-red-500 rounded"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              No
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 border border-red-500 rounded"
              onClick={() => {
                setIsConfirmDialogOpen(false);
                onCancelGiftCard();
              }}
            >
              Yes, cancel it
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuoteDetails;
