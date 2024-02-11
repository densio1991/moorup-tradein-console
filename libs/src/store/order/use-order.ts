/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RootContext } from '../provider';
import * as actions from './actions';

export const useOrder = () => {
  const { state, dispatch } = useContext(RootContext);
  const {
    activePlatform,
  } = state.auth;

  const fetchOrders = () => {
    actions.getAllOrders(activePlatform)(dispatch);
  };

  const fetchOrderById = (id: any) => {
    actions.getOrderById(id)(dispatch);
  };

  const patchOrderById = async (id: any, payload: any) => {
    actions.updateOrderById(id, payload)(dispatch);
  }

  const cancelOrderById = async (id: any) => {
    actions.cancelOrderById(id)(dispatch);
  }

  const patchOrderItemById = (id: any, payload: any) => {
    const orderId = state.order?._id;
    actions.updateOrderItemById(id, orderId, payload)(dispatch);
  }

  const removeOrderById = (payload: any) => {
    actions.deleteOrderById(payload, activePlatform)(dispatch);
  }

  const fetchOrderShipments = (id: string) => {
    actions.getOrderShipments(id)(dispatch);
  };

  const resendShipmentLabel = (id: string) => {
    actions.resendShipmentLabel(id)(dispatch);
  };

  const receiveOrderItemById = (id: string) => {
    const orderId = state.order?._id;
    actions.receiveOrderItemById(id, orderId)(dispatch);
  };

  const evaluateOrderItemById = (id: string, payload: any) => {
    const orderId = state.order?._id;
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

  return {
    state: state.order,
    fetchOrders,
    fetchOrderById,
    patchOrderById,
    cancelOrderById,
    removeOrderById,
    patchOrderItemById,
    fetchOrderShipments,
    resendShipmentLabel,
    receiveOrderItemById,
    evaluateOrderItemById,

    openModal,
    closeModal,
    setActiveOrderItem,
    clearOrders,
  };
};