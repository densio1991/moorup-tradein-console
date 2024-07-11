/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { OrderItemStatus } from '../../constants';
import { RootContext } from '../provider';
import * as actions from './actions';

export const useOrder = () => {
  const { state, dispatch } = useContext(RootContext);
  const {
    activePlatform,
  } = state.auth;

  const getOrderItems = (payload: any, signal: AbortSignal) => {
    actions.getOrderItems(payload, activePlatform, signal)(dispatch);
  }

  const clearOrderItems = (payload: any) => {
    actions.clearOrderItems(payload)(dispatch);
  }

  const fetchOrders = (signal: AbortSignal) => {
    actions.getAllOrders(activePlatform, signal)(dispatch);
  };

  const fetchOrderById = (id: any, signal: AbortSignal) => {
    actions.getOrderById(id, signal)(dispatch);
  };

  const patchOrderById = async (id: any, payload: any) => {
    actions.updateOrderById(id, payload)(dispatch);
  }

  const cancelOrderById = async (id: any) => {
    actions.cancelOrderById(id)(dispatch);
  }

  const patchOrderItemById = (id: any, payload: any) => {
    const orderId = state.order?.order?._id;
    actions.updateOrderItemById(id, orderId, payload)(dispatch);
  }

  const extendSendinDeadline = (id: any, payload: any) => {
    actions.updateSendinDeadline(id, payload)(dispatch);
  }

  const logCustomerNonContact = (id: any, payload: any) => {
    actions.logCustomerNonContact(id, payload)(dispatch);
  }

  const cancelOrderItemById = (id: any) => {
    const orderId = state.order?.order?._id;
    const payload = { status: OrderItemStatus.CANCELLED }
    actions.cancelOrderItemById(id, orderId, payload)(dispatch);
  }

  const bulkCancelOrderItems = (payload: any) => {
    const orderId = state.order?.order?._id;
    actions.bulkCancelOrderItems(orderId, payload)(dispatch);
  }

  const removeOrderById = (payload: any) => {
    actions.deleteOrderById(payload, activePlatform)(dispatch);
  }

  const fetchOrderShipments = (id: any, signal?: AbortSignal) => {
    actions.getOrderShipments(id, signal)(dispatch);
  };

  const updateShipmentStatusById = (shipmentId: string, payload: any) => {
    const orderId = state.order?.order?._id;
    actions.updateShipmentStatus(shipmentId, orderId, payload)(dispatch);
  };

  const resendShipmentLabel = (id: any) => {
    const payload = {
      platform: activePlatform,
      orderFlow: state.order?.order?.order_flow,
    }
    actions.resendShipmentLabel(id, payload)(dispatch);
  };

  const resendOrderItemShipmentLabel = (id: any) => {
    actions.resendOrderItemShipmentLabel(id)(dispatch);
  };

  const receiveOrderItemById = (id: any, payload: any) => {
    const orderId = state.order?.order?._id;
    actions.receiveOrderItemById(id, orderId, payload)(dispatch);
  };

  const evaluateOrderItemById = (id: any, payload: any) => {
    const orderId = state.order?.order?._id;
    actions.evaluateOrderItemById(id, orderId, payload)(dispatch);
  };

  const reviseOfferByItemId = (id: any, payload: any) => {
    const orderId = state.order?.order?._id;
    actions.reviseOfferByItemId(id, orderId, payload)(dispatch);
  };

  const openModal = () => {
    actions.setToggleModal(true)(dispatch);
  }

  const closeModal = () => {
    actions.setToggleModal(false)(dispatch);
  }

  const setActiveOrderItem = (orderItem: any) => {
    actions.setActiveOrderItem(orderItem)(dispatch);
  }

  const setActiveOrder = (order: any) => {
    actions.setActiveOrder(order)(dispatch);
  }

  const clearOrders = () => {
    actions.clearOrders({})(dispatch);
  }

  const sendBox = (orderId: string, payload: any) => {
    const onSuccess = () => {
      toast.success('Successfully sent box');
      fetchOrderShipments(orderId);
    }
    actions.generateLabels(payload, onSuccess)(dispatch);
  }

  const printLabels = (payload: any) => {
    actions.generateLabels(payload)(dispatch);
  }

  const printOutboundLabel = (payload: any) => {
    actions.generateOutboundLabel(payload)(dispatch);
  }

  const updateOrderItemImeiSerial = (orderItemId: string, orderId: any, payload: any) => {
    actions.updateOrderItemImeiSerial(orderItemId, orderId, payload)(dispatch);
  }

  const getGiftCardStatus = (id: any, payload: any, signal?: AbortSignal) => {
    actions.getGiftCardStatus(id, payload, signal)(dispatch);
  };

  const updateOrderItemsStatus = (orderItemId: any, payload: any, signal?: AbortSignal) => {
    actions.updateOrderItemsStatus(orderItemId, payload)(dispatch);
  };

  const cancelGiftCard = (id: any, payload: any, signal?: AbortSignal) => {
    actions.cancelGiftCard(id, payload, signal)(dispatch);
  };

  const fetchOrderPayments = (signal: AbortSignal) => {
    actions.getAllOrderPayments(activePlatform, signal)(dispatch);
  };

  const fetchOrderPaymentById = (id: any, signal: AbortSignal) => {
    actions.getOrderById(id, signal)(dispatch);
  };

  const downloadOrderPaymentFile = (id: any, signal?: AbortSignal) => {
    actions.downloadOrderPaymentFile(id, signal)(dispatch);
  };

  const clearOrder = () => {
    actions.clearOrder({})(dispatch);
  }

  const addOrderNote = (orderId: string, payload: any) => {
    actions.addOrderNote(orderId, payload)(dispatch);
  }

  const upsertZendeskLink = (orderId: string, payload: any) => {
    actions.upsertZendeskLink(orderId, payload)(dispatch);
  }

  return {
    state: state.order,
    getOrderItems,
    clearOrderItems,
    fetchOrders,
    fetchOrderById,
    patchOrderById,
    cancelOrderById,
    removeOrderById,
    patchOrderItemById,
    fetchOrderShipments,
    resendShipmentLabel,
    resendOrderItemShipmentLabel,
    receiveOrderItemById,
    evaluateOrderItemById,
    reviseOfferByItemId,
    cancelOrderItemById,
    updateShipmentStatusById,
    openModal,
    closeModal,
    setActiveOrderItem,
    setActiveOrder,
    clearOrders,
    sendBox,
    printLabels,
    printOutboundLabel,
    updateOrderItemImeiSerial,
    getGiftCardStatus,
    updateOrderItemsStatus,
    cancelGiftCard,
    clearOrder,
    fetchOrderPayments,
    fetchOrderPaymentById,
    addOrderNote,
    upsertZendeskLink,
    logCustomerNonContact,
    extendSendinDeadline,
    downloadOrderPaymentFile,
    bulkCancelOrderItems,
  };
};
