import {
  DetailCardContainer,
  OrderItems,
  Shipments,
} from '@tradein-admin/libs';

type CollectionProps = {
  orderItems: OrderItems[];
  shipments: Shipments;
};

const Collection = ({ orderItems, shipments }: CollectionProps) => {
  const displayData = (label: string, value: string) => {
    return (
      <>
        <dl className="font-semibold">{label}</dl>
        <dt className="truncate">{value || '---'}</dt>
      </>
    );
  };

  return (
    <div className="flex gap-2">
      {orderItems?.map((item: OrderItems, idx) => {
        return (
          <DetailCardContainer key={idx} className="min-w-fit flex gap-2">
            <div className="flex flex-row gap-2 mb-2">
              <img
                src={item?.product_variant_id?.image_url}
                height="100px"
                width="100px"
                alt={item?.product_variant_id?.sku}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 auto-cols-min">
                {displayData('IMEI/Serial', item?.imei_serial)}
                {displayData('TI SKU', item?.product_variant_id?.sku)}
                {displayData('Device ID', item?._id)}
                {displayData('Device Status', item?.status)}
                {/* {displayData('Payment Status', item?.imei_serial)} */}
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 auto-cols-min">
              <h4 className="col-span-2">Shipping</h4>
              {displayData('Courier', shipments?.slug)}
              {displayData('Shipping Status', shipments?.status)}
              {displayData('Direction #', shipments?.direction)}
              {displayData('Inbound Tracking #', shipments?.tracking_number)}
            </div>
          </DetailCardContainer>
        );
      })}
    </div>
  );
};

export default Collection;
