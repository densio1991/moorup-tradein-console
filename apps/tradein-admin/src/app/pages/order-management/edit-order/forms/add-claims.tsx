/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADD_ORDER_PROMOTION_CLAIM_PAYLOAD,
  AppButton,
  CLAIM_STATUSES,
  FormContainer,
  FormGroup,
  // FormGroupWithIcon,
  FormWrapper,
  MODAL_TYPES,
  Promotion,
  // PromotionProductInterface,
  StyledInput,
  StyledReactSelect,
  hasEmptyValue,
  useAuth,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { FormEvent, useEffect, useMemo } from 'react';
import * as Yup from 'yup';

interface FormValues {
  status: string;
  promotion_id: string;
  receipt_number: string;
  // platform_domain: string;
  // email: string; // autofill
  // platform: string; // autofill
  // order_id: string; // autofill
  [key: string]: any; // Index signature to allow dynamic access
}

const validationSchema = Yup.object().shape({
  status: Yup.string().required('Status is required'),
  promotion_id: Yup.string().required('Promotion ID is required'),
  receipt_number: Yup.string().required('Receipt number is required'),
  // platform_domain: Yup.string().required('Platform domain is required'),
  // email: Yup.string().required('Email is required'),
  // platform: Yup.string().required('Platform is required'),
  // order_id: Yup.string().required('Order ID is required'),
});

export function AddOrderPromotionClaimForm({
  onFormSubmit,
}: {
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const {
    state: promotionState,
    getPromotions,
    clearPromotions,
    setAddOrderPromotionClaimPayload,
  } = usePromotion();
  const {
    promotions = [],
    isFetchingPromotions,
    addOrderPromotionClaimPayload,
  } = promotionState;

  const promotionOptions = useMemo(() => {
    if (!isEmpty(promotions)) {
      return promotions.map((promotion: Promotion) => {
        return {
          value: promotion._id,
          label: promotion.name,
        };
      });
    }

    return [];
  }, [promotions]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getPromotions({}, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearPromotions({});
    };
  }, [activePlatform]);

  const resetForm = () => {
    formik.resetForm();
  };

  const onSubmit = (values: any) => {
    setAddOrderPromotionClaimPayload(values);
    if (onFormSubmit) {
      onFormSubmit(values);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: ADD_ORDER_PROMOTION_CLAIM_PAYLOAD,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    formik.setValues(addOrderPromotionClaimPayload);
  }, [addOrderPromotionClaimPayload]);

  console.log(hasEmptyValue(formik.values), formik.values);

  return (
    <FormWrapper formTitle="Add Order Claim">
      <FormContainer onSubmit={formik.handleSubmit}>
        <FormGroup>
          <StyledInput
            type="text"
            id="receipt_number"
            label="Receipt Number"
            name="receipt_number"
            placeholder="Receipt number"
            onChange={formik.handleChange}
            value={formik.values.receipt_number}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.receipt_number && formik.errors.receipt_number,
            )}
            errorMessage={formik.errors.receipt_number}
          />
        </FormGroup>
        <FormGroup>
          <StyledReactSelect
            label="Claim Status"
            name="status"
            isMulti={false}
            options={CLAIM_STATUSES}
            placeholder="Select Claim Status"
            value={formik.values.status}
            onChange={(selected) => {
              formik.setFieldValue('status', selected.value, true);
            }}
            onBlur={() => formik.setFieldTouched('status')}
            error={Boolean(
              formik.touched.status && isEmpty(formik.values.status),
            )}
            errorMessage="Claim status is required."
          />
        </FormGroup>
        <FormGroup>
          <StyledReactSelect
            label="Promotion"
            name="promotion_id"
            isMulti={false}
            isLoading={isFetchingPromotions}
            options={promotionOptions}
            placeholder="Select promotion"
            value={formik.values.promotion_id}
            onChange={(selected) => {
              formik.setFieldValue('promotion_id', selected.value, true);
            }}
            onBlur={() => formik.setFieldTouched('promotion_id')}
            error={Boolean(
              formik.touched.promotion_id &&
                isEmpty(formik.values.promotion_id),
            )}
            errorMessage="Promotion is required."
          />
        </FormGroup>
        {/* <FormGroup>
          <StyledReactSelect
            label="Platform Domain"
            name="platform_domain"
            isMulti={false}
            options={[]}
            placeholder="Select platform domain"
            value={formik.values.platform_domain}
            onChange={(selected) => {
              formik.setFieldValue('platform_domain', selected.value, true);
            }}
            onBlur={() => formik.setFieldTouched('platform_domain')}
            error={Boolean(
              formik.touched.platform_domain &&
                isEmpty(formik.values.platform_domain),
            )}
            errorMessage="Platform domain is required."
          />
        </FormGroup> */}
        <FormGroup>
          <FormGroup>
            <AppButton
              type="button"
              variant="outlined"
              width="fit-content"
              onClick={() => {
                setAddOrderPromotionClaimPayload(formik.values);
                setSideModalState({
                  ...sideModalState,
                  open: true,
                  view: MODAL_TYPES.ADD_PROMOTION,
                });
              }}
            >
              Back
            </AppButton>
          </FormGroup>
          <FormGroup>
            <AppButton
              type="button"
              variant="outlined"
              width="fit-content"
              onClick={() => resetForm()}
            >
              Reset
            </AppButton>
            <AppButton
              type="submit"
              width="fit-content"
              disabled={hasEmptyValue(formik.values)}
            >
              Next
            </AppButton>
          </FormGroup>
        </FormGroup>
      </FormContainer>
    </FormWrapper>
  );
}
