import { Chip } from '../components';
import { OrderPaymentStatus, OrderStatus } from '../constants';

export const parseStatus = (value: string) => {
  let textColor = 'white';
  let bgColor = '#5e5d5d';

  switch (value) {
    case OrderStatus.PROCESSING:
      textColor = 'white';
      bgColor = '#f28933';
      break;

    case OrderStatus.COMPLETED:
      textColor = 'white';
      bgColor = '#216A4C';
      break;

    case OrderStatus.CREATED:
      textColor = 'white';
      bgColor = '#216A4C';
      break;

    case OrderStatus.DELETED:
      textColor = 'white';
      bgColor = '#f7564a';
      break;

    case OrderPaymentStatus.PENDING:
      textColor = 'white';
      bgColor = '#f28933';
      break;

    default:
      textColor = 'white';
      bgColor = '#5e5d5d';
      break;
  }

  return <Chip value={value} textColor={textColor} bgColor={bgColor} />
}
