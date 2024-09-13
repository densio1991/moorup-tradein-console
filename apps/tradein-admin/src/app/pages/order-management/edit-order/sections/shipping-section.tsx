/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderItems } from '@tradein-admin/libs';
import { CardDetail } from './card-detail';

interface ShippingSectionProps {
  orderItem: OrderItems;
  shipments?: any;
}

export const ShippingSection = ({ orderItem }: ShippingSectionProps) => {
  const getItemShipment = (direction: string) => {
    const shipments = orderItem?.shipment_details || [];

    return shipments?.find((shipment) => shipment?.direction === direction);
  };

  const inboundShipment = getItemShipment('return');
  const outboundShipment = getItemShipment('outbound');

  return (
    <>
      <hr />
      <div className="flex flex-col mb-2">
        <h4>Inbound Shipping</h4>
        <div className="grid grid-cols-1 sm:grid-cols-dataEntry sm:gap-2">
          <CardDetail label="Courier" value={inboundShipment?.slug} />
          <CardDetail label="Shipping Status" value={inboundShipment?.status} />
          <CardDetail
            label="Direction #"
            value={inboundShipment?.direction}
            copy
          />
          <CardDetail
            label="Tracking #"
            value={inboundShipment?.tracking_number}
            copy
            isLink
            linkUrl={inboundShipment?.tracking_link}
          />
        </div>
      </div>
      {outboundShipment && (
        <>
          <hr />
          <div className="flex flex-col mb-2">
            <h4>Outbound Shipping</h4>
            <div className="grid grid-cols-1 sm:grid-cols-dataEntry sm:gap-2">
              <CardDetail label="Courier" value={outboundShipment?.slug} />
              <CardDetail
                label="Shipping Status"
                value={outboundShipment?.status}
              />
              <CardDetail
                label="Direction #"
                value={outboundShipment?.direction}
                copy
              />
              <CardDetail
                label="Tracking #"
                value={outboundShipment?.tracking_number}
                copy
                isLink
                linkUrl={outboundShipment?.tracking_link}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
