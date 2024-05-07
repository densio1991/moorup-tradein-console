/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faBullhorn,
  faCheckToSlot,
  faCreditCard,
  faCube,
  faFileCircleExclamation,
  faFileInvoice,
  faHouse,
  faList,
  faPenToSquare,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { ClaimStatus, OrderItemStatus } from './enums';
import { PlatformType } from './interfaces';

export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
export const TEMPLATE_LINK = import.meta.env.VITE_REACT_APP_TEMPLATE_LINK;
export const ACCESS_TOKEN = 'FTK';
export const ACCESS_TOKEN_EXPIRY = 'FTKX';
export const ACTIVE_PLATFORM = 'AP';

export const PLATFORMS: PlatformType = {
  binglee: 'Bing Lee',
  noelleeming: 'Noel Leeming',
  jbhifi: 'JB-HIFI',
  costco: 'Costco',
  moorup: 'Moorup',
  betta: 'Betta',
  birite: 'Bi-Rite',
  officeworks: 'Officeworks',
  '2degrees': '2degrees',
};

export const SIDENAV_ITEMS = [
  {
    title: 'Home',
    url: '/dashboard',
    activeUrl: /^\/dashboard$/,
    icon: faHouse,
    disabled: false,
  },
  {
    title: 'Product Management',
    url: '/dashboard/product',
    activeUrl: /^\/dashboard\/product/,
    icon: faCube,
    disabled: false,
  },
  {
    title: 'Order Management',
    url: '/dashboard/order',
    activeUrl: /\/dashboard\/order/,
    icon: faFileInvoice,
    disabled: false,
    submenu: [
      {
        title: 'Order List',
        url: '/dashboard/order/list',
        activeUrl: /^\/dashboard\/order\/list/,
        icon: faList,
        disabled: false,
      },
      {
        title: 'Discrepancy',
        url: '/dashboard/order/discrepancy',
        activeUrl: /^\/dashboard\/order\/discrepancy/,
        icon: faPenToSquare,
        disabled: false,
      },
      {
        title: 'Actionables',
        url: '/dashboard/order/actionables',
        activeUrl: /^\/dashboard\/order\/actionables/,
        icon: faFileCircleExclamation,
        disabled: false,
      },
    ],
  },
  {
    title: 'Promotions',
    url: '/dashboard/promotion',
    activeUrl: /\/dashboard\/promotion/,
    icon: faBullhorn,
    disabled: false,
    submenu: [
      {
        title: 'Promotion List',
        url: '/dashboard/promotion/list',
        activeUrl: /^\/dashboard\/promotion\/list/,
        icon: faList,
        disabled: false,
      },
      {
        title: 'Claims',
        url: '/dashboard/promotion/claims',
        activeUrl: /^\/dashboard\/promotion\/claims/,
        icon: faCheckToSlot,
        disabled: false,
      },
      {
        title: 'Payment',
        url: '/dashboard/promotion/payment',
        activeUrl: /^\/dashboard\/promotion\/payment/,
        icon: faCreditCard,
        disabled: false,
      }
    ]
  },
  {
    title: 'User Management',
    url: '/dashboard/user',
    activeUrl: /^\/dashboard\/user/,
    icon: faUsers,
    disabled: false,
  },
]

export const DEFAULT_COLUMN = [
  {
    label: 'ID',
    order: 1,
    enableSort: true,
    keyName: '_id',
  },
];

export const PRODUCT_MANAGEMENT_COLUMNS = [
  {
    label: 'Display Name',
    order: 2,
    enableSort: true,
    keyName: 'display_name',
  },
  {
    label: 'Brand',
    order: 3,
    enableSort: true,
    keyName: 'brand',
  },
  {
    label: 'Model',
    order: 4,
    enableSort: true,
    keyName: 'model',
  },
  {
    label: 'Year',
    order: 5,
    enableSort: true,
    keyName: 'year',
  },
  {
    label: 'Type',
    order: 6,
    enableSort: true,
    keyName: 'type',
  }
]

export const ORDER_MANAGEMENT_COLUMNS = [
  {
    label: 'Order Number',
    order: 2,
    enableSort: true,
    keyName: 'order_number',
  },
  {
    label: 'Order Type',
    order: 3,
    enableSort: true,
    keyName: 'order_type',
  },
  {
    label: 'Credit Type',
    order: 4,
    enableSort: true,
    keyName: 'credit_type',
  },
  {
    label: 'Customer Name',
    order: 5,
    enableSort: true,
    keyName: 'user_id.first_name',
  },
  {
    label: 'Status',
    order: 6,
    enableSort: true,
    keyName: 'status',
  },
  {
    label: 'Payment Status',
    order: 7,
    enableSort: true,
    keyName: 'payment.payment_status',
  },
  {
    label: 'Order Count',
    order: 8,
    enableSort: false,
  },
  {
    label: 'Updated',
    order: 9,
    enableSort: true,
    keyName: 'updatedAt',
  },
];

export const DISCREPANCY_MANAGEMENT_COLUMNS = [
  {
    label: 'Order Number',
    order: 2,
    enableSort: true,
    keyName: 'order_number',
  },
  {
    label: 'Customer Name',
    order: 3,
    enableSort: true,
    keyName: 'user_details.first_name',
  },
  {
    label: 'Mobile Number',
    order: 4,
    enableSort: true,
    keyName: 'user_details.mobile_number',
  },
  {
    label: 'Email Address',
    order: 5,
    enableSort: true,
    keyName: 'user_details.email',
  },
  {
    label: 'Credit Timeframe',
    order: 6,
    enableSort: true,
    keyName: 'credit_type',
  },
  {
    label: 'Device',
    order: 7,
    enableSort: true,
    keyName: 'order_items.product_name',
  },
  {
    label: 'Original Offer',
    order: 8,
    enableSort: true,
    keyName: 'order_items.original_offer',
  },
  {
    label: 'IMEI/Serial',
    order: 9,
    enableSort: true,
    keyName: 'order_items.imei_serial',
  },
  {
    label: 'System Model',
    order: 9,
    enableSort: true,
    keyName: 'system_model',
  },
  {
    label: 'Storage',
    order: 10,
    enableSort: true,
    keyName: 'storage',
  },
  {
    label: 'Locked',
    order: 11,
    enableSort: true,
    keyName: 'locked',
  },
  {
    label: 'Grade',
    order: 12,
    enableSort: true,
    keyName: 'grade',
  },
  {
    label: 'Operations Comments',
    order: 13,
    enableSort: true,
    keyName: 'operations_comments',
  },
  {
    label: 'Instructions for CS',
    order: 14,
    enableSort: true,
    keyName: 'cs_instructions',
  },
  {
    label: 'Customer Contacted',
    order: 15,
    enableSort: true,
    keyName: 'cs_contacted',
  },
  {
    label: 'Date',
    order: 16,
    enableSort: true,
    keyName: 'cs_date',
  },
  {
    label: 'CS Comments',
    order: 17,
    enableSort: true,
    keyName: 'cs_comments',
  },
  {
    label: 'ZD Ticket Number',
    order: 18,
    enableSort: true,
    keyName: 'zd_ticket_number',
  },
  {
    label: 'Owner',
    order: 19,
    enableSort: true,
    keyName: 'owner',
  },
  {
    label: 'Actions for Ops',
    order: 20,
    enableSort: true,
    keyName: 'ops_action',
  },
  {
    label: 'Status',
    order: 21,
    enableSort: true,
    keyName: 'ops_status',
  },
];

export const USER_MANAGEMENT_COLUMNS = [
  {
    label: 'Role',
    order: 2,
    enableSort: true,
    keyName: 'role',
  },
  {
    label: 'First Name',
    order: 3,
    enableSort: true,
    keyName: 'first_name',
  },
  {
    label: 'Last Name',
    order: 4,
    enableSort: true,
    keyName: 'last_name',
  },
  {
    label: 'Email',
    order: 5,
    enableSort: true,
    keyName: 'email',
  },
  {
    label: 'Status',
    order: 6,
    enableSort: true,
    keyName: 'status',
  },
];

export const PROMOTIONS_MANAGEMENT_COLUMNS = [
  {
    label: 'Name',
    order: 2,
    enableSort: true,
    keyName: 'name',
  },
  {
    label: 'Products',
    order: 3,
    enableSort: false,
  },
  {
    label: 'Start Date',
    order: 4,
    enableSort: true,
    keyName: 'start_date',
  },
  {
    label: 'End Date',
    order: 5,
    enableSort: true,
    keyName: 'end_date',
  },
  {
    label: 'Status',
    order: 6,
    enableSort: true,
    keyName: 'promotion_status',
  },
];

export const PAYMENTS_MANAGEMENT_COLUMNS = [
  {
    label: 'Order Number',
    order: 2,
    enableSort: true,
  },
  {
    label: 'Name',
    order: 3,
    enableSort: true,
  },
  {
    label: 'Address',
    order: 4,
    enableSort: true,
  },
  {
    label: 'Contact',
    order: 5,
    enableSort: true,
  },
];

export const PROMOTION_CLAIMS_MANAGEMENT_COLUMNS = [
  {
    label: 'Order Number',
    order: 2,
    enableSort: true,
    keyName: 'order_id.order_number',
  },
  {
    label: 'Promotion Name',
    order: 3,
    enableSort: true,
    keyName: 'promotion_id.name',
  },
  {
    label: 'Promotion Link',
    order: 4,
    enableSort: true,
    keyName: 'promotion_id.slug',
  },
  {
    label: 'Device Model',
    order: 5,
    enableSort: false,
    keyName: 'device_model',
  },
  {
    label: 'Receipt Number',
    order: 6,
    enableSort: true,
    keyName: 'receipt_number',
  },
  {
    label: 'Claim Number',
    order: 7,
    enableSort: true,
    keyName: 'claim_number',
  },
  {
    label: 'Claimed By',
    order: 8,
    enableSort: true,
    keyName: 'user_id.first_name',
  },
  {
    label: 'Claimed Date',
    order: 9,
    enableSort: true,
    keyName: 'createdAt',
  },
  {
    label: 'Claim Status',
    order: 10,
    enableSort: true,
    keyName: 'status',
  }
]

export const ACTIONABLES_MANAGEMENT_COLUMNS = [
  {
    label: 'Order Number',
    order: 2,
    enableSort: true,
    keyName: 'order_number',
  },
  {
    label: 'Name',
    order: 3,
    enableSort: true,
    keyName: 'user_details.first_name',
  },
  {
    label: 'Status',
    order: 4,
    enableSort: true,
    keyName: 'status',
  },
  {
    label: 'Product Name',
    order: 5,
    enableSort: true,
    keyName: 'order_items.product_name',
  },
  {
    label: 'Product Type',
    order: 6,
    enableSort: true,
    keyName: 'order_items.product_type',
  },
  {
    label: 'Created',
    order: 7,
    enableSort: true,
    keyName: 'createdAt',
  },
  {
    label: 'Updated',
    order: 8,
    enableSort: true,
    keyName: 'updatedAt',
  },
];

export const PROMOTION_CLAIMS_PAYMENT_MANAGEMENT_COLUMNS = [
  {
    label: 'Claim Number',
    order: 2,
    enableSort: true,
    keyName: 'order_id.claim_number',
  },
  {
    label: 'Order Number',
    order: 3,
    enableSort: true,
    keyName: 'order_number',
  },
  {
    label: 'Promotion Name',
    order: 4,
    enableSort: true,
    keyName: 'promotion_id.name',
  },
  {
    label: 'Claim Amount',
    order: 5,
    enableSort: true,
    keyName: 'amount',
  },
  {
    label: 'Claim Status',
    order: 6,
    enableSort: true,
    keyName: 'status',
  },
  {
    label: 'Claimed Date',
    order: 12,
    enableSort: true,
    keyName: 'createdAt',
  },
]

export const ACTIONS_COLUMN = [
  {
    label: 'Actions',
    order: 99,
    enableSort: false,
    keyName: ''
  },
];

export const ADD_PRODUCT_PAYLOAD = {
  brand: '',
  model: '',
  year: '',
  display_name: '',
  category: '',
  type: '',
  image_url: '',
  site_url: '',
  status: '',
  platforms: [],
};

export const ADD_PRODUCT_VARIANT_PRICING_PAYLOAD = {
  currency: '',
  amount: 0,
  working: 0,
  working_damaged: 0,
  not_working_damaged: 0,
  not_working: 0,
};

export const ADD_PRODUCT_VARIANT_ATTRIBUTES_PAYLOAD = {
  id: '',
  name: '',
};

export interface ProductVariant {
  name: string;
  sku: string;
  type: string;
  image_url: string;
  site_url: string;
  status: string;
  pricing: ProductVariantPricing[];
  attributes: ProductVariantAttributes[];
}

export interface ProductVariantPricing {
  currency: string;
  amount: number;
  working: number;
  working_damaged: number;
  not_working_damaged: number;
  not_working: number;
}

export interface ProductVariantAttributes {
  id: string;
  name: string;
}
export interface QuestionAnswered {
  question: string;
  answer: string;
}

export interface OrderItems {
  _id: string;
  product_variant_id: ProductVariant; // original type : number
  product_name: string;
  product_type: string;
  original_offer: number;
  revised_offer: number;
  status: string;
  imei_serial: string;
  cosmetic_sell_grade: string;
  is_erased: boolean;
  functional_tested: boolean;
  lock_type: string;
  line_item_number: string;
  reason: string[];
  questions_answered: QuestionAnswered[];
  revision: any;
}

export interface Addresses {
  type: string;
  line_1: string;
  line_2: string;
  suburb: string;
  city: string;
  state: string;
  region: string;
  dpid: string;
  zipcode: string;
  created_at: string;
  updated_at: string;
}

export interface Claims {
  order_id: string;
  promotion_id: number;
  platform: string;
  user_id: number;
  status: string;
  payment_type: string;
  payment_details: string;
}

export interface Shipments {
  _id: string;
  platform: string;
  order_id: string | number;
  item_id: string | number;
  tracking_number: string;
  slug: string; // courier
  status: string;
  direction: string;
  pdf_url: string;
}

export interface BankDetails {
  _id: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  swift_code: string;
}
export interface UserDocument {
  _id: string;
  platform: string;
  first_name: string;
  last_name: string;
  identification: {
    id_type?: string;
    id_number?: string;
    id_state?: string; // identification
  };
  email: string;
  mobile_number: string;
  is_verified: string;
  status: string;
  bank_details: BankDetails[];
  address: Addresses[];
  bsb_account: string;
  updated_at: string;
}

export interface OrderInterface {
  _id: string;
  user_id: UserDocument; // must be number : populate data
  platform: string;
  order_type: string; // credit_timeframe
  order_flow: string;
  order_number: string | number;
  status: string; // FIXME: create enums
  credit_type: string;
  order_items: OrderItems[];
  pricing_detail: {
    total_items_amount: number;
    total_discount_amount: number;
    total_shipping_amount: number;
    sub_total_amount: number;
  };
  payment: {
    payment_status: string; // FIXME: create enums : paid | to-pay | not-paid
    payment_date: string;
    payment_type: string;
  };
  cancellation: {
    cancellation_status: string;
    cancellation_date: string;
  };
  voucher_links: string[];
  addresses: Addresses[];
  new_device: {
    product_variant_id: number;
    shop: string;
    status: number;
    imei_serial: number;
    created_at: string;
    updated_at: string;
  };
  createdAt: string;
  updatedAt: string;
  shipments: Shipments;
}

export const CURRENCIES = [
  { value: 'AED', label: 'United Arab Emirates Dirham (AED)' },
  { value: 'AFN', label: 'Afghan Afghani (AFN)' },
  { value: 'ALL', label: 'Albanian Lek (ALL)' },
  { value: 'AMD', label: 'Armenian Dram (AMD)' },
  { value: 'ANG', label: 'Netherlands Antillean Guilder (ANG)' },
  { value: 'AOA', label: 'Angolan Kwanza (AOA)' },
  { value: 'ARS', label: 'Argentine Peso (ARS)' },
  { value: 'AUD', label: 'Australian Dollar (AUD)' },
  { value: 'AWG', label: 'Aruban Florin (AWG)' },
  { value: 'AZN', label: 'Azerbaijani Manat (AZN)' },
  { value: 'BAM', label: 'Bosnia-Herzegovina Convertible Mark (BAM)' },
  { value: 'BBD', label: 'Barbadian Dollar (BBD)' },
  { value: 'BDT', label: 'Bangladeshi Taka (BDT)' },
  { value: 'BGN', label: 'Bulgarian Lev (BGN)' },
  { value: 'BHD', label: 'Bahraini Dinar (BHD)' },
  { value: 'BIF', label: 'Burundian Franc (BIF)' },
  { value: 'BMD', label: 'Bermudian Dollar (BMD)' },
  { value: 'BND', label: 'Brunei Dollar (BND)' },
  { value: 'BOB', label: 'Bolivian Boliviano (BOB)' },
  { value: 'BRL', label: 'Brazilian Real (BRL)' },
  { value: 'BSD', label: 'Bahamian Dollar (BSD)' },
  { value: 'BTN', label: 'Bhutanese Ngultrum (BTN)' },
  { value: 'BWP', label: 'Botswanan Pula (BWP)' },
  { value: 'BYN', label: 'Belarusian Ruble (BYN)' },
  { value: 'BZD', label: 'Belize Dollar (BZD)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'CDF', label: 'Congolese Franc (CDF)' },
  { value: 'CHF', label: 'Swiss Franc (CHF)' },
  { value: 'CLP', label: 'Chilean Peso (CLP)' },
  { value: 'CNY', label: 'Chinese Yuan (CNY)' },
  { value: 'COP', label: 'Colombian Peso (COP)' },
  { value: 'CRC', label: 'Costa Rican Colón (CRC)' },
  { value: 'CUP', label: 'Cuban Peso (CUP)' },
  { value: 'CVE', label: 'Cape Verdean Escudo (CVE)' },
  { value: 'CZK', label: 'Czech Republic Koruna (CZK)' },
  { value: 'DJF', label: 'Djiboutian Franc (DJF)' },
  { value: 'DKK', label: 'Danish Krone (DKK)' },
  { value: 'DOP', label: 'Dominican Peso (DOP)' },
  { value: 'DZD', label: 'Algerian Dinar (DZD)' },
  { value: 'EGP', label: 'Egyptian Pound (EGP)' },
  { value: 'ERN', label: 'Eritrean Nakfa (ERN)' },
  { value: 'ETB', label: 'Ethiopian Birr (ETB)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'FJD', label: 'Fijian Dollar (FJD)' },
  { value: 'FKP', label: 'Falkland Islands Pound (FKP)' },
  { value: 'FOK', label: 'Faroese Króna (FOK)' },
  { value: 'GBP', label: 'British Pound Sterling (GBP)' },
  { value: 'GEL', label: 'Georgian Lari (GEL)' },
  { value: 'GGP', label: 'Guernsey Pound (GGP)' },
  { value: 'GHS', label: 'Ghanaian Cedi (GHS)' },
  { value: 'GIP', label: 'Gibraltar Pound (GIP)' },
  { value: 'GMD', label: 'Gambian Dalasi (GMD)' },
  { value: 'GNF', label: 'Guinean Franc (GNF)' },
  { value: 'GTQ', label: 'Guatemalan Quetzal (GTQ)' },
  { value: 'GYD', label: 'Guyanaese Dollar (GYD)' },
  { value: 'HKD', label: 'Hong Kong Dollar (HKD)' },
  { value: 'HNL', label: 'Honduran Lempira (HNL)' },
  { value: 'HRK', label: 'Croatian Kuna (HRK)' },
  { value: 'HTG', label: 'Haitian Gourde (HTG)' },
  { value: 'HUF', label: 'Hungarian Forint (HUF)' },
  { value: 'IDR', label: 'Indonesian Rupiah (IDR)' },
  { value: 'ILS', label: 'Israeli New Shekel (ILS)' },
  { value: 'IMP', label: 'Isle of Man Pound (IMP)' },
  { value: 'INR', label: 'Indian Rupee (INR)' },
  { value: 'IQD', label: 'Iraqi Dinar (IQD)' },
  { value: 'IRR', label: 'Iranian Rial (IRR)' },
  { value: 'ISK', label: 'Icelandic Króna (ISK)' },
  { value: 'JEP', label: 'Jersey Pound (JEP)' },
  { value: 'JMD', label: 'Jamaican Dollar (JMD)' },
  { value: 'JOD', label: 'Jordanian Dinar (JOD)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
  { value: 'KES', label: 'Kenyan Shilling (KES)' },
  { value: 'KGS', label: 'Kyrgystani Som (KGS)' },
  { value: 'KHR', label: 'Cambodian Riel (KHR)' },
  { value: 'KID', label: 'Kiribati Dollar (KID)' },
  { value: 'KIN', label: 'Kinyarwanda Franc (KIN)' },
  { value: 'KIR', label: 'Kiribati Pound (KIR)' },
  { value: 'KWD', label: 'Kuwaiti Dinar (KWD)' },
  { value: 'KYD', label: 'Cayman Islands Dollar (KYD)' },
  { value: 'KZT', label: 'Kazakhstani Tenge (KZT)' },
  { value: 'LAK', label: 'Laotian Kip (LAK)' },
  { value: 'LBP', label: 'Lebanese Pound (LBP)' },
  { value: 'LKR', label: 'Sri Lankan Rupee (LKR)' },
  { value: 'LRD', label: 'Liberian Dollar (LRD)' },
  { value: 'LSL', label: 'Lesotho Loti (LSL)' },
  { value: 'LYD', label: 'Libyan Dinar (LYD)' },
  { value: 'MAD', label: 'Moroccan Dirham (MAD)' },
  { value: 'MDL', label: 'Moldovan Leu (MDL)' },
  { value: 'MGA', label: 'Malagasy Ariary (MGA)' },
  { value: 'MKD', label: 'Macedonian Denar (MKD)' },
  { value: 'MMK', label: 'Myanmar Kyat (MMK)' },
  { value: 'MNT', label: 'Mongolian Tugrik (MNT)' },
  { value: 'MOP', label: 'Macanese Pataca (MOP)' },
  { value: 'MRU', label: 'Mauritanian Ouguiya (MRU)' },
  { value: 'MUR', label: 'Mauritian Rupee (MUR)' },
  { value: 'MVR', label: 'Maldivian Rufiyaa (MVR)' },
  { value: 'MWK', label: 'Malawian Kwacha (MWK)' },
  { value: 'MXN', label: 'Mexican Peso (MXN)' },
  { value: 'MYR', label: 'Malaysian Ringgit (MYR)' },
  { value: 'MZN', label: 'Mozambican Metical (MZN)' },
  { value: 'NAD', label: 'Namibian Dollar (NAD)' },
  { value: 'NGN', label: 'Nigerian Naira (NGN)' },
  { value: 'NIO', label: 'Nicaraguan Córdoba (NIO)' },
  { value: 'NOK', label: 'Norwegian Krone (NOK)' },
  { value: 'NPR', label: 'Nepalese Rupee (NPR)' },
  { value: 'NZD', label: 'New Zealand Dollar (NZD)' },
  { value: 'OMR', label: 'Omani Rial (OMR)' },
  { value: 'PAB', label: 'Panamanian Balboa (PAB)' },
  { value: 'PEN', label: 'Peruvian Nuevo Sol (PEN)' },
  { value: 'PGK', label: 'Papua New Guinean Kina (PGK)' },
  { value: 'PHP', label: 'Philippine Peso (PHP)' },
  { value: 'PKR', label: 'Pakistani Rupee (PKR)' },
  { value: 'PLN', label: 'Polish Złoty (PLN)' },
  { value: 'PYG', label: 'Paraguayan Guarani (PYG)' },
  { value: 'QAR', label: 'Qatari Rial (QAR)' },
  { value: 'RON', label: 'Romanian Leu (RON)' },
  { value: 'RSD', label: 'Serbian Dinar (RSD)' },
  { value: 'RUB', label: 'Russian Ruble (RUB)' },
  { value: 'RWF', label: 'Rwandan Franc (RWF)' },
  { value: 'SAR', label: 'Saudi Riyal (SAR)' },
  { value: 'SBD', label: 'Solomon Islands Dollar (SBD)' },
  { value: 'SCR', label: 'Seychellois Rupee (SCR)' },
  { value: 'SDG', label: 'Sudanese Pound (SDG)' },
  { value: 'SEK', label: 'Swedish Krona (SEK)' },
  { value: 'SGD', label: 'Singapore Dollar (SGD)' },
  { value: 'SHP', label: 'Saint Helena Pound (SHP)' },
  { value: 'SLL', label: 'Sierra Leonean Leone (SLL)' },
  { value: 'SOS', label: 'Somali Shilling (SOS)' },
  { value: 'SRD', label: 'Surinamese Dollar (SRD)' },
  { value: 'SSP', label: 'South Sudanese Pound (SSP)' },
  { value: 'STN', label: 'São Tomé and Príncipe Dobra (STN)' },
  { value: 'SYP', label: 'Syrian Pound (SYP)' },
  { value: 'SZL', label: 'Swazi Lilangeni (SZL)' },
  { value: 'THB', label: 'Thai Baht (THB)' },
  { value: 'TJS', label: 'Tajikistani Somoni (TJS)' },
  { value: 'TMT', label: 'Turkmenistani Manat (TMT)' },
  { value: 'TND', label: 'Tunisian Dinar (TND)' },
  { value: 'TOP', label: 'Tongan Pa\'anga (TOP)' },
  { value: 'TRY', label: 'Turkish Lira (TRY)' },
  { value: 'TTD', label: 'Trinidad and Tobago Dollar (TTD)' },
  { value: 'TVD', label: 'Tuvaluan Dollar (TVD)' },
  { value: 'TWD', label: 'New Taiwan Dollar (TWD)' },
  { value: 'TZS', label: 'Tanzanian Shilling (TZS)' },
  { value: 'UAH', label: 'Ukrainian Hryvnia (UAH)' },
  { value: 'UGX', label: 'Ugandan Shilling (UGX)' },
  { value: 'USD', label: 'United States Dollar (USD)' },
  { value: 'UYU', label: 'Uruguayan Peso (UYU)' },
  { value: 'UZS', label: 'Uzbekistan Som (UZS)' },
  { value: 'VES', label: 'Venezuelan Bolívar (VES)' },
  { value: 'VND', label: 'Vietnamese Đồng (VND)' },
  { value: 'VUV', label: 'Vanuatu Vatu (VUV)' },
  { value: 'WST', label: 'Samoan Tala (WST)' },
  { value: 'XAF', label: 'Central African CFA Franc (XAF)' },
  { value: 'XCD', label: 'East Caribbean Dollar (XCD)' },
  { value: 'XDR', label: 'Special Drawing Rights (XDR)' },
  { value: 'XOF', label: 'West African CFA Franc (XOF)' },
  { value: 'XPF', label: 'CFP Franc (XPF)' },
  { value: 'YER', label: 'Yemeni Rial (YER)' },
  { value: 'ZAR', label: 'South African Rand (ZAR)' },
  { value: 'ZMW', label: 'Zambian Kwacha (ZMW)' },
  { value: 'ZWL', label: 'Zimbabwean Dollar (ZWL)' },
];

export const CURRENCY_SYMBOLS: { [key: string]: string } = {
  AED: 'د.إ',
  AFN: '؋',
  ALL: 'L',
  AMD: '֏',
  ANG: 'ƒ',
  AOA: 'Kz',
  ARS: '$',
  AUD: '$',
  AWG: 'ƒ',
  AZN: '₼',
  BAM: 'КМ',
  BBD: '$',
  BDT: '৳',
  BGN: 'лв',
  BHD: 'ب.د',
  BIF: 'Fr',
  BMD: '$',
  BND: '$',
  BOB: 'Bs.',
  BRL: 'R$',
  BSD: '$',
  BTN: 'Nu.',
  BWP: 'P',
  BYN: 'Br',
  BZD: 'BZ$',
  CAD: '$',
  CDF: 'Fr',
  CHF: 'Fr',
  CLP: '$',
  CNY: '¥',
  COP: '$',
  CRC: '₡',
  CUP: '₱',
  CVE: '$',
  CZK: 'Kč',
  DJF: 'Fdj',
  DKK: 'kr',
  DOP: 'RD$',
  DZD: 'د.ج',
  EGP: 'ج.م',
  ERN: 'Nfk',
  ETB: 'Br',
  EUR: '€',
  FJD: '$',
  FKP: '£',
  FOK: 'kr',
  GBP: '£',
  GEL: '₾',
  GGP: '£',
  GHS: '₵',
  GIP: '£',
  GMD: 'D',
  GNF: 'Fr',
  GTQ: 'Q',
  GYD: '$',
  HKD: '$',
  HNL: 'L',
  HRK: 'kn',
  HTG: 'G',
  HUF: 'Ft',
  IDR: 'Rp',
  ILS: '₪',
  IMP: '£',
  INR: '₹',
  IQD: 'ع.د',
  IRR: '﷼',
  ISK: 'kr',
  JEP: '£',
  JMD: 'J$',
  JOD: 'د.ا',
  JPY: '¥',
  KES: 'Ksh',
  KGS: 'сом',
  KHR: '៛',
  KID: '$',
  KIN: 'RF',
  KIR: '$',
  KWD: 'د.ك',
  KYD: '$',
  KZT: '₸',
  LAK: '₭',
  LBP: 'ل.ل',
  LKR: 'රු',
  LRD: '$',
  LSL: 'L',
  LYD: 'ل.د',
  MAD: 'د.م.',
  MDL: 'L',
  MGA: 'Ar',
  MKD: 'ден',
  MMK: 'K',
  MNT: '₮',
  MOP: 'P',
  MRU: 'UM',
  MUR: '₨',
  MVR: 'ރ.',
  MWK: 'MK',
  MXN: '$',
  MYR: 'RM',
  MZN: 'MT',
  NAD: '$',
  NGN: '₦',
  NIO: 'C$',
  NOK: 'kr',
  NPR: '₨',
  NZD: '$',
  OMR: 'ر.ع.',
  PAB: 'B/.',
  PEN: 'S/.',
  PGK: 'K',
  PHP: '₱',
  PKR: '₨',
  PLN: 'zł',
  PYG: '₲',
  QAR: 'ر.ق',
  RON: 'lei',
  RSD: 'дин',
  RUB: '₽',
  RWF: 'Fr',
  SAR: 'ر.س',
  SBD: '$',
  SCR: '₨',
  SDG: 'ج.س.',
  SEK: 'kr',
  SGD: '$',
  SHP: '£',
  SLL: 'Le',
  SOS: 'Sh',
  SRD: '$',
  SSP: '£',
  STN: 'Db',
  SYP: 'ل.س',
  SZL: 'L',
  THB: '฿',
  TJS: 'ЅМ',
  TMT: 'm',
  TND: 'د.ت',
  TOP: 'T$',
  TRY: '₺',
  TTD: 'TT$',
  TVD: '$',
  TWD: 'NT$',
  TZS: 'Sh',
  UAH: '₴',
  UGX: 'Sh',
  USD: '$',
  UYU: '$U',
  UZS: 'UZS',
  VES: 'Bs',
  VND: '₫',
  VUV: 'VT',
  WST: 'T',
  XAF: 'FCFA',
  XCD: '$',
  XDR: 'SDR',
  XOF: 'CFA',
  XPF: 'Fr',
  YER: '﷼',
  ZAR: 'R',
  ZMW: 'ZK',
  ZWL: '$',
};

interface Attribute {
  value: string;
  label: string;
}

interface Attributes {
  [key: string]: Attribute[];
}

export const ATTRIBUTES: Attributes = {
  laptops: [
    { value: 'processor', label: 'Processor' },
    { value: 'screen-size', label: 'Screen Size' },
    { value: 'size', label: 'Storage' },
    { value: 'ram', label: 'Memory' },
  ],
  watches: [
    { value: 'case-size', label: 'Case Size' },
    { value: 'case-material', label: 'Material' },
  ],
  tablets: [
    { value: 'screen-size', label: 'Screen Size' },
    { value: 'storage', label: 'Storage' },
  ],
  phones: [{ value: 'storage', label: 'Storage' }],
};

export const SUPERADMIN = 'superadmin';
export const ADMIN = 'admin';
export const REGULAR = 'regular';
export const WAREHOUSE = 'warehouse';
export const PRODUCTS = 'products-team';
export const CUSTOMER_SERVICE = 'customer-service';

export const ROLES = [
  { value: SUPERADMIN, label: 'Super Admin' },
  { value: ADMIN, label: 'Admin' },
  { value: REGULAR, label: 'Regular' },
  { value: WAREHOUSE, label: 'Warehouse' },
  { value: PRODUCTS, label: 'Products' },
  { value: CUSTOMER_SERVICE, label: 'Customer Service' },
];

export const CANCELLED_AXIOS = 'ERR_CANCELED';

export const PRODUCT_TYPES = {
  PHONES: 'phones',
  TABLETS: 'tablets',
  WATCHES: 'watches',
  LAPTOPS: 'laptops',
};

export const PRODUCT_TYPES_OPTIONS = [
  { value: PRODUCT_TYPES.PHONES, label: 'Phones', disabled: true },
  { value: PRODUCT_TYPES.TABLETS, label: 'Tablets', disabled: false },
  { value: PRODUCT_TYPES.WATCHES, label: 'Watches', disabled: true },
  { value: PRODUCT_TYPES.LAPTOPS, label: 'Laptops', disabled: false },
];

export const MODAL_TYPES = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  ADD_PRODUCT_VARIANT: 'ADD_PRODUCT_VARIANT',
  ADD_USER: 'ADD_USER',
  EDIT_USER: 'EDIT_USER',
  ADD_PROMOTION: 'ADD_PROMOTION',
  ADD_PROMOTION_CLAIMS: 'ADD_PROMOTION_CLAIMS',
  ADD_PROMOTION_STEPS: 'ADD_PROMOTION_STEPS',
  ADD_PROMOTION_CONDITION: 'ADD_PROMOTION_CONDITION',
  ADD_PROMOTION_ELIGIBILITY_AND_FAQS: 'ADD_PROMOTION_ELIGIBILITY_AND_FAQS',
  EDIT_PROMOTION: 'EDIT_PROMOTION',
  EDIT_PROMOTION_CLAIMS: 'EDIT_PROMOTION_CLAIMS',
  EDIT_PROMOTION_STEPS: 'EDIT_PROMOTION_STEPS',
  EDIT_PROMOTION_CONDITION: 'EDIT_PROMOTION_CONDITION',
  EDIT_PROMOTION_ELIGIBILITY_AND_FAQS: 'EDIT_PROMOTION_ELIGIBILITY_AND_FAQS',
  ADD_PROMOTION_PREVIEW: 'ADD_PROMOTION_PREVIEW',
  EDIT_PROMOTION_PREVIEW: 'EDIT_PROMOTION_PREVIEW',
  FILTER_PROMOTION_CLAIMS: 'FILTER_PROMOTION_CLAIMS',
  DOWNLOAD_PROMOTION_CLAIMS: 'DOWNLOAD_PROMOTION_CLAIMS',
  ADD_ORDER_PROMOTION_CLAIM: 'ADD_ORDER_PROMOTION_CLAIM',
  BULK_APPROVE_CLAIM_REGULAR: 'BULK_APPROVE_CLAIM_REGULAR',
  BULK_REJECT_CLAIM_REGULAR: 'BULK_REJECT_CLAIM_REGULAR',
}

export const PROMOTION_STATUS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const ADD_PROMOTION_DETAILS_PAYLOAD = {
  name: '',
  description: '',
  status: '',
  image_url: '-',
  start_date: null,
  end_date: null,
  show_banner: false,
}

export const ADD_PROMOTION_PRODUCTS_PAYLOAD = {
  product_name: '',
  amount: 0,
  currency: '',
};

export const ADD_PROMOTION_CLAIMS_PAYLOAD = {
  title: '',
  description: '',
  disclaimer: '',
  products: [ADD_PROMOTION_PRODUCTS_PAYLOAD],
};

export const ADD_CLAIM_RECEIPT_PAYLOAD = {
  promotion_id: '',
  receipt_number: '',
};

export const ADD_ORDER_PROMOTION_CLAIM_PAYLOAD = {
  claims: [ADD_CLAIM_RECEIPT_PAYLOAD]
};

export const ADD_PROMOTION_STEPS_ITEM = {
  order: 1,
  title: '',
  description: '',
};

export const ADD_PROMOTION_STEPS_PAYLOAD = {
  steps: [ADD_PROMOTION_STEPS_ITEM],
};

export const ADD_PROMOTION_CONDITION_ITEM = {
  order: 1,
  description: '',
};

export const ADD_PROMOTION_CONDITIONS_PAYLOAD = {
  title: '',
  items: [ADD_PROMOTION_CONDITION_ITEM],
};

export const ADD_PROMOTION_FAQ_ITEM = {
  title: '',
  content: '',
};

export const ADD_PROMOTION_ELIGIBILITY_AND_FAQS_PAYLOAD = {
  title: '',
  faq: [ADD_PROMOTION_FAQ_ITEM],
};

export interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: string;
  display_name: string;
  category: string;
  type: string;
  image_url: string;
  site_url: string;
  status: string;
  is_archived: string;
  createdAt: string;
  updatedAt: string;
  platform: string;
}

export interface Promotion {
  // product: String
  // amount: Number
  // dateClaimSubmitted: Date
  // transactionNumber: String
  // dateClaimPaid: Date
  _id: string;
  name: string;
  description: string;
  platform: string;
  status: string;
  start_date: string;
  end_date: string;
  products: Product[];
  price: number;
  image_url: string;
}

export const COLLECTION_ORDER_ITEM_STATUS = [
  OrderItemStatus.CREATED,
  OrderItemStatus.CANCELLED,
  OrderItemStatus.HOLD,
]

export const VALIDATION_ORDER_ITEM_STATUS = [
  OrderItemStatus.RECEIVED,
  OrderItemStatus.LABEL_SENT,
  OrderItemStatus.FOR_REVISION,
  OrderItemStatus.REVISION_REJECTED,
]

export const COMPLETION_ORDER_ITEM_STATUS = [
  OrderItemStatus.EVALUATED,
  OrderItemStatus.REVISED,
  OrderItemStatus.COMPLETED,
];

export const TIMEZONE = 'Australia/Sydney';

export const OVERRIDE_CLAIM_STATUSES = [
  { value: ClaimStatus.APPROVED, label: 'Approved' },
  { value: ClaimStatus.CANCELLED, label: 'Cancelled' },
  { value: ClaimStatus.PENDING, label: 'Pending' },
  { value: ClaimStatus.REJECTED, label: 'Rejected' },
]

export const CLAIM_STATUSES = [
  { value: ClaimStatus.APPROVED, label: 'Approved' },
  { value: ClaimStatus.CANCELLED, label: 'Cancelled' },
  { value: ClaimStatus.COMPLETED, label: 'Completed' },
  { value: ClaimStatus.FAILED, label: 'Failed' },
  { value: ClaimStatus.PENDING, label: 'Pending' },
  { value: ClaimStatus.PROCESSING, label: 'Processing Payment' },
  { value: ClaimStatus.REJECTED, label: 'Rejected' },
]

export const MOORUP_CLAIM_STATUSES = [
  { value: ClaimStatus.APPROVED, label: 'Approved' },
  { value: ClaimStatus.CANCELLED, label: 'Cancelled' },
  { value: ClaimStatus.COMPLETED, label: 'Completed' },
  { value: ClaimStatus.FAILED, label: 'Failed' },
  { value: ClaimStatus.PENDING, label: 'Pending' },
  { value: ClaimStatus.PROCESSING, label: 'Processing Payment' },
  { value: ClaimStatus.REJECTED, label: 'Rejected' },
]

export const PAGE_SIZES = [
  {
    label: '10',
    value: '10',
  },
  {
    label: '25',
    value: '25',
  },
  {
    label: '50',
    value: '50',
  },
  {
    label: '100',
    value: '100',
  }
];
