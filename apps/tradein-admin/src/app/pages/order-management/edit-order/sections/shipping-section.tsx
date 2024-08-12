/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader, OrderItems } from '@tradein-admin/libs';
import { CardDetail } from './card-detail';

interface ShippingSectionProps {
  isLoading: boolean;
  orderItem: OrderItems;
  shipments: any;
}

export const ShippingSection = ({
  isLoading,
  orderItem,
  shipments,
}: ShippingSectionProps) => {
  const getItemShipment = (itemId: string) => {
    const itemShipments = shipments[itemId] || {};

    return itemShipments['return'];
  };

  const shipment = getItemShipment(orderItem?._id);

  return (
    <>
      <hr />
      <div className="flex flex-col mb-2">
        <h4>Shipping</h4>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-dataEntry sm:gap-2">
            <CardDetail label="Courier" value={shipment?.slug} />
            <CardDetail label="Shipping Status" value={shipment?.status} />
            <CardDetail label="Direction #" value={shipment?.direction} copy />
            <CardDetail
              label="Inbound Tracking #"
              value={shipment?.tracking_number}
              copy
            />
          </div>
        )}
      </div>
    </>
  );
};
