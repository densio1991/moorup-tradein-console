import { OrderItems } from '@tradein-admin/libs';
import { CardDetail } from './card-detail';

export const DeviceSection = ({ order }: { order: OrderItems }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-2">
      <img
        src={order?.product_variant_id?.image_url}
        height="120px"
        width="120px"
        alt={order?.product_variant_id?.sku}
      />
      <div className="grid grid-cols-1 md:grid-cols-fitLabel gap-1 items-center">
        <h3 className="sm:col-span-2 mb-2 font-bold text-primary">
          <a
            href={order.product_variant_id?.image_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {order.product_variant_id?.name}
          </a>
        </h3>
        <CardDetail label="IMEI/Serial" value={order?.imei_serial} copy />
        <CardDetail
          label="TI SKU"
          value={order?.product_variant_id?.sku}
          copy
        />
        <CardDetail label="Device ID" value={order?._id} copy />
        <CardDetail label="Device Status" value={order?.status} />
      </div>
    </div>
  );
};
