import {
  faBullhorn,
  faCreditCard,
  faCube,
  faFileInvoice,
  faHouse,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL

export const SIDENAV_ITEMS = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: faHouse,
  },
  {
    title: 'Product Management',
    url: '/dashboard/product',
    icon: faCube,
  },
  {
    title: 'Order Management',
    url: '/dashboard/order',
    icon: faFileInvoice,
  },
  {
    title: 'User Management',
    url: '/dashboard/user',
    icon: faUsers,
  },
  {
    title: 'Promotions',
    url: '/dashboard/promotion',
    icon: faBullhorn,
  },
  {
    title: 'Payment',
    url: '/dashboard/payment',
    icon: faCreditCard,
  },
]

export const DEFAULT_COLUMN = [
  {
    label: 'ID',
    order: 1,
    enableSort: true,
    keyName: '_id',
  },
]

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
]

export const ORDER_MANAGEMENT_COLUMNS = [
  {
    label: 'First Name',
    order: 2,
    enableSort: true,
  },
  {
    label: 'Last Name',
    order: 3,
    enableSort: true,
  },
  {
    label: 'Status',
    order: 4,
    enableSort: true,
  },
  {
    label: 'Payment Status',
    order: 5,
    enableSort: true,
  },
  {
    label: 'Order Count',
    order: 6,
    enableSort: true,
  },
  {
    label: 'Created',
    order: 7,
    enableSort: true,
  },
  {
    label: 'Updated',
    order: 8,
    enableSort: true,
  },
]

export const USER_MANAGEMENT_COLUMNS = [
  {
    label: 'First Name',
    order: 2,
    enableSort: true,
    keyName: 'first_name',
  },
  {
    label: 'Last Name',
    order: 3,
    enableSort: true,
    keyName: 'last_name',
  },
  {
    label: 'Email',
    order: 4,
    enableSort: true,
    keyName: 'email',
  },
  {
    label: 'Status',
    order: 5,
    enableSort: true,
    keyName: 'status',
  },
]

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
    keyName: 'products',
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
    order: 5,
    enableSort: true,
    keyName: 'status',
  },
]

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
]

export const ACTIONS_COLUMN = [
  {
    label: 'Actions',
    order: 99,
    enableSort: false,
  },
]

export const ADD_PRODUCT_PAYLOAD = {
  name: '',
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
}

export const ADD_PRODUCT_VARIANT_PRICING_PAYLOAD = {
  currency: '',
  amount: 0,
  working: 0,
  working_damaged: 0,
  not_working_damaged: 0,
  not_working: 0
}

export interface ProductVariant {
  name: string;
  sku: string;
  type: string;
  image_url: string;
  site_url: string;
  status: string;
  pricing: ProductVariantPricing[];
}

export const ADD_PRODUCT_VARIANT_PAYLOAD: ProductVariant = {
  name: '',
  sku: '',
  type: '',
  image_url: '',
  site_url: '',
  status: '',
  pricing: [ADD_PRODUCT_VARIANT_PRICING_PAYLOAD],
};

export interface ProductVariantPricing {
  currency: string;
  amount: number;
  working: number;
  working_damaged: number;
  not_working_damaged: number;
  not_working: number;
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
  { value: 'ZWL', label: 'Zimbabwean Dollar (ZWL)' }
]
