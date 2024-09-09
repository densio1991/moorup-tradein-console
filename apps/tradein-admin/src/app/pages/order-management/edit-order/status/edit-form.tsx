/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useEffect } from 'react';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import {
  DropdownOrderItemStatus,
  FormGroup,
  OrderItems,
  StyledInput,
  StyledReactSelect,
  isNullOrEmpty,
  useProduct,
  useAuth,
  amountFormatter,
} from '@tradein-admin/libs';
import { CardDetail } from '../sections';

// Styled Components
const ModalBody = styled.div`
  padding: 16px;
  height: 100%;
`;

const ModalTitle = styled.h2`
  font-style: bold;
  margin-bottom: 16px;
`;

const ModalButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  padding: 4px 8px;
  font-weight: bold;
  border: 1px solid #01463a;
  border-radius: 4px;
  background: #f5f5f4;
  width: 49%;
`;

const ModalSubmitButton = styled.button`
  padding: 4px 8px;
  font-weight: bold;
  border-radius: 4px;
  color: #fff;
  background: #01463a;
  width: 49%;
`;

const DEFAULT_VALUES = {
  _id: '',
  status: '',
  revised_offer: '0',
  reason: '',
  revision_details: '',
  brand: '',
  model: '',
  variant: '',
  deviceSku: '',
  newDevicePrice: '',
};

const REVISION_OPTIONS = [
  { label: 'Change Model', value: 'change-model' },
  { label: 'Others', value: 'others' },
];

interface FormValues {
  _id: string;
  status: string;
  revised_offer: string;
  reason: string;
  revision_details: string;
  brand: string;
  model: string;
  variant: string;
  deviceSku: string;
  newDevicePrice: string;
}

type FormProps = {
  setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateStatus: (newValue: any, orderItem: OrderItems) => void;
  orderItem: OrderItems;
};

export const EditForm = ({
  setStatusModal,
  updateStatus,
  orderItem,
}: FormProps) => {
  const {
    state: productState,
    getCategoriesByType,
    getModelsByCategory,
  } = useProduct();
  const {
    isFetchingCategoriesByType,
    categoriesByType,
    isFetchingModelByCategory,
    modelByCategory,
  } = productState;

  const { state: authState } = useAuth();
  const { activePlatform } = authState;

  const statusDropdown = Object.values(DropdownOrderItemStatus).map((item) => ({
    label: item.replace('-', ' ').toUpperCase(),
    value: item,
  }));

  const formik = useFormik<FormValues>({
    initialValues: {
      ...DEFAULT_VALUES,
      _id: orderItem?._id,
      status: orderItem?.status,
    },
    onSubmit: () => {
      const {
        status,
        revised_offer,
        reason,
        revision_details,
        brand,
        model,
        variant,
      } = formik.values;
      const errors: Partial<FormValues> = {};
      if (status === DropdownOrderItemStatus.FOR_REVISION) {
        if (revision_details === 'change-model') {
          if (isEmpty(brand)) {
            errors['brand'] = 'Required field';
          }
          if (isEmpty(model)) {
            errors['model'] = 'Required field';
          }
          if (isEmpty(variant)) {
            errors['variant'] = 'Required field';
          }
          formik.setErrors(errors);
        } else {
          if (isNullOrEmpty(revised_offer)) {
            errors['revised_offer'] = 'Required field';
          }
          if (isEmpty(reason)) {
            errors['reason'] = 'Required field';
          }
          formik.setErrors(errors);
        }
      }
      if (isEmpty(errors)) {
        updateStatus(formik.values, orderItem);
        setStatusModal(false);
      }
    },
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getCategoriesByType(orderItem?.product_type, signal);
    }

    return () => {
      controller.abort();
    };
  }, [activePlatform]);

  const brands =
    useMemo(
      () =>
        categoriesByType.categories?.map((item: any) => {
          item.value = item.site_url;
          item.label = item.name;
          return item;
        }),
      [categoriesByType],
    ) || [];

  const models =
    useMemo(
      () =>
        modelByCategory.products?.map((item: any) => {
          item.value = item._id;
          item.label = item.display_name;
          return item;
        }),
      [modelByCategory],
    ) || [];

  const variants = useMemo(() => {
    const model = formik.values?.model;
    if (model) {
      const selectedModel = modelByCategory?.products?.find(
        (item: any) => item._id === model,
      );
      if (selectedModel) {
        return selectedModel.variants
          .filter((variant: any) => variant.status === 'active') // Ensure only active variants are included
          .map((variant: any) => {
            variant.value = variant._id;
            variant.label = variant.name;
            return variant;
          });
      }
    }

    return [];
  }, [modelByCategory, formik.values.model]);

  const newVariant = useMemo(() => {
    const variant = formik.values?.variant;
    if (variant) {
      const selectedVariant = variants?.find(
        (item: any) => item._id === variant,
      );
      return selectedVariant;
    }
    return {};
  }, [variants, formik.values.variant]);

  function getNewPricing(
    orderItem: any,
    newVariant: any,
    platform: string,
  ): number | 0 {
    // Check the conditions for the order item
    const assessmentAnswers = orderItem.questions_answered;
    const functionalAssessment = assessmentAnswers.find(
      (qa: any) => qa.question === 'functional-assessment',
    );
    const screenAssessment = assessmentAnswers.find(
      (qa: any) => qa.question === 'screen-assessment',
    );
    const platformPricing = newVariant?.pricing?.find(
      (p: any) => p.platform === platform,
    );
    if (
      functionalAssessment?.answer === 'yes' &&
      screenAssessment?.answer === 'no'
    ) {
      if (platformPricing) {
        //fully functional
        return platformPricing.working; // Return the 'working' value
      }
    } else if (
      functionalAssessment?.answer === 'yes' &&
      screenAssessment?.answer === 'yes'
    ) {
      // damaged screen
      if (platformPricing) {
        return platformPricing.working_damaged; // Return the 'working_damage' value
      }
    } else if (
      functionalAssessment?.answer === 'no' &&
      screenAssessment?.answer === 'no'
    ) {
      // not functional
      if (platformPricing) {
        return platformPricing.not_working;
      }
    } else {
      // not functional damage
      if (platformPricing) {
        return platformPricing.not_working_damaged;
      }
    }
    return 0; // Return 0 if conditions are not met or pricing is not found
  }
  return (
    <ModalBody>
      <ModalTitle>Update Order Item</ModalTitle>
      <FormGroup>
        <StyledReactSelect
          label="Status"
          isMulti={false}
          options={statusDropdown}
          name="status"
          placeholder="Select status"
          value={formik.values.status}
          onChange={(selected) =>
            formik.setFieldValue('status', selected.value, true)
          }
        />
      </FormGroup>
      {formik.values.status === DropdownOrderItemStatus.FOR_REVISION && (
        <>
          <FormGroup>
            <StyledReactSelect
              label="Revision Reason"
              isMulti={false}
              options={REVISION_OPTIONS}
              name="revision_details"
              placeholder="Select reason"
              value={formik.values.revision_details}
              onChange={(selected) =>
                formik.setFieldValue('revision_details', selected.value, true)
              }
            />
          </FormGroup>
          {formik.values.revision_details === 'others' && (
            <>
              <FormGroup>
                <StyledInput
                  type="number"
                  id="revised_offer"
                  label="Revision"
                  name="revised_offer"
                  placeholder="Revision Offer"
                  onChange={formik.handleChange}
                  value={formik.values.revised_offer}
                  error={!!formik.errors.revised_offer}
                  errorMessage={formik.errors.revised_offer}
                />
              </FormGroup>
              <FormGroup>
                <StyledInput
                  type="text"
                  id="reason"
                  label="Reasons"
                  name="reason"
                  placeholder="Comma-separated reasons"
                  onChange={formik.handleChange}
                  value={formik.values.reason}
                  error={!!formik.errors.reason}
                  errorMessage={formik.errors.reason}
                />
              </FormGroup>
            </>
          )}
          {formik.values.revision_details === 'change-model' && (
            <>
              <FormGroup>
                <StyledReactSelect
                  label="Brand"
                  name="brand"
                  isMulti={false}
                  options={brands}
                  placeholder="Select brand"
                  value={formik.values.brand}
                  onChange={(selected) => {
                    formik.setFieldValue('brand', selected.value, true);
                    const controller = new AbortController();
                    const signal = controller.signal;
                    getModelsByCategory(selected.value, signal);
                  }}
                  disabled={isFetchingCategoriesByType}
                />
              </FormGroup>

              <FormGroup>
                <StyledReactSelect
                  label="Model"
                  name="model"
                  isMulti={false}
                  options={models}
                  placeholder="Select Model"
                  value={formik.values.model}
                  onChange={(selected) => {
                    formik.setFieldValue('model', selected.value, true);
                  }}
                  disabled={
                    isEmpty(formik.values.brand) || isFetchingModelByCategory
                  }
                />
              </FormGroup>

              <FormGroup>
                <StyledReactSelect
                  label="Variants"
                  name="variant"
                  isMulti={false}
                  options={variants}
                  placeholder="Select variant"
                  value={formik.values.variant}
                  onChange={(selected) => {
                    formik.setFieldValue('variant', selected.value, true);
                    formik.setFieldValue('deviceSku', selected?.sku);
                    const newPrice = getNewPricing(
                      orderItem,
                      selected,
                      activePlatform,
                    );
                    formik.setFieldValue('newDevicePrice', newPrice);
                  }}
                  disabled={
                    isEmpty(formik.values.model) || isFetchingModelByCategory
                  }
                  error={!!formik.errors?.variant}
                  errorMessage={formik.errors?.variant}
                />
              </FormGroup>
              {formik?.values?.variant && (
                <>
                  <hr />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 my-2">
                    <CardDetail
                      label="Original Quote"
                      value={`$ ${amountFormatter(orderItem?.original_offer)}`}
                    />
                    <CardDetail
                      label="New Quote"
                      value={`$ ${amountFormatter(
                        getNewPricing(orderItem, newVariant, activePlatform),
                      )}`}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
      <ModalButtonDiv>
        <ModalButton onClick={() => setStatusModal(false)}>Cancel</ModalButton>
        <ModalSubmitButton type="submit" onClick={() => formik.handleSubmit()}>
          Submit
        </ModalSubmitButton>
      </ModalButtonDiv>
    </ModalBody>
  );
};
