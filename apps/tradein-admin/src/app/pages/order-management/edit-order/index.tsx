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
  onToggle: (id: any) => void;
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

export const EditOrderPage = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const {
    state,
    fetchOrderById,
    fetchOrderShipments,
    patchOrderItemById,
    evaluateOrderItemById,
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
      orderItems?.forEach((item: OrderItems) => {
        shippingItems[item?._id] = {
          [shipments.direction]: shipments,
        };
      });
    }

    return shippingItems;
  };

  const collectionOrderItems = orderItems.filter((item: OrderItems) =>
    COLLECTION_ORDER_ITEM_STATUS.includes(item.status as OrderItemStatus),
  );

  const validationOrderItems = orderItems.filter((item: OrderItems) =>
    VALIDATION_ORDER_ITEM_STATUS.includes(item.status as OrderItemStatus),
  );

  const completionOrderItems = orderItems.filter((item: OrderItems) =>
    COMPLETION_ORDER_ITEM_STATUS.includes(item.status as OrderItemStatus),
  );

  return (
    <LoaderContainer
      margin="20px"
      padding="10px"
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
            <QuoteDetails />
          </AccordionContent>
          <ClaimsList
            order={order}
            isOpen={accordionState.claims}
            onToggle={() => toggleAccordion('claims')}
          />
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
                        className="text-md text-white bg-emerald-500 py-1 px-3 rounded-md hover:bg-emerald-600"
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
