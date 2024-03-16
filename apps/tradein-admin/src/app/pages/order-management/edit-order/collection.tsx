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
  orderId: unknown;
  orderItems: OrderItems[];
  shipments: Shipments;
  setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<OrderItems>>;
};

const Collection = ({
  orderId,
  orderItems,
  shipments,
  setStatusModal,
  setSelectedItem,
}: CollectionProps) => {
  const {
    state,
    receiveOrderItemById,
    cancelOrderItemById,
    updateShipmentStatusById,
    resendOrderItemShipmentLabel,
  } = useOrder();
  const {
    order = {},
    isResendingLabel,
    // isUpdatingOrderItem,
    isFetchingShipments,
  } = state;
  const isSingleOrderFlow = order?.order_flow === 'single';
  const isOrderShipped = !isEmpty(shipments);

  const handleReceiveOrderItem = (orderItemId: string) => {
    receiveOrderItemById(orderItemId);
  };

  const handleSendBox = (orderItemId: string) => {
    if (!isEmpty(shipments)) {
      updateShipmentStatusById(shipments._id, {
        status: 'box-sent',
      });
    }
  };

  const handleResendLabel = (orderItemId: any) => {
    resendOrderItemShipmentLabel(orderItemId);
  };

  const handleStatus = (item: OrderItems) => {
    setStatusModal(true);
    setSelectedItem(item);
  };

  const handleCancelOrderItem = (orderItemId: string) => {
    cancelOrderItemById(orderItemId);
  };

  const isBoxRequired = (productType: any) => {
    return [PRODUCT_TYPES.LAPTOPS, PRODUCT_TYPES.TABLETS].includes(productType);
  };

  return (
    <div className="flex gap-2 p-2.5">
      {orderItems?.map((item: OrderItems, idx) => {
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
                  <CardDetail label="Courier" value={shipments?.slug} />
                  <CardDetail
                    label="Shipping Status"
                    value={shipments?.status}
                  />
                  <CardDetail
                    label="Direction #"
                    value={shipments?.direction}
                    copy
                  />
                  <CardDetail
                    label="Inbound Tracking #"
                    value={shipments?.tracking_number}
                    copy
                  />
                </div>
              )}
            </div>
            {isOrderShipped ? (
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
                      onClick={() => handleSendBox(item._id)}
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
            <hr />
            <button
              onClick={() => handleStatus(item)}
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
