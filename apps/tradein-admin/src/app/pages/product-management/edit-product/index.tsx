/* eslint-disable react-hooks/exhaustive-deps */
import { Loader, Tab, Tabs, useProduct } from '@tradein-admin/libs';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { EditProductDetails } from './edit-product';

const TitleContainer = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: #000;
`;

const PrimaryText = styled.span`
  color: #01463a;
  font-weight: bold;
`;

export function EditProductPage() {
  const {
    state,
    getProduct,
    getProductTypes,
    getProductStatuses,
    clearProduct,
  } = useProduct();
  const { product, isFetchingProduct, isUpdatingProduct } = state;

  const location = useLocation();
  const parts = location.pathname.split('/');
  const productId = parts[parts.length - 1];

  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      getProduct(productId);
      getProductTypes();
      getProductStatuses();
      shouldRun.current = false;
    }

    return () => {
      clearProduct({});
    };
  }, []);

  return (
    <Loader color="#01463a" loading={isFetchingProduct || isUpdatingProduct}>
      <TitleContainer>
        <PrimaryText>Edit Product</PrimaryText>
      </TitleContainer>
      <Tabs>
        <Tab label="Details">
          <EditProductDetails productData={product} />
        </Tab>
        <Tab label="Variants">{JSON.stringify(product?.variants)}</Tab>
      </Tabs>
    </Loader>
  );
}
