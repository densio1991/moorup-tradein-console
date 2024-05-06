/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppButton,
  FormContainer,
  FormGroup,
  FormWrapper,
  StyledReactSelect,
  hasEmptyValue,
  useCommon,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { FormEvent } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

const ItemsContainer = styled.div`
  box-shadow: 0px 1px 0px 0px #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

interface Claims {
  product_name: string;
  currency: string;
  amount: number;
}

interface FormValues {
  claims: Claims[];
  [key: string]: any; // Index signature to allow dynamic access
}

const validationSchema = Yup.object().shape({
  claims: Yup.array().of(
    Yup.object().shape({
      product_name: Yup.string().required('Receipt number is required'),
      currency: Yup.string(),
      amount: Yup.number(),
    }),
  ),
});

interface FormProps {
  selectedRows: Claims[];
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function BulkApproveClaims({
  selectedRows = [],
  onFormSubmit,
}: FormProps) {
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;

  const initialValues = {
    claims: selectedRows?.map(() => {
      return {
        product_name: '',
        currency: '',
        amount: 0,
      };
    }),
  };

  const handleArrayValueChange = (
    fieldIndex: number,
    value: any,
    arrayField: string,
  ) => {
    console.log(value);
    formik.setFieldValue(`${arrayField}[${fieldIndex}]`, value.data);
  };

  const handleArrayValueOnBlur = (
    fieldIndex: number,
    field: string,
    arrayField: string,
  ) => {
    formik.setFieldTouched(`${arrayField}[${fieldIndex}].${field}`, true);
  };

  const resetForm = () => {
    formik.resetForm();
  };

  const onSubmit = (values: any) => {
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
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <FormWrapper formTitle="Bulk Approve Claim">
      <FormContainer onSubmit={formik.handleSubmit}>
        {selectedRows?.map((claim: any, index: number) => {
          console.log({ claim });
          return (
            <ItemsContainer key={index}>
              <h6 className="font-semibold pb-2">
                Claim - {claim.claim_number}
              </h6>
              <FormGroup>
                <StyledReactSelect
                  isMulti={false}
                  label={'Product Purchased'}
                  options={claim.products}
                  name={`claims[${index}].product_name`}
                  placeholder="Product Name"
                  onChange={(selected) =>
                    handleArrayValueChange(index, selected, 'claims')
                  }
                  value={formik.values.claims[index]?.product_name}
                  onBlur={(e) => {
                    handleArrayValueOnBlur(index, 'product_name', 'claims');
                  }}
                  error={Boolean(
                    formik.touched.claims &&
                      formik.touched.claims[index]?.product_name &&
                      formik.errors.claims &&
                      (formik.errors.claims as any)[index]?.product_name,
                  )}
                  errorMessage={
                    formik.errors.claims &&
                    (formik.errors.claims as any)[index]?.product_name
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
                setSideModalState({
                  ...sideModalState,
                  open: false,
                  view: null,
                });
              }}
            >
              Cancel
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
