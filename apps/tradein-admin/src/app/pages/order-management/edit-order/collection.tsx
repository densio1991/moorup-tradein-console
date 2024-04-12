/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DetailCardContainer,
  Loader,
  OrderItems,
  useOrder,
  PRODUCT_TYPES,
  OrderItemActions,
  Modal,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { CardDetail, DeviceSection } from './sections';
import OfferSection from './sections/offer-section';
import { useMemo, useState } from 'react';

type CollectionProps = {
  orderId: string;
  orderItems: OrderItems[];
  shipments: any;
  isSingleOrderFlow: boolean;
  setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<OrderItems>>;
};

const Collection = ({
  orderId,
  orderItems,
  shipments,
  isSingleOrderFlow,
  setStatusModal,
  setSelectedItem,
}: CollectionProps) => {
  const {
    state,
    receiveOrderItemById,
    cancelOrderItemById,
    resendShipmentLabel,
    sendBox,
  } = useOrder();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [activeOrderItem, setActiveOrderItem] = useState<OrderItems>();
  const [actionType, setActionType] = useState<any>();

  const { isResendingLabel, isFetchingShipments } = state;

  const handleReceiveOrderItem = (orderItemId: any) => {
    receiveOrderItemById(orderItemId);
  };

  const handleSendBox = (orderItemId: any) => {
    sendBox(orderId, { item_id: orderItemId });
  };

  const handleResendLabel = (orderItemId: any) => {
    resendShipmentLabel(orderItemId);
  };

  const handleCancelOrderItem = (orderItemId: any) => {
    cancelOrderItemById(orderItemId);
  };

  const handleUpdateStatus = (orderItem: OrderItems) => {
    setStatusModal(true);
    setSelectedItem(orderItem);
  };

  const onConfirmAction = () => {
    setIsConfirmDialogOpen(false);

    const orderItemId = activeOrderItem?._id;
    switch (actionType) {
      case OrderItemActions.RECEIVE:
        handleReceiveOrderItem(orderItemId);
        break;
      case OrderItemActions.SEND_BOX:
        handleSendBox(orderItemId);
        break;
      case OrderItemActions.CANCEL:
        handleCancelOrderItem(orderItemId);
        break;
      case OrderItemActions.RESEND_LABEL:
        handleResendLabel(orderItemId);
        break;
      default:
        break;
    }
  };

  const openConfirmDialog = (orderItem: OrderItems, action: any) => {
    setActiveOrderItem(orderItem);
    setIsConfirmDialogOpen(true);
    setActionType(action);
  };

  const isBoxRequired = (productType: any) => {
    return [PRODUCT_TYPES.LAPTOPS, PRODUCT_TYPES.TABLETS].includes(productType);
  };

  const getItemShipment = (orderItemId: string) => {
    const itemShipments = shipments[orderItemId] || {};

    return itemShipments['return'];
  };

  const confirmModalLabel = useMemo(() => {
    switch (actionType) {
      case OrderItemActions.CANCEL:
        return {
          content: 'Are you sure you want to cancel the order item?',
          confirmLabel: 'Yes, cancel it',
        };
      case OrderItemActions.RECEIVE:
        return {
          content: 'Are you sure you want to mark this item as "Received"?',
          confirmLabel: 'Yes, mark it',
        };
      case OrderItemActions.SEND_BOX:
        return {
          content: 'Are you sure you want to send box for this device?',
          confirmLabel: 'Yes, send box',
        };
      case OrderItemActions.RESEND_LABEL:
        return {
          content: 'Are you sure you want to resend label for this order item?',
          confirmLabel: 'Yes, resend label',
        };
    }
  }, [actionType]);

  return (
    <div className="flex gap-2 p-2.5 items-start">
      {orderItems?.map((item: OrderItems, idx) => {
        const shipment = getItemShipment(item._id);

        return (
          <DetailCardContainer key={idx} className="min-w-fit flex gap-2">
            <DeviceSection orderItem={item} orderId={orderId} />
            <OfferSection orderItem={item} />
            <hr />
            <div className="flex flex-col mb-2">
              <div className="flex justify-between">
                <h4>Shipping</h4>
              </div>
              {isFetchingShipments ? (
                <Loader />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-dataEntry sm:gap-2">
                  <CardDetail label="Courier" value={shipment?.slug} />
                  <CardDetail
                    label="Shipping Status"
                    value={shipment?.status}
                  />
                  <CardDetail
                    label="Direction #"
                    value={shipment?.direction}
                    copy
                  />
                  <CardDetail
                    label="Inbound Tracking #"
                    value={shipment?.tracking_number}
                    copy
                  />
                </div>
              )}
            </div>
            {!isEmpty(shipment) ? (
              <>
                <hr />
                <div className="flex flex-row flex-wrap gap-2 pt-1">
                  <button
                    onClick={() =>
                      openConfirmDialog(item, OrderItemActions.RECEIVE)
                    }
                    className="px-3 py-1 flex-1 text-white bg-emerald-800 hover:bg-emerald-900 rounded-md"
                  >
                    Mark as Received
                  </button>
                  {isBoxRequired(item?.product_type) && (
                    <button
                      onClick={() =>
                        openConfirmDialog(item, OrderItemActions.SEND_BOX)
                      }
                      className="px-3 py-1 flex-1 text-white bg-emerald-800 hover:bg-emerald-900 rounded-md"
                    >
                      Send Box
                    </button>
                  )}
                </div>
              </>
            ) : (
              isSingleOrderFlow && (
                <>
                  <hr />
                  <button
                    className="flex-1 text-white bg-emerald-800 py-1 px-3 rounded-md hover:bg-emerald-900"
                    disabled={isResendingLabel}
                    onClick={() => handleResendLabel(item._id)}
                  >
                    Resend Label
                  </button>
                </>
              )
            )}
            <div className="flex flex-row flex-wrap gap-2">
              <button
                onClick={() => handleUpdateStatus(item)}
                className="px-3 py-1 flex-1 text-white bg-emerald-800 hover:bg-emerald-900 rounded-md"
              >
                Update Status
              </button>
              {isSingleOrderFlow && (
                <button
                  onClick={() =>
                    openConfirmDialog(item, OrderItemActions.CANCEL)
                  }
                  className="px-3 py-1 flex-1 text-white bg-red-700 hover:bg-red-800 rounded-md"
                >
                  Cancel Item
                </button>
              )}
            </div>
          </DetailCardContainer>
        );
      })}
      <Modal
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
      >
        <div className="flex flex-col p-6">
          <h2 className="mb-6">{confirmModalLabel?.content}</h2>
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
              onClick={onConfirmAction}
            >
              {confirmModalLabel?.confirmLabel}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Collection;
