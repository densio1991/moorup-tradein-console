import {
  DetailCardContainer,
  OrderItems,
  Shipments,
  displayData,
} from '@tradein-admin/libs';
import DeviceSection from './sections/device-section';

type CollectionProps = {
  orderItems: OrderItems[];
  shipments: Shipments;
};

const Collection = ({ orderItems, shipments }: CollectionProps) => {
  return (
    <div className="flex gap-2 p-2.5">
      {orderItems?.map((item: OrderItems, idx) => {
        return (
          <DetailCardContainer key={idx} className="min-w-fit flex gap-2">
            <DeviceSection order={item} />
            <hr />
            <div className="grid grid-cols-1 sm:grid-cols-dataEntry gap-1">
              <h4 className="sm:col-span-2">Shipping</h4>
              {displayData('Courier', shipments?.slug)}
              {displayData('Shipping Status', shipments?.status)}
              {displayData('Direction #', shipments?.direction)}
              {displayData('Inbound Tracking #', shipments?.tracking_number)}
            </div>
            <hr />
            <div className="flex flex-row flex-wrap gap-1 pt-1 font-semibold">
              <button className="px-3 py-1 text-white bg-teal-700 hover:bg-teal-800 rounded-md">
                Mark as Received
              </button>
              <button className="px-3 py-1 text-white bg-green-700 hover:bg-green-800 rounded-md">
                Send Box
              </button>
              <button className="px-3 py-1 text-white bg-emerald-700 hover:bg-emerald-800 rounded-md">
                Update Status
              </button>
            </div>
          </DetailCardContainer>
        );
      })}
    </div>
  );
};

export default Collection;
