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
  COLLECTION_ORDER_ITEM_STATUS,
  VALIDATION_ORDER_ITEM_STATUS,
  COMPLETION_ORDER_ITEM_STATUS,
  LoaderContainer,
  OrderItemStatus,
  OrderItems,
  Shipments,
  StatusModal,
  StyledIcon,
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
import QuoteDetails from './quote-details';
import ClaimsList from './claims-list';

type AccordionStates = {
  quote: boolean;
  claims: boolean;
  collection: boolean;
  validation: boolean;
  completion: boolean;
};

type AccordionHeadingProps = {
  id: any;
  title: string;
  isOpen: boolean;
  action?: any;
  onToggle: (id: any) => void;
};

export const AccordionHeading = ({
  id,
  title,
  isOpen,
  action,
  onToggle,
}: AccordionHeadingProps) => {
  return (
    <AccordionHeader onClick={() => onToggle(id)} isOpen={isOpen}>
      <div className="flex justify-between items-center w-full pr-4">
        <AccordionTitle>{title}</AccordionTitle>
        {action}
      </div>
      <StyledIcon
        icon={isOpen ? faAngleDown : faAngleUp}
        color={isOpen ? 'inherit' : '#ccc'}
      />
    </AccordionHeader>
  );
};

export const ScrollableContainer = ({ children }: any) => {
  return (
    <div className="max-w-full mx-auto">
      <div className="overflow-x-auto max-w-full pb-2">{children}</div>
    </div>
  );
};

export const EditOrderPage = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const {
    state,
    fetchOrderById,
    fetchOrderShipments,
    patchOrderItemById,
    evaluateOrderItemById,
    reviseOfferByItemId,
    resendShipmentLabel,
    clearOrder,
    // closeModal,
  } = useOrder();

  const { state: authState } = useAuth();
  const { activePlatform } = authState;

  const [accordionState, setAccordionState] = useState<AccordionStates>({
    quote: true,
    claims: true,
    collection: true,
    validation: true,
    completion: true,
  } as AccordionStates);

  const [statusModal, setStatusModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({} as OrderItems);
  const [parsedShipments, setParsedShipments] = useState({});
  const [collectionOrderItems, setCollectionOrderItems] = useState([]);
  const [validationOrderItems, setValidationOrderItems] = useState([]);
  const [completionOrderItems, setCompletionOrderItems] = useState([]);

  const {
    order = {},
    shipments = [],
    isUpdatingOrder,
    isFetchingOrder,
    isUpdatingImeiSerial,
  } = state;

  const orderItems = order?.order_items || [];

  const isSingleOrderFlow = order?.order_flow === 'single';

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchOrderById(orderId, signal);
    fetchOrderShipments(orderId, signal);

    return () => {
      controller.abort();
    };
  }, []);

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

  useEffect(() => {
    if (orderItems.length > 0) {
      const collectionOrderItems = orderItems.filter((item: OrderItems) =>
        COLLECTION_ORDER_ITEM_STATUS.includes(item.status as OrderItemStatus),
      );
      const validationOrderItems = orderItems.filter((item: OrderItems) =>
        VALIDATION_ORDER_ITEM_STATUS.includes(item.status as OrderItemStatus),
      );
      const completionOrderItems = orderItems.filter((item: OrderItems) =>
        COMPLETION_ORDER_ITEM_STATUS.includes(item.status as OrderItemStatus),
      );
      setCollectionOrderItems(collectionOrderItems);
      setValidationOrderItems(validationOrderItems);
      setCompletionOrderItems(completionOrderItems);

      setAccordionState((prev) => {
        return {
          ...prev,
          collection: collectionOrderItems.length > 0,
          validation: validationOrderItems.length > 0,
          completion: completionOrderItems.length > 0,
        };
      });
    }
  }, [order]);

  const onUpdateStatus = (newValue: any, orderItem: OrderItems) => {
    if (newValue.status === OrderItemStatus.FOR_REVISION) {
      const payload = {
        platform: activePlatform,
        revision_price: newValue.revised_offer,
        revision_reasons: newValue.reason?.split(','),
      };
      reviseOfferByItemId(orderItem.line_item_number, payload);
    } else if (newValue.status === OrderItemStatus.EVALUATED) {
      evaluateOrderItemById(orderItem.line_item_number, {
        platform: activePlatform,
      });
    } else {
      patchOrderItemById(orderItem._id, { status: newValue.status });
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
      orderItems?.forEach((item: OrderItems) => {
        shippingItems[item?._id] = {
          [shipments.direction]: shipments,
        };
      });
    }

    return shippingItems;
  };

  return (
    <LoaderContainer
      margin="20px"
      padding="10px"
      title="Order Details"
      loading={isFetchingOrder || isUpdatingOrder || isUpdatingImeiSerial}
    >
      <AccordionContainer className="px-4 pt-4">
        <AccordionInnerContainer>
          <AccordionHeaderContainer>
            <AccordionHeading
              id="quote"
              title="Quote Creation"
              isOpen={accordionState.quote}
              onToggle={() => toggleAccordion('quote')}
            />
          </AccordionHeaderContainer>
          <AccordionContent isOpen={accordionState.quote} key="Quote Creation">
            <QuoteDetails />
          </AccordionContent>
          <ClaimsList
            order={order}
            isOpen={accordionState.claims}
            onToggle={() => toggleAccordion('claims')}
          />
        </AccordionInnerContainer>
      </AccordionContainer>
      <AccordionContainer className="px-4 pt-4">
        <hr />
        <h2 className="text-lg text-gray-500 p-2">Order Items</h2>
        <AccordionInnerContainer>
          <AccordionHeaderContainer>
            <AccordionHeading
              id="collection"
              title={`Collection (${collectionOrderItems.length})`}
              isOpen={accordionState.collection}
              action={
                !isSingleOrderFlow &&
                order?.status !== OrderItemStatus.CANCELLED && (
                  <button
                    className="text-md text-white bg-emerald-500 py-1 px-3 rounded-md hover:bg-emerald-600"
                    onClick={() => resendShipmentLabel(order?._id)}
                    disabled={isUpdatingOrder}
                  >
                    Resend Label
                  </button>
                )
              }
              onToggle={() => toggleAccordion('collection')}
            />
          </AccordionHeaderContainer>
          <AccordionContent
            isOpen={accordionState.collection}
            removePadding={true}
            key="Collection"
          >
            {collectionOrderItems.length > 0 ? (
              <ScrollableContainer>
                <Collection
                  orderId={order._id}
                  orderItems={collectionOrderItems}
                  shipments={parsedShipments}
                  isSingleOrderFlow={isSingleOrderFlow}
                  setStatusModal={setStatusModal}
                  setSelectedItem={setSelectedItem}
                />
              </ScrollableContainer>
            ) : (
              <h6 className="text-center text-gray-500 pb-3 pt-2">
                No order items for collection
              </h6>
            )}
          </AccordionContent>
          <AccordionHeaderContainer>
            <AccordionHeading
              id="validation"
              title={`Validation & Offer (${validationOrderItems.length})`}
              isOpen={accordionState.validation}
              onToggle={() => toggleAccordion('validation')}
            />
          </AccordionHeaderContainer>
          <AccordionContent
            isOpen={accordionState.validation}
            removePadding={true}
            key="validation"
          >
            {validationOrderItems.length > 0 ? (
              <ScrollableContainer>
                <ValidationOffer
                  orderId={orderId}
                  orderItems={validationOrderItems}
                  setStatusModal={setStatusModal}
                  setSelectedItem={setSelectedItem}
                />
              </ScrollableContainer>
            ) : (
              <h6 className="text-center text-gray-500 pb-3 pt-2">
                No order items for validation or offer
              </h6>
            )}
          </AccordionContent>
          <AccordionHeaderContainer>
            <AccordionHeading
              id="completion"
              title={`Completion (${completionOrderItems.length})`}
              isOpen={accordionState.completion}
              onToggle={() => toggleAccordion('completion')}
            />
          </AccordionHeaderContainer>
          <AccordionContent
            isOpen={accordionState.completion}
            removePadding={true}
            key="completion"
          >
            {completionOrderItems.length > 0 ? (
              <ScrollableContainer>
                <Completion
                  orderId={orderId}
                  orderItems={completionOrderItems}
                  setStatusModal={setStatusModal}
                  setSelectedItem={setSelectedItem}
                />
              </ScrollableContainer>
            ) : (
              <h6 className="text-center text-gray-500 pb-3 pt-2">
                No order items for completion
              </h6>
            )}
          </AccordionContent>
        </AccordionInnerContainer>
      </AccordionContainer>
      <StatusModal isOpen={statusModal} onClose={() => setStatusModal(false)}>
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
