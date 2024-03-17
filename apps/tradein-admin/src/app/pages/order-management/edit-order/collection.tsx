/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DetailCardContainer,
  Loader,
  OrderItems,
  Shipments,
  useOrder,
  PRODUCT_TYPES,
} from '@tradein-admin/libs';
import { DeviceSection, CardDetail } from './sections';
import { isEmpty } from 'lodash';

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
    updateShipmentStatusById,
    resendShipmentLabel,
  } = useOrder();

  const {
    isResendingLabel,
    // isUpdatingOrderItem,
    isFetchingShipments,
  } = state;

  const handleReceiveOrderItem = (orderItemId: string) => {
    receiveOrderItemById(orderItemId);
  };

  const handleSendBox = (shipment: Shipments) => {
    if (!isEmpty(shipment)) {
      updateShipmentStatusById(shipment._id, {
        status: 'box-sent',
      });
    }
  };

  const handleResendLabel = (orderItemId: any) => {
    resendShipmentLabel(orderItemId);
  };

  const handleUpdateStatus = (orderItem: OrderItems) => {
    setStatusModal(true);
    setSelectedItem(orderItem);
  };

  const handleCancelOrderItem = (orderItemId: string) => {
    cancelOrderItemById(orderItemId);
  };

  const isBoxRequired = (productType: any) => {
    return [PRODUCT_TYPES.LAPTOPS, PRODUCT_TYPES.TABLETS].includes(productType);
  };

  const getItemShipment = (orderItemId: string) => {
    if (isSingleOrderFlow) {
      return shipments[orderItemId];
    } else if (orderId) {
      return shipments[orderId];
    }
  };

  return (
    <div className="flex gap-2 p-2.5">
      {orderItems?.map((item: OrderItems, idx) => {
        const shipment = getItemShipment(item._id);

        return (
          <DetailCardContainer key={idx} className="min-w-fit flex gap-2">
            <DeviceSection order={item} />
            <hr />
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h4>Shipping</h4>
              </div>
              {isFetchingShipments ? (
                <Loader />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-dataEntry gap-1">
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
                <div className="flex flex-row flex-wrap gap-1 pt-1 font-medium">
                  <button
                    onClick={() => handleReceiveOrderItem(item._id)}
                    className="px-3 py-1 flex-1 text-white bg-emerald-700 hover:bg-emerald-800 rounded-md"
                  >
                    Mark as Received
                  </button>
                  {isBoxRequired(item?.product_type) && (
                    <button
                      onClick={() => handleSendBox(shipment)}
                      className="px-3 py-1 flex-1 text-white bg-emerald-700 hover:bg-emerald-800 rounded-md"
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
                  <div className="flex flex-row flex-wrap gap-1 pt-1 font-medium">
                    <button
                      className="font-medium flex-1 text-white bg-primary py-1 px-3 rounded-md hover:bg-primary-light"
                      disabled={isResendingLabel}
                      onClick={() => handleResendLabel(item._id)}
                    >
                      Resend Label
                    </button>
                    <button
                      onClick={() => handleCancelOrderItem(item._id)}
                      className="px-3 py-1 flex-1 text-white bg-red-700 hover:bg-red-800 rounded-md"
                    >
                      Cancel Order
                    </button>
                  </div>
                </>
              )
            )}
            <button
              onClick={() => handleUpdateStatus(item)}
              className="px-3 py-1 flex-1 text-white bg-emerald-700 hover:bg-emerald-800 rounded-md"
            >
              Update Status
            </button>
          </DetailCardContainer>
        );
      })}
    </div>
  );
};

export default Collection;
