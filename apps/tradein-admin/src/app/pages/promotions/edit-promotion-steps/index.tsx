/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ADD_PROMOTION_STEPS_ITEM,
  ADD_PROMOTION_STEPS_PAYLOAD,
  AppButton,
  FormContainer,
  FormGroup,
  FormGroupWithIcon,
  FormWrapper,
  MODAL_TYPES,
  PromotionStepsInterface,
  StyledInput,
  hasEmptyValue,
  hasEmptyValueInArray,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

const StyledIcon = styled(FontAwesomeIcon)<{
  color?: string;
  hovercolor?: string;
  disabled?: boolean;
}>`
  color: ${(props) => (props.color ? props.color : 'inherit')};
  margin: 0 12px;

  &:hover {
    color: ${(props) => (props.hovercolor ? props.hovercolor : 'inherit')};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

const ItemsContainer = styled.div`
  box-shadow: 0px 1px 0px 0px #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

interface FormValues {
  steps: PromotionStepsInterface[];
  [key: string]: any; // Index signature to allow dynamic access
}

const stepSchema = Yup.object().shape({
  title: Yup.string().required('Step Title is required'),
  description: Yup.string().required('Step Description is required'),
});

const validationSchema = Yup.object().shape({
  steps: Yup.array().of(stepSchema).required('Steps are required'),
});

export function EditPromotionStepsForm({ data }: any) {
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;
  const { setAddPromotionStepsPayload } = usePromotion();

  const resetForm = () => {
    formik.resetForm();
  };

  const onSubmit = (values: any) => {
    setAddPromotionStepsPayload(values);
    setSideModalState({
      ...sideModalState,
      view: MODAL_TYPES.EDIT_PROMOTION_CONDITION,
    });
  };

  const formik = useFormik<FormValues>({
    initialValues: ADD_PROMOTION_STEPS_PAYLOAD,
    validationSchema,
    onSubmit,
  });

  const addStep = () => {
    const updatedSteps = [...formik.values.steps];

    // Calculate the order value based on the existing steps
    const order =
      updatedSteps.length > 0
        ? updatedSteps[updatedSteps.length - 1].order + 1
        : 1;

    // Create the new step item with the calculated order value
    const stepItem = {
      order,
      title: '',
      description: '',
    };

    updatedSteps.push(stepItem);

    formik.setValues({ ...formik.values, steps: updatedSteps });
  };

  const removeStep = (index: number) => {
    if (formik.values?.steps?.length > 1) {
      const updatedSteps = [...formik.values.steps];
      updatedSteps.splice(index, 1);

      // After deletion, update the order values of the remaining steps
      updatedSteps.forEach((step, idx) => {
        step.order = idx + 1;
      });

      formik.setValues({ ...formik.values, steps: updatedSteps });
    }
  };

  useEffect(() => {
    const promotionSteps = data?.steps || [ADD_PROMOTION_STEPS_ITEM];
    formik.setValues({ steps: promotionSteps });
  }, [data]);

  return (
    <FormWrapper
      formTitle="Steps"
      subtTitle="This section outlines the sequential steps users need to follow to participate in the promotion."
    >
      <FormContainer onSubmit={formik.handleSubmit}>
        <FormGroup>
          <span />
          <AppButton
            type="button"
            width="fit-content"
            onClick={() => addStep()}
            disabled={hasEmptyValueInArray(formik.values?.steps)}
          >
            Add Step
          </AppButton>
        </FormGroup>
        {formik.values?.steps?.map(
          (step: PromotionStepsInterface, index: number) => {
            return (
              <ItemsContainer key={index}>
                <FormGroupWithIcon>
                  <StyledInput
                    type="text"
                    id={`steps[${index}].title`}
                    label="Step Title"
                    name={`steps[${index}].title`}
                    placeholder="Step Title"
                    onChange={formik.handleChange}
                    value={step.title}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.touched.steps &&
                        formik.touched.steps[index]?.title &&
                        formik.errors.steps &&
                        (formik.errors.steps as any)[index]?.title,
                    )}
                    errorMessage={
                      formik.errors.steps &&
                      (formik.errors.steps as any)[index]?.title
                    }
                  />
                  <StyledIcon
                    icon={faTrash}
                    color="#ccc"
                    hovercolor="#f44336"
                    disabled={formik.values?.steps?.length <= 1}
                    onClick={() => removeStep(index)}
                  />
                </FormGroupWithIcon>
                <FormGroup>
                  <StyledInput
                    type="text"
                    id={`steps[${index}].description`}
                    label="Step Description"
                    name={`steps[${index}].description`}
                    placeholder="Step Description"
                    onChange={formik.handleChange}
                    value={step.description}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.touched.steps &&
                        formik.touched.steps[index]?.description &&
                        formik.errors.steps &&
                        (formik.errors.steps as any)[index]?.description,
                    )}
                    errorMessage={
                      formik.errors.steps &&
                      (formik.errors.steps as any)[index]?.description
                    }
                  />
                </FormGroup>
              </ItemsContainer>
            );
          },
        )}
        <FormGroup>
          <FormGroup>
            <AppButton
              type="button"
              variant="outlined"
              width="fit-content"
              onClick={() => {
                setSideModalState({
                  ...sideModalState,
                  open: true,
                  view: MODAL_TYPES.EDIT_PROMOTION_CLAIMS,
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
