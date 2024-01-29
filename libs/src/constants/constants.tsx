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
  },
  {
    label: 'Brand',
    order: 3,
    enableSort: true,
  },
  {
    label: 'Model',
    order: 4,
    enableSort: true,
  },
  {
    label: 'Year',
    order: 5,
    enableSort: true,
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
  },
  {
    label: 'Products',
    order: 3,
    enableSort: true,
  },
  {
    label: 'Start Date',
    order: 4,
    enableSort: true,
  },
  {
    label: 'End Date',
    order: 5,
    enableSort: true,
  },
  {
    label: 'Status',
    order: 5,
    enableSort: true,
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
