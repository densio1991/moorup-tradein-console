import { OrderItems, displayData } from '@tradein-admin/libs';

export const DeviceSection = ({ order }: { order: OrderItems }) => {
  return (
    <div className="flex flex-row gap-2 mb-2">
      <img
        src={order?.product_variant_id?.image_url}
        height="100px"
        width="100px"
        alt={order?.product_variant_id?.sku}
      />
      <div className="grid grid-cols-1 md:grid-cols-dataEntry gap-1 auto-cols-min">
        {displayData('IMEI/Serial', order?.imei_serial)}
        {displayData('TI SKU', order?.product_variant_id?.sku)}
        {displayData('Device ID', order?._id)}
        {displayData('Device Status', order?.status)}
        {/* {displayData('Payment Status', order?.imei_serial)} */}
      </div>
    </div>
  );
};
