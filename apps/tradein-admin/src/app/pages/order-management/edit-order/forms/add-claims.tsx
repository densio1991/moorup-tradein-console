/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  ADD_CLAIM_RECEIPT_PAYLOAD,
  ADD_ORDER_PROMOTION_CLAIM_PAYLOAD,
  AppButton,
  FormContainer,
  FormGroup,
  FormGroupWithIcon,
  FormWrapper,
  MODAL_TYPES,
  Promotion,
  PromotionStatus,
  StyledIcon,
  StyledInput,
  StyledReactSelect,
  hasEmptyValue,
  hasEmptyValueInArray,
  parsePromotionStatus,
  useAuth,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { FormEvent, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

const ItemsContainer = styled.div`
  box-shadow: 0px 1px 0px 0px #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

interface ClaimReceipt {
  receipt_number: string;
  promotion_id: string;
}

interface FormValues {
  claims: ClaimReceipt[];
  // order_number: string; // autofill
  [key: string]: any; // Index signature to allow dynamic access
}

const validationSchema = Yup.object().shape({
  claims: Yup.array().of(
    Yup.object().shape({
      receipt_number: Yup.string().required('Receipt number is required'),
      promotion_id: Yup.string().required('Promotion is required'),
    }),
  ),
  // order_number: Yup.string().required('Order ID is required'),
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
      return promotions
        .filter((promotion: Promotion) => {
          const promotionStatus = parsePromotionStatus(promotion);
          return promotionStatus === PromotionStatus.ONGOING;
        })
        .map((promotion: Promotion) => {
          return {
            value: promotion._id,
            label: promotion.name,
          };
        })
        .sort((a: { label: string }, b: { label: any }) =>
          a.label.localeCompare(b.label),
        );
    }

    return [];
  }, [promotions]);

  const handleArrayValueChange = (
    fieldIndex: number,
    field: string,
    value: any,
    arrayField: string,
  ) => {
    formik.setFieldValue(`${arrayField}[${fieldIndex}].${field}`, value);
  };

  const handleArrayValueOnBlur = (
    fieldIndex: number,
    field: string,
    arrayField: string,
  ) => {
    formik.setFieldTouched(`${arrayField}[${fieldIndex}].${field}`, true);
  };

  const addReceiptToClaims = () => {
    const updatedClaims = [...formik.values.claims, ADD_CLAIM_RECEIPT_PAYLOAD];

    formik.setValues({ ...formik.values, claims: updatedClaims });
  };

  const removeFromClaims = (claimIndex: number) => {
    if (formik.values.claims?.length > 1) {
      const updatedClaims = [...formik.values.claims];
      updatedClaims.splice(claimIndex, 1);

      formik.setValues({ ...formik.values, claims: updatedClaims });
    }
  };

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
      setSideModalState({
        ...sideModalState,
        open: false,
        view: null,
      });
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

  return (
    <FormWrapper formTitle="Add Order Claim">
      <FormContainer onSubmit={formik.handleSubmit}>
        <FormGroup>
          <span />
          <AppButton
            type="button"
            width="fit-content"
            onClick={() => addReceiptToClaims()}
            disabled={hasEmptyValueInArray(formik.values.claims)}
          >
            Add Order Claim
          </AppButton>
        </FormGroup>
        {formik.values.claims.map((claim: ClaimReceipt, index: number) => {
          return (
            <ItemsContainer key={index}>
              <FormGroupWithIcon>
                <StyledInput
                  type="text"
                  id={`claims[${index}].receipt_number`}
                  label="Receipt Number"
                  name={`claims[${index}].receipt_number`}
                  placeholder="Receipt number"
                  onChange={formik.handleChange}
                  value={claim.receipt_number}
                  onBlur={(e) => {
                    handleArrayValueOnBlur(index, 'receipt_number', 'claims');
                  }}
                  error={Boolean(
                    formik.touched.claims &&
                      formik.touched.claims[index]?.receipt_number &&
                      formik.errors.claims &&
                      (formik.errors.claims as any)[index]?.receipt_number,
                  )}
                  errorMessage={
                    formik.errors.claims &&
                    (formik.errors.claims as any)[index]?.receipt_number
                  }
                />
                <StyledIcon
                  icon={faTrash}
                  color="#ccc"
                  hovercolor="#f44336"
                  disabled={formik.values.claims?.length <= 1}
                  onClick={() => removeFromClaims(index)}
                />
              </FormGroupWithIcon>
              <FormGroup>
                <StyledReactSelect
                  isMulti={false}
                  label="Promotion"
                  isLoading={isFetchingPromotions}
                  options={promotionOptions}
                  name={`claims[${index}].promotion_id`}
                  placeholder="Receipt number"
                  onChange={(selected) =>
                    handleArrayValueChange(
                      index,
                      'promotion_id',
                      selected.value,
                      'claims',
                    )
                  }
                  value={claim.promotion_id}
                  onBlur={(e) => {
                    handleArrayValueOnBlur(index, 'promotion_id', 'claims');
                  }}
                  error={Boolean(
                    formik.touched.claims &&
                      formik.touched.claims[index]?.promotion_id &&
                      formik.errors.claims &&
                      (formik.errors.claims as any)[index]?.promotion_id,
                  )}
                  errorMessage={
                    formik.errors.claims &&
                    (formik.errors.claims as any)[index]?.promotion_id
                  }
                />
              </FormGroup>
            </ItemsContainer>
          );
        })}
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
                  open: false,
                  view: MODAL_TYPES.ADD_ORDER_PROMOTION_CLAIM,
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
              Submit
            </AppButton>
          </FormGroup>
        </FormGroup>
      </FormContainer>
    </FormWrapper>
  );
}
