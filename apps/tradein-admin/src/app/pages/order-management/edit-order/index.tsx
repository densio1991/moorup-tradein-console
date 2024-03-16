/* eslint-disable @typescript-eslint/no-explicit-any */
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import {
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionHeaderContainer,
  AccordionInnerContainer,
  AccordionTitle,
  StyledIcon,
  DataLine,
  DetailCardContainer,
  useOrder,
  formatDate,
  Badge,
  OrderItems,
  OrderItemStatus,
  LoaderContainer,
} from '@tradein-admin/libs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Collection from './collection';
import ValidationOffer from './validation-offer';
import Completion from './completion';

type AccordionHeadingProps = {
  id: any;
  title: string;
  isOpen: boolean;
  onToggle: (id: any) => void;
};

type AccordionStates = {
  quote: boolean;
  collection: boolean;
  validation: boolean;
  completion: boolean;
};

export const AccordionHeading = ({
  id,
  title,
  isOpen,
  onToggle,
}: AccordionHeadingProps) => {
  return (
    <AccordionHeader onClick={() => onToggle(id)} isOpen={isOpen}>
      <AccordionTitle>{title}</AccordionTitle>
      <StyledIcon
        icon={isOpen ? faAngleDown : faAngleUp}
        color={isOpen ? 'inherit' : '#ccc'}
      />
    </AccordionHeader>
  );
};

type CardItemProps = {
  label: string;
  value: any;
};
export const CardItem = ({ label, value }: CardItemProps) => {
  return (
    <DataLine>
      <dl>{label}</dl>
      <dt>{value || '---'}</dt>
    </DataLine>
  );
};

export const EditOrderPage = () => {
  const { id: orderId } = useParams();

  const {
    state,
    fetchOrderById,
    fetchOrderShipments,
    cancelOrderById,
    // patchOrderItemById,
    // evaluateOrderItemById,
    // closeModal,
  } = useOrder();

  const {
    order = {},
    shipments = {},
    isUpdatingOrder,
    isFetchingOrder,
    // isModalOpen,
    // activeOrderItem,
  } = state;

  const {
    user_id = {},
    payment = {},
    identification = {},
    order_items = [],
  } = order;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchOrderById(orderId, signal);
    // fetchOrderShipments(order._id, signal);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (order._id) {
      fetchOrderShipments(order._id, signal);
    }
  }, [order._id]);

  const [accordionState, setAccordionState] = useState<AccordionStates>({
    quote: true,
    collection: true,
    validation: true,
    completion: true,
  } as AccordionStates);

  const toggleAccordion = (item: any) => {
    setAccordionState((prev: any) => {
      return {
        ...prev,
        [item]: !prev[item],
      };
    });
  };

  const { address = {}, bank_details = {} } = user_id;

  const completeAddress =
    address.length > 0 ? `${address[0]?.region} ${address[0]?.state}` : '';
  const accountName = bank_details ? bank_details[0]?.account_name : '';
  const fullName = `${user_id?.first_name} ${user_id?.last_name}`;

  const products = order_items.map((item: OrderItems, idx: number) => {
    return <Badge key={idx}>{item?.product_name}</Badge>;
  });

  return (
    <LoaderContainer title="Order Details" loading={isFetchingOrder}>
      <AccordionContainer className="px-2">
        <AccordionInnerContainer key="Quote Creation">
          <AccordionHeaderContainer>
            <AccordionHeading
              id="quote"
              title="Quote Creation"
              isOpen={accordionState.quote}
              onToggle={() => toggleAccordion('quote')}
            />
          </AccordionHeaderContainer>
          <AccordionContent isOpen={accordionState.quote} key="Quote Creation">
            {order?.status !== OrderItemStatus.CANCELLED && (
              <div className="flex justify-end gap-2 mb-2">
                <button
                  className="text-md font-medium text-white bg-red-500 py-1 px-3 rounded-md hover:bg-red-600"
                  onClick={() => cancelOrderById(order?._id)}
                  disabled={isUpdatingOrder}
                >
                  Cancel Order
                </button>
              </div>
            )}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
              <DetailCardContainer className="md:col-span-1">
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
          </AccordionContent>
          <AccordionHeaderContainer>
            <AccordionHeading
              id="collection"
              title="Collection"
              isOpen={accordionState.collection}
              onToggle={() => toggleAccordion('collection')}
            />
          </AccordionHeaderContainer>
          <AccordionContent
            isOpen={accordionState.collection}
            removePadding={true}
            key="Collection"
          >
            <div className="max-w-full mx-auto">
              <div className="overflow-x-auto max-w-full pb-2">
                <Collection
                  orderId={orderId}
                  orderItems={order_items}
                  shipments={shipments}
                />
              </div>
            </div>
          </AccordionContent>
          <AccordionHeaderContainer>
            <AccordionHeading
              id="validation"
              title="Validation & Offer"
              isOpen={accordionState.validation}
              onToggle={() => toggleAccordion('validation')}
            />
          </AccordionHeaderContainer>
          <AccordionContent
            isOpen={accordionState.validation}
            removePadding={true}
            key="validation"
          >
            <div className="max-w-full mx-auto">
              <div className="overflow-x-auto max-w-full pb-2">
                <ValidationOffer
                  orderItems={order_items}
                  shipments={shipments}
                />
              </div>
            </div>
          </AccordionContent>
          <AccordionHeaderContainer>
            <AccordionHeading
              id="completion"
              title="Completion"
              isOpen={accordionState.completion}
              onToggle={() => toggleAccordion('completion')}
            />
          </AccordionHeaderContainer>
          <AccordionContent
            isOpen={accordionState.completion}
            removePadding={true}
            key="completion"
          >
            <div className="max-w-full mx-auto">
              <div className="overflow-x-auto max-w-full pb-2">
                <Completion orderItems={order_items} shipments={shipments} />
              </div>
            </div>
          </AccordionContent>
        </AccordionInnerContainer>
      </AccordionContainer>
    </LoaderContainer>
  );
};
