/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DetailCardContainer,
  OrderItems,
  Shipments,
  amountFormatter,
  displayData,
} from '@tradein-admin/libs';
import { DeviceSection } from './sections';

type CompletionProps = {
  orderItems: OrderItems[];
  shipments: Shipments;
  setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<OrderItems>>;
};

const Completion = ({
  orderItems,
  setStatusModal,
  setSelectedItem,
}: CompletionProps) => {
  const formatQuestion = (question: string) => {
    return question?.replace('-', ' ');
  };

  const handleStatus = (item: OrderItems) => {
    setStatusModal(true);
    setSelectedItem(item);
  };

  return (
    <div className="flex gap-2 p-2.5">
      {orderItems?.map((item: OrderItems, idx) => {
        const { original_offer, revised_offer, questions_answered = [] } = item;

        return (
          <DetailCardContainer key={idx} className="min-w-fit flex gap-2">
            <DeviceSection order={item} />
            <hr />
            <div>
              <h4>Validation</h4>
              <div className="flex gap-1 flex-wrap py-1 text-xs font-semibold uppercase">
                {questions_answered.map((item, idx) => {
                  return (
                    <span
                      key={idx}
                      className={`px-2 py-1 text-white rounded-md w-fit
                        ${item.answer === 'yes' ? 'bg-green-600' : 'bg-red-600'}
                      `}
                    >
                      {formatQuestion(item.question)}
                    </span>
                  );
                })}
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 sm:grid-cols-dataEntry gap-1 auto-cols-min items-center">
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
            <button
              onClick={() => handleStatus(item)}
              className="px-3 py-1 flex-1 text-white bg-emerald-700 hover:bg-emerald-800 rounded-md"
            >
              Update Status
            </button>
          </DetailCardContainer>
        );
      })}
    </div>
  );
};

export default Completion;
