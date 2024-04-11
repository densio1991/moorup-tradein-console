import { formatDate } from './helpers';

interface Data {
  _id: string;
  claim_number: string;
  platform: string;
  order_id: {
    _id: string;
    order_number: string;
    order_items: {
      line_item_number: string;
      original_offer: number;
      sku: string;
      status: string;
    }[];
    status: string;
    createdAt: string;
  };
  promotion_id: {
    name: string;
  } | null;
  user_id: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
  };
  receipt_number: string;
  status: string;
  moorup_status: string;
  createdAt: string;
  updatedAt: string;
}

export function exportPromotionClaims(data: Data[]) {
  const csvRows: string[] = [];

  // Add header row
  const headers = [
    'Promotion Name',
    'Claim Number',
    'Full Name',
    'Email',
    // 'Mobile',
    'Order Number',
    'Order Line Item ID',
    'Order Line Item Status',
    'Moorup Validation',
    'Partner Validation',
    // 'Original Offer',
    // 'Trade-in SKU',
    // 'Current Status',
    // 'Order Created Date',
    // 'Barcode Serial',
    'Claim Status',
    'Claim Amount',
    'Claim Created Date',
    'Claim Updated Date',
  ];
  csvRows.push(headers.join(','));

  // Add data rows
  data.forEach(item => {
    if (item.order_id?.order_items) {
      item.order_id.order_items.forEach(orderItem => {
        const promotionName = item.promotion_id ? item.promotion_id.name : '';

        const row = [
          promotionName,
          item.claim_number || '',
          `${item.user_id.first_name} ${item.user_id.last_name}` || '',
          item.user_id.email || '',
          // item.user_id.mobile || '',
          item.order_id.order_number || '',
          orderItem.line_item_number || '',
          orderItem.status || '',
          item.moorup_status || '',
          '',
          // orderItem.original_offer ? orderItem.original_offer.toString() : '',
          // orderItem.sku || '',
          // item.order_id.status || '',
          // item.order_id.createdAt || '',
          // '',
          item.status || '',
          '',
          formatDate(new Date(item.createdAt)) || '',
          formatDate(new Date(item.updatedAt)) || '',
        ];

        // Check for undefined, empty, or null values and replace them with an empty string
        const cleanedRow = row.map(value => (value === undefined || value === null || value === '' ? '' : value));
        csvRows.push(cleanedRow.join(','));
      });
    }
  });

  // Create CSV file
  const csvData = csvRows.join('\n');
  const blob = new Blob([csvData], { type: 'text/csv' });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.setAttribute('download', 'data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
