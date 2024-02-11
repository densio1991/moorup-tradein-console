/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from './action-types';

const orderState = {
  orders: [],
  isFetchingOrders: false,
  isAddingOrder: false,
  order: {},
  isFetchingOrder: false,
  isUpdatingOrder: false,
  isDeletingOrder: false,
  orderItem: [],
  isFetchingOrderItem: false,
  isUpdatingOrderItem: false,
  orderItems: [],
  isFetchingOrderItems: true,
  shipments: {},
  isFetchingShipments: false,
  orderStatuses: [],
  isFetchingOrderStatuses: false,
  isResendingLabel: false,
  variants: [],
  isModalOpen: false,
  activeOrderItem: {},
};

const orderReducer = (state = orderState, action: any) => {
  console.log('\x1b[33m action: ', action);

  switch (action.type) {
    case types.FETCH_ORDERS.baseType: {
      return {
        ...state,
        isFetchingOrders: true,
        orders: [],
      };
    }
    case types.FETCH_ORDERS.SUCCESS: {
      return {
        ...state,
        isFetchingOrders: false,
        orders: action.payload?.data,
      };
    }
    case types.FETCH_ORDERS.FAILED: {
      return {
        ...state,
        isFetchingOrders: false,
        orders: [],
      };
    }

    case types.FETCH_ORDER_BY_ID.baseType: {
      return {
        ...state,
        isFetchingOrder: true,
        order: {},
      };
    }
    case types.FETCH_ORDER_BY_ID.SUCCESS: {
      return {
        ...state,
        isFetchingOrder: false,
        order: action.payload?.data,
      };
    }
    case types.FETCH_ORDER_BY_ID.FAILED: {
      return {
        ...state,
        isFetchingOrder: false,
        order: {},
      };
    }

    case types.UPDATE_ORDER_BY_ID.baseType:
    case types.CANCEL_ORDER_BY_ID.baseType: {
      return {
        ...state,
        isUpdatingOrder: true,
        order: {},
      };
    }
    case types.UPDATE_ORDER_BY_ID.SUCCESS:
    case types.CANCEL_ORDER_BY_ID.SUCCESS: {
      return {
        ...state,
        isUpdatingOrder: false,
        order: action.payload?.data,
      };
    }
    case types.UPDATE_ORDER_BY_ID.FAILED:
    case types.CANCEL_ORDER_BY_ID.FAILED: {
      return {
        ...state,
        isUpdatingOrder: false,
        order: {},
      };
    }
    case types.FETCH_ORDER_ITEMS.baseType: {
      return {
        ...state,
        isFetchingOrderItems: true,
        orderItems: [],
      };
    }
    case types.FETCH_ORDER_ITEMS.SUCCESS: {
      return {
        ...state,
        isFetchingOrderItems: false,
        orderItems: action.payload?.data,
      };
    }
    case types.FETCH_ORDER_ITEMS.FAILED: {
      return {
        ...state,
        isFetchingOrderItems: false,
        orderItems: [],
      };
    }
    case types.FETCH_ORDER_ITEMS.CANCELLED: {
      return {
        ...state,
        isFetchingOrderItems: true,
        orderItems: [],
      };
    }

    case types.UPDATE_ORDER_ITEM_BY_ID.baseType: {
      return {
        ...state,
        isUpdatingOrderItem: true,
      };
    }
    case types.UPDATE_ORDER_ITEM_BY_ID.SUCCESS: {
      return {
        ...state,
        isUpdatingOrderItem: false,
        order: action.payload,
      };
    }
    case types.UPDATE_ORDER_ITEM_BY_ID.FAILED: {
      return {
        ...state,
        isUpdatingOrderItem: false,
        order: {},
      };
    }

    case types.DELETE_ORDER_BY_ID.baseType: {
      return {
        ...state,
        isDeletingOrder: true,
        orders: [],
      };
    }
    case types.DELETE_ORDER_BY_ID.SUCCESS: {
      return {
        ...state,
        isDeletingOrder: false,
        orders: action.payload,
      };
    }
    case types.DELETE_ORDER_BY_ID.FAILED: {
      return {
        ...state,
        isDeletingOrder: false,
        orders: [],
      };
    }

    case types.FETCH_ORDER_SHIPMENTS.baseType: {
      return {
        ...state,
        isFetchingShipments: true,
        shipments: {},
      };
    }
    case types.FETCH_ORDER_SHIPMENTS.SUCCESS: {
      return {
        ...state,
        isFetchingShipments: false,
        shipments: action.payload,
      };
    }
    case types.FETCH_ORDER_SHIPMENTS.FAILED: {
      return {
        ...state,
        isFetchingShipments: false,
        shipments: {},
      };
    }

    case types.RESEND_SHIPMENT_LABEL.baseType: {
      return {
        ...state,
        isResendingLabel: true,
      };
    }
    case types.RESEND_SHIPMENT_LABEL.SUCCESS:
    case types.RESEND_SHIPMENT_LABEL.FAILED: {
      return {
        ...state,
        isResendingLabel: false,
      };
    }

    case types.RECEIVE_ORDER_ITEM_BY_ID.baseType: {
      return {
        ...state,
        isUpdatingOrderItem: true,
      };
    }
    case types.RECEIVE_ORDER_ITEM_BY_ID.SUCCESS: {
      return {
        ...state,
        isUpdatingOrderItem: false,
      };
    }
    case types.RECEIVE_ORDER_ITEM_BY_ID.FAILED: {
      return {
        ...state,
        isUpdatingOrderItem: false,
      };
    }

    case types.EVALUATE_ORDER_ITEM_BY_ID.baseType: {
      return {
        ...state,
        isUpdatingOrderItem: true,
      };
    }
    case types.EVALUATE_ORDER_ITEM_BY_ID.SUCCESS: {
      return {
        ...state,
        isUpdatingOrderItem: false,
      };
    }
    case types.EVALUATE_ORDER_ITEM_BY_ID.FAILED: {
      return {
        ...state,
        isUpdatingOrderItem: false,
      };
    }

    case types.CLEAR_ORDER_ITEMS: {
      return {
        ...state,
        isFetchingOrderItems: true,
        orderItems: [],
      };
    }

    case types.SET_TOGGLE_MODAL: {
      return {
        ...state,
        isModalOpen: action.payload,
      };
    }

    case types.SET_ACTIVE_ORDER_ITEM: {
      return {
        ...state,
        activeOrderItem: action.payload,
      };
    }

    case types.CLEAR_ORDERS: {
      return {
        ...state,
        orders: [],
      };
    }


    default:
      return state;
  }
};

export { orderReducer, orderState };
