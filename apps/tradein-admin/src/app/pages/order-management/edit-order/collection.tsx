/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DetailCardContainer,
  Loader,
  OrderItems,
  useOrder,
  PRODUCT_TYPES,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { CardDetail, DeviceSection } from './sections';
import OfferSection from './sections/offer-section';

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
    generateLabels,
  } = useOrder();

  const {
    isResendingLabel,
    // isUpdatingOrderItem,
    isFetchingShipments,
  } = state;

  const handleReceiveOrderItem = (orderItemId: string) => {
    receiveOrderItemById(orderItemId);
  };

  const handleSendBox = (orderItemId: string) => {
    generateLabels({ item_id: orderItemId }, true);
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
    const itemShipments = shipments[orderItemId] || {};

    if (itemShipments['outbound']) {
      return itemShipments['outbound'];
    } else {
      return itemShipments['return'];
    }
  };

  return (
    <div className="flex gap-2 p-2.5 items-end">
      {orderItems?.map((item: OrderItems, idx) => {
        const shipment = getItemShipment(item._id);

        return (
          <DetailCardContainer key={idx} className="min-w-fit flex gap-2">
            <DeviceSection order={item} orderId={orderId} />
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
                <div className="flex flex-row flex-wrap gap-2 pt-1 font-medium">
                  <button
                    onClick={() => handleReceiveOrderItem(item._id)}
                    className="px-3 py-1 flex-1 text-white bg-emerald-800 hover:bg-emerald-900 rounded-md"
                  >
                    Mark as Received
                  </button>
                  {isBoxRequired(item?.product_type) && (
                    <button
                      onClick={() => handleSendBox(item?._id)}
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
                  <div className="flex flex-row flex-wrap gap-2 pt-1 font-medium">
                    <button
                      className="font-medium flex-1 text-white bg-emerald-800 py-1 px-3 rounded-md hover:bg-emerald-900"
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
              className="font-medium px-3 py-1 flex-1 text-white bg-emerald-800 hover:bg-emerald-900 rounded-md"
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
