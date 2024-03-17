/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DetailCardContainer,
  OrderItems,
  amountFormatter,
  displayData,
} from '@tradein-admin/libs';
import { CardDetail, DeviceSection } from './sections';

type ValidationOfferProps = {
  orderId: any;
  orderItems: OrderItems[];
  setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<OrderItems>>;
};

const ValidationOffer = ({
  orderId,
  orderItems,
  setStatusModal,
  setSelectedItem,
}: ValidationOfferProps) => {
  const formatQuestion = (question: string) => {
    return question?.replace('-', ' ');
  };

  const handleStatus = (item: OrderItems) => {
    setStatusModal(true);
    setSelectedItem(item);
  };

  const deviceValidation = (item: string) => (
    <div className="flex flex-row gap-2">
      <div
        className={`text-sm px-2 rounded-md border-[1px] border-gray-400
        ${item === 'no' ? 'bg-red-500 text-white' : 'bg-white'}`}
      >
        No
      </div>
      <div
        className={`text-sm px-2 rounded-md border-[1px] border-gray-400
        ${item === 'yes' ? 'bg-green-500 text-white' : 'bg-white'}`}
      >
        Yes
      </div>
    </div>
  );

  return (
    <div className="flex gap-2 p-2.5">
      {orderItems?.map((item: OrderItems, idx) => {
        const { original_offer, revised_offer, questions_answered = [] } = item;

        return (
          <DetailCardContainer key={idx} className="min-w-fit flex gap-2">
            <DeviceSection order={item} orderId={orderId} />
            <hr />
            <div>
              <h4>Validation</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 items-center">
                {questions_answered.map((item, idx) => {
                  return (
                    <CardDetail
                      key={idx}
                      label={formatQuestion(item.question)}
                      value={deviceValidation(item.answer)}
                    />
                  );
                  // return (
                  //   <span
                  //     key={idx}
                  //     className={`px-2 py-1 text-white rounded-md w-fit
                  //       ${item.answer === 'yes' ? 'bg-green-600' : 'bg-red-600'}
                  //     `}
                  //   >
                  //     {formatQuestion(item.question)}
                  //   </span>
                  // );
                })}
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 auto-cols-min items-center">
              <h4 className="sm:col-span-2">Offer</h4>
              {displayData(
                'Original Quote',
                original_offer && `$ ${amountFormatter(original_offer)}`,
              )}
              {displayData(
                'Final Offer',
                revised_offer && `$ ${amountFormatter(revised_offer)}`,
              )}
            </div>
            <hr />
            <button
              onClick={() => handleStatus(item)}
              className="px-3 py-1 flex-1 text-white bg-emerald-800 hover:bg-emerald-900 rounded-md"
            >
              Update Status
            </button>
          </DetailCardContainer>
        );
      })}
    </div>
  );
};

export default ValidationOffer;
