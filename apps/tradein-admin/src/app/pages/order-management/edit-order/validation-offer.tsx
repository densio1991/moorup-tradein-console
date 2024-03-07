import {
  DetailCardContainer,
  OrderItems,
  Shipments,
} from '@tradein-admin/libs';

type ValidationOfferProps = {
  orderItems: OrderItems[];
  shipments: Shipments;
};

const ValidationOffer = ({ orderItems }: ValidationOfferProps) => {
  const displayData = (label: string, value: any) => {
    return (
      <>
        <dl className="font-semibold capitalize">{label}</dl>
        <dt className="truncate capitalize">{value || '---'}</dt>
      </>
    );
  };

  const formatQuestion = (question: string) => {
    return question?.replace('-', ' ');
  };

  return (
    <div className="flex gap-2">
      {orderItems?.map((item: OrderItems, idx) => {
        const { original_offer, revised_offer, questions_answered = [] } = item;

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
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 auto-cols-min">
              <h4 className="col-span-2">Validation</h4>
              {questions_answered.map((item) => {
                const question = formatQuestion(item.question);
                const answer = (
                  <span
                    className={`px-2 py-1 text-white font-sm rounded-[8px]
                      ${item.answer === 'yes' ? 'bg-green-600' : 'bg-red-600'}
                    `}
                  >
                    {item.answer}
                  </span>
                );

                return displayData(question, answer);
              })}
              {displayData('Original Quote', original_offer)}
              {displayData('Final Offer', revised_offer)}
            </div>
          </DetailCardContainer>
        );
      })}
    </div>
  );
};

export default ValidationOffer;
