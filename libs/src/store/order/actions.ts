/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import { BAD_REQUEST, CANCELLED_AXIOS } from '../../constants';
import axiosInstance from '../axios';
import * as types from './action-types';

export const getOrderItems =
  (payload: any, platform: string, signal?: AbortSignal) => (dispatch: any) => {
    dispatch({
      type: types.FETCH_ORDER_ITEMS.baseType,
      payload,
    });

    axiosInstance()
      .get(`/api/orders/items?platform=${platform}`, {
        params: payload,
        signal: signal,
      })
      .then((response) => {
        dispatch({
          type: types.FETCH_ORDER_ITEMS.SUCCESS,
          payload: response?.data,
        });
      })
      .catch((error) => {
        if (error.code === CANCELLED_AXIOS) {
          dispatch({
            type: types.FETCH_ORDER_ITEMS.CANCELLED,
            payload: error,
          });
        } else {
          dispatch({
            type: types.FETCH_ORDER_ITEMS.FAILED,
            payload: error,
          });
        }
      });
  };

export const clearOrderItems = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_ORDER_ITEMS,
    payload,
  });
};

export const getAllOrders =
  (platform: any, signal?: AbortSignal) => (dispatch: any) => {
    dispatch({
      type: types.FETCH_ORDERS.baseType,
      platform,
    });

    axiosInstance()
      .get(`/api/orders?platform=${platform}`, { signal: signal })
      .then((response) => {
        dispatch({
          type: types.FETCH_ORDERS.SUCCESS,
          payload: response?.data,
        });
        dispatch({
          type: types.FETCH_ORDER_PAYMENTS.SUCCESS,
          payload: response?.data
        })
      })
      .catch((error) => {
        if (error.code === CANCELLED_AXIOS) {
          dispatch({
            type: types.FETCH_ORDERS.CANCELLED,
            payload: error,
          });
          dispatch({
            type: types.FETCH_ORDER_PAYMENTS.CANCELLED,
            payload: error,
          });
        } else {
          dispatch({
            type: types.FETCH_ORDER_PAYMENTS.FAILED,
            payload: error,
          });
        }
      });
  };

export const getOrderShipments =
  (payload: string, signal?: AbortSignal) => (dispatch: any) => {
    dispatch({
      type: types.FETCH_ORDER_SHIPMENTS.baseType,
      payload,
    });

    axiosInstance()
      .get(`/api/orders/${payload}/shipments`, { signal: signal })
      .then((response) => {
        dispatch({
          type: types.FETCH_ORDER_SHIPMENTS.SUCCESS,
          payload: response?.data,
        });
      })
      .catch((error) => {
        if (error.code === CANCELLED_AXIOS) {
          dispatch({
            type: types.FETCH_ORDER_SHIPMENTS.CANCELLED,
            payload: error,
          });
        } else {
          dispatch({
            type: types.FETCH_ORDER_SHIPMENTS.FAILED,
            payload: error,
          });
        }
      });
  };

export const getOrderById =
  (payload: any, signal?: AbortSignal) => (dispatch: any) => {
    dispatch({
      type: types.FETCH_ORDER_BY_ID.baseType,
      payload,
    });

    axiosInstance()
      .get(`/api/orders/${payload}`, { signal: signal })
      .then((response) => {
        dispatch({
          type: types.FETCH_ORDER_BY_ID.SUCCESS,
          payload: response?.data,
        });
      })
      .catch((error) => {
        if (error.code === CANCELLED_AXIOS) {
          dispatch({
            type: types.FETCH_ORDER_BY_ID.CANCELLED,
            payload: error,
          });
        } else {
          dispatch({
            type: types.FETCH_ORDER_BY_ID.FAILED,
            payload: error,
          });
        }
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
  (id: any, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.RESEND_SHIPMENT_LABEL.baseType,
      id,
    });

    axiosInstance()
      .post(`/api/shipment/resend-label/${id}`, payload)
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

export const resendOrderItemShipmentLabel =
  (orderId: any) => (dispatch: any) => {
    dispatch({
      type: types.RESEND_ITEM_SHIPMENT_LABEL.baseType,
      orderId,
    });

    axiosInstance()
      .post(`/api/orders/${orderId}/resend-label`)
      .then((response) => {
        dispatch({
          type: types.RESEND_ITEM_SHIPMENT_LABEL.SUCCESS,
          payload: response?.data,
        });

        toast.success('Order label successfully resent!');
      })
      .catch((error) => {
        dispatch({
          type: types.RESEND_ITEM_SHIPMENT_LABEL.FAILED,
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

export const deleteOrderById =
  (payload: any, platform: string) => (dispatch: any) => {
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

export const receiveOrderItemById = (orderItemId: any, orderId: any, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.RECEIVE_ORDER_ITEM_BY_ID.baseType,
      orderItemId,
    });

    axiosInstance()
      .patch(`/api/orders/receive/${orderItemId}`, payload)
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

export const reviseOfferByItemId =
(orderItemNumber: any, orderId: any, payload: any) => (dispatch: any) => {
  dispatch({
    type: types.REVISE_OFFER_BY_ITEM_ID.baseType,
    orderItemNumber,
  });

  axiosInstance()
    .patch(`/api/order/item/${orderItemNumber}/revise-offer`, payload)
    .then((response) => {
      dispatch({
        type: types.REVISE_OFFER_BY_ITEM_ID.SUCCESS,
        payload: response?.data,
      });

      getOrderById(orderId)(dispatch);
      getOrderShipments(orderId)(dispatch);
      setToggleModal(false)(dispatch);
      toast.success('Order item successfully updated!');
    })
    .catch((error) => {
      dispatch({
        type: types.REVISE_OFFER_BY_ITEM_ID.FAILED,
        payload: error,
      });

      toast.error('Failed to update order item status.');
    });
};

export const cancelOrderItemById =
  (orderItemId: any, orderId: any, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.CANCEL_ORDER_ITEM_BY_ID.baseType,
      payload,
    });

    axiosInstance()
      .patch(`/api/orders/items/${orderItemId}/status`, payload)
      .then((response) => {
        dispatch({
          type: types.CANCEL_ORDER_ITEM_BY_ID.SUCCESS,
          payload: response?.data,
        });

        getOrderById(orderId)(dispatch);
        getOrderShipments(orderId)(dispatch);
        setToggleModal(false)(dispatch);
        toast.success('Order item status successfully updated!');
      })
      .catch((error) => {
        dispatch({
          type: types.CANCEL_ORDER_ITEM_BY_ID.FAILED,
          payload: error,
        });

        toast.error('Failed to update order item status.');
      });
  };

export const updateShipmentStatus =
  (shipmentId: string, orderId: string, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.UPDATE_SHIPPING_STATUS_BY_ID.baseType,
      payload,
    });

    axiosInstance()
      .patch(`/api/shipments/status/${shipmentId}`, payload)
      .then((response) => {
        dispatch({
          type: types.UPDATE_SHIPPING_STATUS_BY_ID.SUCCESS,
          payload: response?.data,
        });
        getOrderShipments(orderId)(dispatch);
        toast.success('Shipment status successfully updated!');
      })
      .catch((error) => {
        dispatch({
          type: types.UPDATE_SHIPPING_STATUS_BY_ID.FAILED,
          payload: error,
        });
      });
  };

export const updateSendinDeadline =
  (orderId: string, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.UPDATE_ORDER_SENDIN_DEADLINE.baseType,
      payload,
    });

    axiosInstance()
      .patch('/api/orders/items/sendin-deadline', payload)
      .then((response) => {
        dispatch({
          type: types.UPDATE_ORDER_SENDIN_DEADLINE.SUCCESS,
          payload: response?.data,
        });
        getOrderById(orderId)(dispatch);
        toast.success('Send-in Deadline extended!');
      })
      .catch((error) => {
        dispatch({
          type: types.UPDATE_ORDER_SENDIN_DEADLINE.FAILED,
          payload: error,
        });
      });
  };

export const bulkCancelOrderItems =
  (orderId: any, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.BULK_CANCEL_ORDER_ITEMS.baseType,
      payload,
    });

    axiosInstance()
      .patch('/api/order/items/cancel-bulk', payload)
      .then((response) => {
        dispatch({
          type: types.BULK_CANCEL_ORDER_ITEMS.SUCCESS,
          payload: response?.data,
        });

        getOrderById(orderId)(dispatch);
        toast.success('Order items successfully cancelled!');
      })
      .catch((error) => {
        dispatch({
          type: types.BULK_CANCEL_ORDER_ITEMS.FAILED,
          payload: error,
        });

        toast.error('Failed to update order item status.');
      });
  };

export const logCustomerNonContact =
  (orderId: string, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.LOG_CUSTOMER_NONCONTACT.baseType,
      payload,
    });

    axiosInstance()
      .patch(`/api/orders/${orderId}/non-contact`, payload)
      .then((response) => {
        dispatch({
          type: types.LOG_CUSTOMER_NONCONTACT.SUCCESS,
          payload: response?.data,
        });
        getOrderById(orderId)(dispatch);
        toast.success('Customer contact logged!');
      })
      .catch((error) => {
        dispatch({
          type: types.LOG_CUSTOMER_NONCONTACT.FAILED,
          payload: error,
        });
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

export const setActiveOrder = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_ACTIVE_ORDER,
    payload,
  });
};

export const clearOrders = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_ORDERS,
    payload,
  });
};

export const generateLabels =
  (payload: any, onSuccess: any = false) =>
  (dispatch: any) => {
    dispatch({
      type: types.GENERATE_LABELS.baseType,
      payload,
    });

    axiosInstance()
      .post(
        '/api/shipments/generate-labels?label=return,outbound&update_status=true',
        payload,
      )
      .then((response) => {
        dispatch({
          type: types.GENERATE_LABELS.SUCCESS,
          payload: response?.data,
        });

        const { data = {} } = response?.data || {};
        if (data?.return?.label) {
          window.open(data?.return?.label, '_blank');
        }
        if (data?.outbound?.label) {
          window.open(data?.outbound?.label, '_blank');
        }

        if (onSuccess && typeof onSuccess == 'function') {
          onSuccess(data);
        }
      })
      .catch((error) => {
        dispatch({
          type: types.GENERATE_LABELS.FAILED,
          payload: error,
        });

        toast.error('Failed to generate labels.');
      });
  };

export const generateOutboundLabel =
  (payload: any, onSuccess: any = false) =>
  (dispatch: any) => {
    dispatch({
      type: types.GENERATE_LABELS.baseType,
      payload,
    });

    axiosInstance()
      .post('/api/shipments/generate-labels?label=outbound', payload)
      .then((response) => {
        dispatch({
          type: types.GENERATE_OUTBOUND_LABEL.SUCCESS,
          payload: response?.data,
        });

        const { data = {} } = response?.data || {};
        if (data?.outbound?.label) {
          window.open(data?.outbound?.label, '_blank');
        }

        if (onSuccess && typeof onSuccess == 'function') {
          onSuccess(data);
        }
      })
      .catch((error) => {
        dispatch({
          type: types.GENERATE_OUTBOUND_LABEL.FAILED,
          payload: error,
        });

        toast.error('Failed to generate labels.');
      });
  };

export const updateOrderItemImeiSerial =
  (orderItemId: string, orderId: string, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.UPDATE_ORDER_ITEM_IMEI_SERIAL.baseType,
      payload,
    });

    axiosInstance()
      .patch(`/api/orders/items/${orderItemId}/imei-serial`, payload)
      .then((response) => {
        dispatch({
          type: types.UPDATE_ORDER_ITEM_IMEI_SERIAL.SUCCESS,
          payload: response,
        });

        getOrderById(orderId)(dispatch);
        toast.success('IMEI/Serial successfully updated!');
      })
      .catch((error) => {
        dispatch({
          type: types.UPDATE_ORDER_ITEM_IMEI_SERIAL.FAILED,
          payload: error,
        });

        toast.error('Failed to update IMEI/Serial.');
      });
  };

export const getGiftCardStatus =
  (orderId: any, payload: any, signal?: AbortSignal) => (dispatch: any) => {
    dispatch({
      type: types.FETCH_GIFT_CARD_STATUS.baseType,
    });

    axiosInstance()
      .get('/api/epay/balance-inquiry', { params: payload, signal: signal })
      .then((response) => {
        dispatch({
          type: types.FETCH_GIFT_CARD_STATUS.SUCCESS,
          payload: response?.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.FETCH_GIFT_CARD_STATUS.FAILED,
          payload: error,
        });

        toast.error('Failed to check gift card status.');
      });
  };

export const cancelGiftCard =
  (orderId: any, voucherPan: any, signal?: AbortSignal) => (dispatch: any) => {
    dispatch({
      type: types.CANCEL_GIFT_CARD.baseType,
    });

    axiosInstance()
      .patch(
        `/api/payments/cancel-voucher-by-query/${orderId}?voucherPan=${voucherPan}`,
        { signal: signal },
      )
      .then((response) => {
        dispatch({
          type: types.CANCEL_GIFT_CARD.SUCCESS,
          payload: response?.data,
        });
        getOrderById(orderId)(dispatch);
        toast.success('Gift card successfully cancelled!');
      })
      .catch((error) => {
        dispatch({
          type: types.CANCEL_GIFT_CARD.FAILED,
          payload: error,
        });

        toast.error('Failed to check gift card status.');
      });
  };

  export const updateOrderItemsStatus =
  (orderItemId: any, payload: any, onSuccess: any = false) => (dispatch: any) => {
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

      })
      .catch((error) => {
        dispatch({
          type: types.UPDATE_ORDER_ITEM_BY_ID.FAILED,
          payload: error,
        });
      });
  };

export const getAllOrderPayments =
  (platform: any, signal?: AbortSignal) => (dispatch: any) => {
    dispatch({
      type: types.FETCH_ORDER_PAYMENTS.baseType,
      platform,
    });

    axiosInstance()
      .get(`/api/orders/flat-file-data?platform=${platform}`, { signal: signal })
      .then((response) => {
        dispatch({
          type: types.FETCH_ORDER_PAYMENTS.SUCCESS,
          payload: response?.data,
        });
      })
      .catch((error) => {
        if (error.code === CANCELLED_AXIOS) {
          dispatch({
            type: types.FETCH_ORDER_PAYMENTS.CANCELLED,
            payload: error,
          });
        } else {
          dispatch({
            type: types.FETCH_ORDER_PAYMENTS.FAILED,
            payload: error,
          });
        }
      });
  };

export const getOrderPaymentById =
  (payload: any, signal?: AbortSignal) => (dispatch: any) => {
    dispatch({
      type: types.FETCH_ORDER_PAYMENT_BY_ID.baseType,
      payload,
    });

    axiosInstance()
      .get(`/api/orders/flat-file-data/${payload}`, { signal: signal })
      .then((response) => {
        dispatch({
          type: types.FETCH_ORDER_PAYMENT_BY_ID.SUCCESS,
          payload: response?.data,
        });
      })
      .catch((error) => {
        if (error.code === CANCELLED_AXIOS) {
          dispatch({
            type: types.FETCH_ORDER_PAYMENT_BY_ID.CANCELLED,
            payload: error,
          });
        } else {
          dispatch({
            type: types.FETCH_ORDER_PAYMENT_BY_ID.FAILED,
            payload: error,
          });
        }
      });
  };

export const downloadOrderPaymentFile =
  (payload: any, signal?: AbortSignal) => (dispatch: any) => {
    dispatch({
      type: types.DOWNLOAD_ORDER_PAYMENT_FILE.baseType,
      payload,
    });

    axiosInstance()
      .get('/api/orders/download-flat-file', { 
        signal: signal,
        params: payload,
      })
      .then((response) => {
        dispatch({
          type: types.DOWNLOAD_ORDER_PAYMENT_FILE.SUCCESS,
          payload: response?.data,
        });
      })
      .catch((error) => {
        if (error.code === CANCELLED_AXIOS) {
          dispatch({
            type: types.DOWNLOAD_ORDER_PAYMENT_FILE.CANCELLED,
            payload: error,
          });
        } else if (error.code === BAD_REQUEST) {
          dispatch({
            type: types.DOWNLOAD_ORDER_PAYMENT_FILE.FAILED,
            payload: error,
          });

          toast.error('No data available for the selected date; no file generated for export. Please choose another date.');
        } else {
          dispatch({
            type: types.DOWNLOAD_ORDER_PAYMENT_FILE.FAILED,
            payload: error,
          });

          toast.error('Failed to download file.');
        }
      });
  };

export const clearOrderPaymentItems = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_ORDER_PAYMENT_ITEMS,
    payload,
  });
};

export const clearOrder = (payload: any) => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_ORDER,
    payload,
  });
};

export const addOrderNote = (orderId: string, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.ADD_ORDER_NOTE.baseType,
      payload,
    });

    axiosInstance()
      .post('/api/orders/notes', payload)
      .then((response) => {
        dispatch({
          type: types.ADD_ORDER_NOTE.SUCCESS,
          payload: response?.data,
        });

        getOrderById(orderId)(dispatch);
        toast.success('Note added successfully!');
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_ORDER_NOTE.FAILED,
          payload: error,
        });

        toast.error('Failed to add note.');
      });
  };

  export const upsertZendeskLink = (orderId: string, payload: any) => (dispatch: any) => {
    dispatch({
      type: types.UPSERT_ZENDESK_LINK.baseType,
      payload,
    });

    axiosInstance()
      .patch(`/api/orders/${orderId}/insert-zendesk-link`, payload)
      .then((response) => {
        dispatch({
          type: types.UPSERT_ZENDESK_LINK.SUCCESS,
          payload: response?.data,
        });

        getOrderById(orderId)(dispatch);
        toast.success('Successfully saved zendesk link!');
      })
      .catch((error) => {
        dispatch({
          type: types.UPSERT_ZENDESK_LINK.FAILED,
          payload: error,
        });

        toast.error('Failed to save zendesk link.');
      });
  };
