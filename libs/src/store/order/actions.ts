/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../axios';
import * as types from './action-types';
import { toast } from 'react-toastify';

export const getAllOrders = (platform: any) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_ORDERS.baseType,
    platform,
  });

  axiosInstance()
    .get(`/api/orders?platform=${platform}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_ORDERS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_ORDERS.FAILED,
        payload: error,
      });

      toast.error('Failed to fetch orders.');
    });
};

export const getOrderShipments = (payload: string) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_ORDER_SHIPMENTS.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/orders/${payload}/shipments`)
    .then((response) => {
      dispatch({
        type: types.FETCH_ORDER_SHIPMENTS.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_ORDER_SHIPMENTS.FAILED,
        payload: error,
      });

      toast.error('Failed to fetch order shipments.');
    });
};

export const getOrderById = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.FETCH_ORDER_BY_ID.baseType,
    payload,
  });

  axiosInstance()
    .get(`/api/orders/${payload}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_ORDER_BY_ID.SUCCESS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_ORDER_BY_ID.FAILED,
        payload: error,
      });

      toast.error('Failed to fetch order details.');
    });
};

export const updateOrderById =
  (orderId: any, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.UPDATE_ORDER_BY_ID.baseType,
      payload,
    });

    axiosInstance()
      .patch(`/api/orders/${orderId}`, payload)
      .then((response) => {
        dispatch({
          type: types.UPDATE_ORDER_BY_ID.SUCCESS,
          payload: response?.data,
        });

        getOrderById(orderId)(dispatch);
        toast.success('Order successfully updated!');
      })
      .catch((error) => {
        dispatch({
          type: types.UPDATE_ORDER_BY_ID.FAILED,
          payload: error,
        });

        getOrderById(orderId)(dispatch);
        toast.error('Failed to update order details.');
      });
  };

export const cancelOrderById = (orderId: any) => (dispatch: any) => {
    dispatch({
      type: types.CANCEL_ORDER_BY_ID.baseType,
    });

    axiosInstance()
      .patch(`/api/orders/${orderId}/cancel`)
      .then((response) => {
        dispatch({
          type: types.CANCEL_ORDER_BY_ID.SUCCESS,
        });

        getOrderById(orderId)(dispatch);
        toast.success('Order successfully cancelled!');
      })
      .catch((error) => {
        dispatch({
          type: types.CANCEL_ORDER_BY_ID.FAILED,
          payload: error,
        });

        getOrderById(orderId)(dispatch);
        toast.error('Failed to cancel order.');
      });
  };

export const resendShipmentLabel =
  (orderId: any) => (dispatch: any) => {
    dispatch({
      type: types.RESEND_SHIPMENT_LABEL.baseType,
      orderId,
    });

    axiosInstance()
      .post(`/api/orders/${orderId}/resend-label`)
      .then((response) => {
        dispatch({
          type: types.RESEND_SHIPMENT_LABEL.SUCCESS,
          payload: response?.data,
        });

        toast.success('Order label successfully resent!');
      })
      .catch((error) => {
        dispatch({
          type: types.RESEND_SHIPMENT_LABEL.FAILED,
          payload: error,
        });

        toast.error('Failed to resend order label.');
      });
  };

export const updateOrderItemById =
  (orderItemId: any, orderId: any, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.UPDATE_ORDER_ITEM_BY_ID.baseType,
      payload,
    });

    axiosInstance()
      .patch(`/api/orders/items/${orderItemId}/status`, payload)
      .then((response) => {
        dispatch({
          type: types.UPDATE_ORDER_ITEM_BY_ID.SUCCESS,
          payload: response?.data,
        });

        getOrderById(orderId)(dispatch);
        getOrderShipments(orderId)(dispatch);
        setToggleModal(false)(dispatch);
        toast.success('Order item status successfully updated!');
      })
      .catch((error) => {
        dispatch({
          type: types.UPDATE_ORDER_ITEM_BY_ID.FAILED,
          payload: error,
        });

        toast.error('Failed to update order item status.');
      });
  };

export const deleteOrderById = (payload: any, platform: string) => (dispatch: any) => {
  dispatch({
    type: types.DELETE_ORDER_BY_ID.baseType,
    payload,
  });

  axiosInstance()
    .delete(`/api/orders/${payload}`)
    .then((response) => {
      dispatch({
        type: types.DELETE_ORDER_BY_ID.SUCCESS,
        payload: response?.data,
      });

      getAllOrders(platform)(dispatch);
      toast.success('Order successfully deleted!');
    })
    .catch((error) => {
      dispatch({
        type: types.DELETE_ORDER_BY_ID.FAILED,
        payload: error,
      });

      getAllOrders(platform)(dispatch);
      toast.error('Failed to delete order.');
    });
};

export const receiveOrderItemById =
  (orderItemId: any, orderId: any) => (dispatch: any) => {
    dispatch({
      type: types.RECEIVE_ORDER_ITEM_BY_ID.baseType,
      orderItemId,
    });

    axiosInstance()
      .patch(`/api/orders/receive/${orderItemId}`)
      .then((response) => {
        dispatch({
          type: types.RECEIVE_ORDER_ITEM_BY_ID.SUCCESS,
          payload: response?.data,
        });

        getOrderById(orderId)(dispatch);
        getOrderShipments(orderId)(dispatch);
        toast.success('Order item successfully updated!');
      })
      .catch((error) => {
        dispatch({
          type: types.RECEIVE_ORDER_ITEM_BY_ID.FAILED,
          payload: error,
        });

        toast.error('Failed to update order item status.');
      });
  };

export const evaluateOrderItemById =
(orderItemId: any, orderId: any, payload: any) => (dispatch: any) => {
  dispatch({
    type: types.EVALUATE_ORDER_ITEM_BY_ID.baseType,
    orderItemId,
  });

  axiosInstance()
    .post(`/api/orders/${orderItemId}/evaluate`, payload)
    .then((response) => {
      dispatch({
        type: types.EVALUATE_ORDER_ITEM_BY_ID.SUCCESS,
        payload: response?.data,
      });

      getOrderById(orderId)(dispatch);
      getOrderShipments(orderId)(dispatch);
      setToggleModal(false)(dispatch);
      toast.success('Order item successfully updated!');
    })
    .catch((error) => {
      dispatch({
        type: types.EVALUATE_ORDER_ITEM_BY_ID.FAILED,
        payload: error,
      });

      toast.error('Failed to update order item status.');
    });
};

export const setToggleModal = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_TOGGLE_MODAL,
    payload,
  });
};

export const setActiveOrderItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_ACTIVE_ORDER_ITEM,
    payload,
  });
};

export const clearOrders = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_ORDERS,
    payload,
  });
};
