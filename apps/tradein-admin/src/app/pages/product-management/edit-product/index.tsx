/* eslint-disable react-hooks/exhaustive-deps */
import { LoaderContainer, Tab, Tabs, useProduct } from '@tradein-admin/libs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EditProductDetails } from './edit-product';
import { EditProductVariant } from './edit-product-variant';

export function EditProductPage() {
  const {
    state,
    getProduct,
    getProductTypes,
    getProductStatuses,
    clearProduct,
  } = useProduct();
  const {
    product,
    isFetchingProduct,
    isUpdatingProduct,
    isAddingProductVariant,
    isUpdatingProductVariant,
  } = state;

  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getProduct(id, signal);
    getProductTypes(signal);
    getProductStatuses(signal);

    return () => {
      controller.abort();

      // Clear data on unmount
      clearProduct({});
    };
  }, []);

  return (
    <LoaderContainer
      margin="20px"
      padding="10px"
      color="#01463a"
      loading={
        isFetchingProduct ||
        isUpdatingProduct ||
        isAddingProductVariant ||
        isUpdatingProductVariant
      }
      title="Edit Product"
    >
      <Tabs>
        <Tab label="Details">
          <EditProductDetails productData={product} />
        </Tab>
        <Tab label="Variants">
          <EditProductVariant productData={product} />
        </Tab>
      </Tabs>
    </LoaderContainer>
  );
}
