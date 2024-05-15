/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppButton,
  FormContainer,
  FormGroup,
  FormWrapper,
  OVERRIDE_CLAIM_STATUSES,
  StyledInput,
  StyledReactSelect,
  hasEmptyValue,
  useAuth,
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
  id: string;
  status: string;
  remarks: string;
}

interface FormValues {
  claims: Claims[];
  [key: string]: any; // Index signature to allow dynamic access
}

const validationSchema = Yup.object().shape({
  claims: Yup.array().of(
    Yup.object().shape({
      status: Yup.string().required('Status is required'),
      remarks: Yup.string().required('Remarks is required'),
    }),
  ),
});

interface FormProps {
  selectedRows: Claims[];
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function BulkOverrideClaimStatus({
  selectedRows = [],
  onFormSubmit,
}: FormProps) {
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;
  const { state: authState } = useAuth();
  const { userDetails } = authState;

  const initialValues = {
    claims: selectedRows?.map((claim: any) => {
      return {
        id: claim?._id,
        status: '',
        remarks: '',
        user_id: userDetails?._id,
      };
    }),
  };

  const handleArrayValueChange = (
    fieldIndex: number,
    field: string,
    value: any,
  ) => {
    formik.setFieldValue(`claims[${fieldIndex}].${field}`, value);
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
    <FormWrapper formTitle="Override Claim Status">
      <FormContainer onSubmit={formik.handleSubmit}>
        {selectedRows?.map((claim: any, index: number) => {
          const overrideClaimStatuses = OVERRIDE_CLAIM_STATUSES?.filter(
            (item) => item?.value !== claim?.moorup_status,
          );

          return (
            <ItemsContainer key={index}>
              <h6 className="font-semibold pb-2">
                Claim - {claim.claim_number}
              </h6>
              <FormGroup>
                <StyledReactSelect
                  isMulti={false}
                  label={'Status'}
                  options={overrideClaimStatuses}
                  name={`claims[${index}].status`}
                  placeholder="Status"
                  onChange={(selected) =>
                    handleArrayValueChange(index, 'status', selected.value)
                  }
                  value={formik.values.claims[index]?.status}
                  onBlur={(e) => {
                    handleArrayValueOnBlur(index, 'status', 'claims');
                  }}
                  error={Boolean(
                    formik.touched.claims &&
                      formik.touched.claims[index]?.status &&
                      formik.errors.claims &&
                      (formik.errors.claims as any)[index]?.status,
                  )}
                  errorMessage={
                    formik.errors.claims &&
                    (formik.errors.claims as any)[index]?.status
                  }
                />
              </FormGroup>
              <FormGroup>
                <StyledInput
                  type="text"
                  id="remarks"
                  label="Update Remarks"
                  name="remarks"
                  placeholder="Set update remarks"
                  onChange={(e) =>
                    handleArrayValueChange(index, 'remarks', e.target.value)
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
