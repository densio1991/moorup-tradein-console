/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderItems } from '@tradein-admin/libs';
import { CardDetail } from './card-detail';

interface ShippingSectionProps {
  orderItem: OrderItems;
  shipments?: any;
}

export const ShippingSection = ({ orderItem }: ShippingSectionProps) => {
  const getItemShipment = () => {
    const shipments = orderItem?.shipment_details || [];

    return shipments?.find((shipment) => shipment?.direction === 'return');
  };

  const shipment = getItemShipment();

  return (
    <>
      <hr />
      <div className="flex flex-col mb-2">
        <h4>Shipping</h4>
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
      </div>
    </>
  );
};
