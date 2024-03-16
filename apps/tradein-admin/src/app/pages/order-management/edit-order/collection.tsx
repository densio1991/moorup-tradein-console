import {
  DetailCardContainer,
  Loader,
  OrderItems,
  Shipments,
  useOrder,
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
    updateShipmentStatusById,
    resendShipmentLabel,
  } = useOrder();
  const {
    isResendingLabel,
    // isUpdatingOrderItem,
    isFetchingShipments,
  } = state;

  const onReceiveOrderItem = (orderItemId: string) => {
    receiveOrderItemById(orderItemId);
  };

  const onSendBox = (orderItemId: string) => {
    if (!isEmpty(shipments)) {
      updateShipmentStatusById(shipments._id, {
        status: 'box-sent',
      });
    }
  };

  const onResendLabel = async () => {
    await resendShipmentLabel(orderId);
  };

  const isOrderShipped = !isEmpty(shipments);
  const handleStatus = (item: OrderItems) => {
    setStatusModal(true);
    setSelectedItem(item);
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
                {!isOrderShipped && (
                  <button
                    className="font-medium text-white bg-primary py-1 px-3 rounded-md hover:bg-primary-light"
                    disabled={isResendingLabel}
                    onClick={() => onResendLabel()}
                  >
                    Resend Label
                  </button>
                )}
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
                  />
                  <CardDetail
                    label="Inbound Tracking #"
                    value={shipments?.tracking_number}
                  />
                </div>
              )}
            </div>
            {!isEmpty(shipments) && (
              <>
                <hr />
                <div className="flex flex-row flex-wrap gap-1 pt-1 font-medium">
                  <button
                    onClick={() => onReceiveOrderItem(item._id)}
                    className="px-3 py-1 flex-1 text-white bg-emerald-700 hover:bg-emerald-800 rounded-md"
                  >
                    Mark as Received
                  </button>
                  <button
                    onClick={() => onSendBox(item._id)}
                    className="px-3 py-1 flex-1 text-white bg-emerald-700 hover:bg-emerald-800 rounded-md"
                  >
                    Send Box
                  </button>
                </div>
              </>
            )}
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
