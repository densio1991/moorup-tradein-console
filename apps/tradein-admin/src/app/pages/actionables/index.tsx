/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ACTIONABLES_MANAGEMENT_COLUMNS,
  ACTIONS_COLUMN,
  OrderStatus,
  PRODUCT_TYPES,
  PRODUCT_TYPES_OPTIONS,
  StyledReactSelect,
  Table,
  actionablesManagementParsingConfig,
  useAuth,
  useOrder,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

export function ActionablesPage() {
  const { state, getOrderItems, clearOrderItems, generateLabels } = useOrder();
  const { state: authState } = useAuth();
  const { orderItems, isFetchingOrderItems } = state;
  const { activePlatform } = authState;
  const [selectedProductTypes, setSelectedProductTypes] = useState([
    PRODUCT_TYPES.LAPTOPS,
    PRODUCT_TYPES.TABLETS,
  ]);

  const headers = [...ACTIONABLES_MANAGEMENT_COLUMNS, ...ACTIONS_COLUMN];

  const addPrintLabelAction = (orderItems: any) => {
    return orderItems.map((orderItem: any) => ({
      ...orderItem,
      action: () =>
        generateLabels({ item_id: orderItem?.order_items?._id }, true),
    }));
  };

  const formattedOrderItems = addPrintLabelAction(orderItems || []);

  useEffect(() => {
    const filters = {
      status: OrderStatus.CREATED,
      product_type: selectedProductTypes?.join(','),
    };

    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getOrderItems(filters, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearOrderItems({});
    };
  }, [activePlatform, selectedProductTypes]);

  const types = PRODUCT_TYPES_OPTIONS?.sort(
    (a: { label: string }, b: { label: any }) => a.label.localeCompare(b.label),
  );

  return (
    <Table
      label="Actionables"
      isLoading={isFetchingOrderItems}
      headers={headers}
      rows={formattedOrderItems || []}
      parsingConfig={actionablesManagementParsingConfig}
      rightControls={
        <StyledReactSelect
          name="product_type"
          isMulti={true}
          options={types}
          placeholder="Filter product type"
          value={selectedProductTypes}
          onChange={(selected) => {
            const productTypeValues = selected?.map(
              (option: any) => option.value,
            );

            setSelectedProductTypes(productTypeValues);
          }}
        />
      }
    />
  );
}
