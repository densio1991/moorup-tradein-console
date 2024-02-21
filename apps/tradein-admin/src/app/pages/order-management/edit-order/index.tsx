import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import {
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionHeaderContainer,
  AccordionInnerContainer,
  AccordionTitle,
  PageContainer,
  StyledIcon,
  DataLine,
  DetailCardContainer,
  useOrder,
  formatDate,
} from '@tradein-admin/libs';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

type AccordionHeadingProps = {
  id: any;
  title: string;
  isOpen: boolean;
  onToggle: (id: any) => void;
};

export const AccordionHeading = ({
  id,
  title,
  isOpen,
  onToggle,
}: AccordionHeadingProps) => {
  return (
    <AccordionHeader onClick={() => onToggle(id)} isOpen={isOpen}>
      <AccordionTitle>{title}</AccordionTitle>
      <StyledIcon
        icon={isOpen ? faAngleDown : faAngleUp}
        color={isOpen ? 'inherit' : '#ccc'}
      />
    </AccordionHeader>
  );
};

type CardItemProps = {
  label: string;
  value: string;
};
export const CardItem = ({ label, value }: CardItemProps) => {
  return (
    <DataLine>
      <dl>{label}</dl>
      <dt>{value || '---'}</dt>
    </DataLine>
  );
};

export const EditOrderPage = () => {
  const { id: orderId } = useParams();
  const shouldRun = useRef(true);

  const {
    state,
    fetchOrderById,
    fetchOrderShipments,
    // patchOrderItemById,
    // evaluateOrderItemById,
    // closeModal,
  } = useOrder();

  const { 
    order = {},
    shipments,
    isFetchingOrder,
    isUpdatingOrder,
    isModalOpen,
    activeOrderItem,
  } = state;

  const {
    user_id = {},
    payment = {},
    identification = {},
  } = order;

  useEffect(() => {
    if (shouldRun.current) {
      fetchOrderById(orderId);
      fetchOrderShipments(orderId);
    }

    return () => {
      // clearProduct({});
    };
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (item: number) => {
    setOpenIndex((prev) => (prev === item ? null : item));
  };

  const { address = {}, bank_details = {} } = user_id;

  const completeAddress =
    address.length > 0 ? `${address[0]?.region} ${address[0]?.state}` : '';
  const accountName = bank_details ? bank_details[0]?.account_name : '';
  const fullName = `${user_id?.first_name} ${user_id?.last_name}`;

  return (
    <PageContainer>
      <AccordionContainer>
        <AccordionInnerContainer key="Order Details">
          <AccordionHeaderContainer>
            <AccordionHeading
              id="orderDetails"
              title="Order Details"
              isOpen={true}
              onToggle={toggleAccordion}
            />
          </AccordionHeaderContainer>
          <AccordionContent isOpen={true} key="Order Details">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 3fr',
                gap: '16px',
              }}
            >
              <DetailCardContainer>
                <h4>Account Information</h4>
                <CardItem label="Name" value={fullName} />
                <CardItem label="Account" value={accountName} />
                <CardItem label="Address" value={completeAddress} />
                <CardItem label="Email" value={fullName} />
                <CardItem
                  label="Email Verified"
                  value={!!user_id.is_verified ? 'Yes' : 'No'}
                />
                <CardItem label="Mobile" value={user_id.mobile_number} />
              </DetailCardContainer>
              <DetailCardContainer>
                <h4>Payment Details</h4>
                <CardItem label="Credit Timeframe" value={order.order_type} />
                <CardItem
                  label="Payment Status"
                  value={payment.payment_status}
                />
                <CardItem label="Payment Type" value={payment.payment_type} />
                <CardItem label="BSB & Account" value={user_id.bsb_account} />
                <h4>Identification</h4>
                <CardItem
                  label="Identification"
                  value={identification.id_state}
                />
                <CardItem
                  label="Identification Type"
                  value={identification.id_type}
                />
              </DetailCardContainer>
              <DetailCardContainer style={{}}>
                <h4>Quote Information</h4>
                <CardItem label="Quote #" value={order.order_number} />
                <CardItem label="Quote Status" value={order.status} />
                <CardItem label="Products" value={completeAddress} />
                <CardItem
                  label="Date Created"
                  value={formatDate(order.createdAt)}
                />
                <CardItem
                  label="Last Updated"
                  value={formatDate(order.updatedAt)}
                />
              </DetailCardContainer>
            </div>
          </AccordionContent>
        </AccordionInnerContainer>
      </AccordionContainer>
    </PageContainer>
  );
};
