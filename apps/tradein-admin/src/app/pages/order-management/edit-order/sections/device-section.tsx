import { OrderItems } from '@tradein-admin/libs';
import { CardDetail } from './card-detail';

export const DeviceSection = ({
  order,
  orderId,
}: {
  order: OrderItems;
  orderId: string;
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-2 items-start">
      <img
        className="w-28"
        src={order?.product_variant_id?.image_url}
        alt={order?.product_variant_id?.sku}
      />
      <div className="grid grid-cols-1 sm:grid-cols-fitLabel gap-1 max-w-[360px]">
        <h3 className="sm:col-span-2 mb-2 font-bold text-primary">
          <a
            href={order.product_variant_id?.image_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {order.product_variant_id?.name}
          </a>
        </h3>
        <CardDetail
          label="IMEI/Serial"
          value={order?.imei_serial}
          orderItem={order}
          orderId={orderId}
          copy
          edit={order?.status !== 'evaluated'}
        />
        <CardDetail
          label="TI SKU"
          value={order?.product_variant_id?.sku}
          copy
        />
        <CardDetail label="Device ID" value={order?.line_item_number} copy />
        <CardDetail label="Device Status" value={order?.status} />
      </div>
    </div>
  );
};
