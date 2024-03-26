/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import {
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionHeaderContainer,
  AccordionInnerContainer,
  AccordionTitle,
  Badge,
  COLLECTION_ORDER_ITEM_STATUS,
  COMPLETION_ORDER_ITEM_STATUS,
  CopyToClipboardButton,
  DataLine,
  DetailCardContainer,
  LoaderContainer,
  OrderItemStatus,
  OrderItems,
  Shipments,
  StatusModal,
  StyledIcon,
  VALIDATION_ORDER_ITEM_STATUS,
  formatDate,
  parseStatus,
  useAuth,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Collection from './collection';
import Completion from './completion';
import { EditForm } from './status/edit-form';
import ValidationOffer from './validation-offer';

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

export const EditOrderPage = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const {
    state,
    fetchOrderById,
    fetchOrderShipments,
    cancelOrderById,
    patchOrderItemById,
    evaluateOrderItemById,
    // closeModal,
    resendShipmentLabel,
    clearOrder,
  } = useOrder();

  const { state: authState } = useAuth();
  const { activePlatform } = authState;

  const [accordionState, setAccordionState] = useState<AccordionStates>({
    quote: true,
    collection: true,
    validation: true,
    completion: true,
  } as AccordionStates);

  const [statusModal, setStatusModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({} as OrderItems);
  const [parsedShipments, setParsedShipments] = useState({});

  const {
    order = {},
    shipments = [],
    isUpdatingOrder,
    isFetchingOrder,
    isUpdatingImeiSerial,
  } = state;

  const user_id = order?.user_id || {};
  const address = order?.address || {};
  const order_items = order?.order_items || [];
  const payment = order?.payment || {};
  const { bank_details = {} } = user_id;

  const isSingleOrderFlow = order?.order_flow === 'single';

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

    return () => {
      controller.abort();
    };
  }, [order._id]);

  useEffect(() => {
    if (!isEmpty(order)) {
      if (order.platform !== activePlatform) {
        clearOrder();
        navigate('/dashboard/order/list');
      }
    }
  }, [activePlatform]);

  useEffect(() => {
    const formattedShipments = parseShipments();
    setParsedShipments(formattedShipments);
  }, [shipments]);

  const onUpdateStatus = (newValue: any) => {
    if (newValue.status === OrderItemStatus.FOR_REVISION) {
      const payload = {
        pass: false,
        revised_offer: newValue.revised_offer,
        reasons: newValue.reason?.split(','),
      };
      evaluateOrderItemById(newValue._id, payload);
    } else if (newValue.status === OrderItemStatus.EVALUATED) {
      evaluateOrderItemById(newValue._id, { pass: true });
    } else {
      patchOrderItemById(newValue._id, { status: newValue.status });
    }
    setSelectedItem({} as OrderItems);
  };

  const toggleAccordion = (item: any) => {
    setAccordionState((prev: any) => {
      return {
        ...prev,
        [item]: !prev[item],
      };
    });
  };

  const parseShipments = () => {
    const shippingItems: any = {};

    if (Array.isArray(shipments)) {
      shipments?.forEach((shipment: Shipments) => {
        if (shippingItems[shipment.item_id]) {
          shippingItems[shipment.item_id][shipment.direction] = shipment;
        } else {
          shippingItems[shipment.item_id] = {
            [shipment.direction]: shipment,
          };
        }
      });
    } else if (Array.isArray(shipments?.item_id)) {
      shipments?.item_id?.forEach((item_id: string) => {
        shippingItems[item_id] = {
          [shipments.direction]: shipments,
        };
      });
    } else {
      order_items?.forEach((item: OrderItems) => {
        shippingItems[item?._id] = {
          [shipments.direction]: shipments,
        };
      });
    }

    return shippingItems;
  };

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

  const collectionOrderItems = order_items.filter((item: OrderItems) =>
    COLLECTION_ORDER_ITEM_STATUS.includes(item.status as OrderItemStatus),
  );

  const validationOrderItems = order_items.filter((item: OrderItems) =>
    VALIDATION_ORDER_ITEM_STATUS.includes(item.status as OrderItemStatus),
  );

  const completionOrderItems = order_items.filter((item: OrderItems) =>
    COMPLETION_ORDER_ITEM_STATUS.includes(item.status as OrderItemStatus),
  );

  return (
    <LoaderContainer
      title="Order Details"
      loading={isFetchingOrder || isUpdatingOrder || isUpdatingImeiSerial}
    >
      <AccordionContainer className="px-4 pt-4">
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
            {!isSingleOrderFlow &&
              order?.status !== OrderItemStatus.CANCELLED && (
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
            <div className="grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
              <DetailCardContainer className="lg:col-span-2 2xl:col-span-1">
                <h4>Quote Information</h4>
                <CardItem label="Quote #" value={order.order_number} copy />
                <CardItem
                  label="Quote Status"
                  value={parseStatus(order.status)}
                />
                <CardItem
                  label="Products"
                  value={<div className="flex flex-wrap gap-1">{products}</div>}
                />
                <CardItem
                  label="Date Created"
                  value={formatDate(order.createdAt)}
                />
                <CardItem
                  label="Last Updated"
                  value={formatDate(order.updatedAt)}
                />
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
                <CardItem
                  label="Payment Status"
                  value={payment.payment_status}
                />
                <CardItem label="Payment Type" value={payment?.payment_type} />
                <CardItem
                  label="BSB & Account"
                  value={user_id?.bsb_account}
                  copy
                />
              </DetailCardContainer>
            </div>
          </AccordionContent>
          {collectionOrderItems.length > 0 && (
            <>
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
                {!isSingleOrderFlow &&
                  order?.status !== OrderItemStatus.CANCELLED && (
                    <div className="flex justify-end gap-2 mb-2">
                      <button
                        className="text-md font-medium text-white bg-emerald-500 py-1 px-3 rounded-md hover:bg-emerald-600"
                        onClick={() => resendShipmentLabel(order?._id)}
                        disabled={isUpdatingOrder}
                      >
                        Resend Label
                      </button>
                    </div>
                  )}
                <div className="max-w-full mx-auto">
                  <div className="overflow-x-auto max-w-full pb-2">
                    <Collection
                      orderId={order._id}
                      orderItems={collectionOrderItems}
                      shipments={parsedShipments}
                      isSingleOrderFlow={isSingleOrderFlow}
                      setStatusModal={setStatusModal}
                      setSelectedItem={setSelectedItem}
                    />
                  </div>
                </div>
              </AccordionContent>
            </>
          )}
          {validationOrderItems.length > 0 && (
            <>
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
                      orderId={orderId}
                      orderItems={validationOrderItems}
                      setStatusModal={setStatusModal}
                      setSelectedItem={setSelectedItem}
                    />
                  </div>
                </div>
              </AccordionContent>
            </>
          )}
          {completionOrderItems.length > 0 && (
            <>
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
                    <Completion
                      orderId={orderId}
                      orderItems={completionOrderItems}
                      setStatusModal={setStatusModal}
                      setSelectedItem={setSelectedItem}
                    />
                  </div>
                </div>
              </AccordionContent>
            </>
          )}
        </AccordionInnerContainer>
      </AccordionContainer>
      <StatusModal isOpen={statusModal}>
        {!isEmpty(selectedItem) && (
          <EditForm
            setStatusModal={(value) => {
              if (!value) setSelectedItem({} as OrderItems);
              setStatusModal(value);
            }}
            updateStatus={onUpdateStatus}
            orderItem={selectedItem}
          />
        )}
      </StatusModal>
    </LoaderContainer>
  );
};
