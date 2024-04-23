/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { OrderItemStatus } from '../../constants';
import { RootContext } from '../provider';
import * as actions from './actions';
import { toast } from 'react-toastify';

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

  const cancelOrderItemById = (id: any) => {
    const orderId = state.order?.order?._id;
    const payload = { status: OrderItemStatus.CANCELLED }
    actions.cancelOrderItemById(id, orderId, payload)(dispatch);
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

  const receiveOrderItemById = (id: any) => {
    const orderId = state.order?.order?._id;
    actions.receiveOrderItemById(id, orderId)(dispatch);
  };

  const evaluateOrderItemById = (id: any, payload: any) => {
    const orderId = state.order?.order?._id;
    actions.evaluateOrderItemById(id, orderId, payload)(dispatch);
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

  const cancelGiftCard = (id: any, payload: any, signal?: AbortSignal) => {
    actions.cancelGiftCard(id, payload, signal)(dispatch);
  };

  const clearOrder = () => {
    actions.clearOrder({})(dispatch);
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
    cancelOrderItemById,
    updateShipmentStatusById,
    openModal,
    closeModal,
    setActiveOrderItem,
    clearOrders,
    sendBox,
    printLabels,
    printOutboundLabel,
    updateOrderItemImeiSerial,
    getGiftCardStatus,
    cancelGiftCard,
    clearOrder,
  };
};
