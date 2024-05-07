/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppButton,
  ClaimStatus,
  FormContainer,
  FormGroup,
  FormWrapper,
  StyledInput,
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
  claim_id: string;
  remarks: string;
}

interface FormValues {
  claims: Claims[];
  [key: string]: any; // Index signature to allow dynamic access
}

const validationSchema = Yup.object().shape({
  claims: Yup.array().of(
    Yup.object().shape({
      remarks: Yup.string().required('Receipt number is required'),
    }),
  ),
});

interface FormProps {
  selectedRows: Claims[];
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function BulkRejectClaims({
  selectedRows = [],
  onFormSubmit,
}: FormProps) {
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;

  const initialValues = {
    claims: selectedRows?.map((claim: any) => {
      return {
        claim_id: claim?._id,
        status: ClaimStatus.REJECTED,
        remarks: '',
      };
    }),
  };

  const handleChangeRemarks = (fieldIndex: number, value: any, obj: any) => {
    formik.setFieldValue(`claims[${fieldIndex}].remarks`, value);
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
    <FormWrapper formTitle="Reject Claims">
      <FormContainer onSubmit={formik.handleSubmit}>
        {selectedRows?.map((claim: any, index: number) => {
          return (
            <ItemsContainer key={index}>
              <h6 className="font-semibold pb-2">
                Claim - {claim.claim_number}
              </h6>
              <FormGroup>
                <StyledInput
                  type="text"
                  id="remarks"
                  label="Rejection Remarks"
                  name="remarks"
                  placeholder="Set rejection remarks"
                  onChange={(e) =>
                    handleChangeRemarks(index, e.target.value, claim)
                  }
                  value={formik.values.claims[index]?.remarks}
                  onBlur={(e) => {
                    handleArrayValueOnBlur(index, 'remarks', 'claims');
                  }}
                  error={Boolean(
                    formik.touched.claims &&
                      formik.touched.claims[index]?.remarks &&
                      formik.errors.claims &&
                      (formik.errors.claims as any)[index]?.remarks,
                  )}
                  errorMessage={
                    formik.errors.claims &&
                    (formik.errors.claims as any)[index]?.remarks
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
