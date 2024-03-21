import { CardDetail } from './card-detail';
import { amountFormatter, OrderItems } from '@tradein-admin/libs';

const OfferSection = ({ orderItem }: { orderItem: OrderItems }) => {
  const { original_offer, revised_offer } = orderItem;
  return (
    <div>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 mt-2">
        <CardDetail
          label="Original Quote"
          value={`$ ${amountFormatter(original_offer)}`}
        />
        <CardDetail
          label="Final Offer"
          value={
            revised_offer
              ? `$ ${amountFormatter(revised_offer)}`
              : `$ ${amountFormatter(original_offer)}`
          }
        />
      </div>
    </div>
  );
};

export default OfferSection;
