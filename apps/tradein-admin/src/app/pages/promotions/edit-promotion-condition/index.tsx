/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ADD_PROMOTION_CONDITIONS_PAYLOAD,
  AppButton,
  FormContainer,
  FormGroup,
  FormGroupWithIcon,
  FormWrapper,
  MODAL_TYPES,
  PromotionConditionItemInterface,
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
  title: string;
  items: PromotionConditionItemInterface[];
  [key: string]: any; // Index signature to allow dynamic access
}

const conditionItemSchema = Yup.object().shape({
  description: Yup.string().required('Condition Item is required'),
});

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Section Title is required'),
  items: Yup.array()
    .of(conditionItemSchema)
    .required('Conditions items are required'),
});

export function EditPromotionConditionsForm({ data }: any) {
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;
  const { setAddPromotionConditionPayload } = usePromotion();

  const resetForm = () => {
    formik.resetForm();
  };

  const onSubmit = (values: any) => {
    setAddPromotionConditionPayload(values);
    setSideModalState({
      ...sideModalState,
      view: MODAL_TYPES.EDIT_PROMOTION_ELIGIBILITY_AND_FAQS,
    });
  };

  const formik = useFormik<FormValues>({
    initialValues: ADD_PROMOTION_CONDITIONS_PAYLOAD,
    validationSchema,
    onSubmit,
  });

  const addItem = () => {
    const updatedItems = [...formik.values.items];

    // Calculate the order value based on the existing item
    const order =
      updatedItems.length > 0
        ? updatedItems[updatedItems.length - 1].order + 1
        : 1;

    // Create the new item with the calculated order value
    const item = {
      order,
      description: '',
    };

    updatedItems.push(item);

    formik.setValues({ ...formik.values, items: updatedItems });
  };

  const removeItem = (index: number) => {
    if (formik.values?.items?.length > 1) {
      const updatedItems = [...formik.values.items];
      updatedItems.splice(index, 1);

      // After deletion, update the order values of the remaining items
      updatedItems.forEach((item, idx) => {
        item.order = idx + 1;
      });

      formik.setValues({ ...formik.values, items: updatedItems });
    }
  };

  useEffect(() => {
    const promotionConditions =
      data?.conditions || ADD_PROMOTION_CONDITIONS_PAYLOAD;
    formik.setValues(promotionConditions);
  }, [data]);

  return (
    <FormWrapper
      formTitle="Conditions"
      subtTitle="This section outlines the conditions that users need to follow to take part in the promotion."
    >
      <FormContainer onSubmit={formik.handleSubmit}>
        <FormGroup>
          <StyledInput
            type="text"
            id="title"
            label="Section Title"
            name="title"
            placeholder="Section Title"
            onChange={formik.handleChange}
            value={formik.values?.title}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.title && formik.errors.title)}
            errorMessage={formik.errors.title}
          />
        </FormGroup>
        <FormGroup>
          <span />
          <AppButton
            type="button"
            width="fit-content"
            onClick={() => addItem()}
            disabled={hasEmptyValueInArray(formik.values?.items)}
          >
            Add Condition
          </AppButton>
        </FormGroup>
        {formik.values?.items?.map(
          (item: PromotionConditionItemInterface, index: number) => {
            return (
              <ItemsContainer key={index}>
                <FormGroupWithIcon>
                  <StyledInput
                    type="text"
                    id={`items[${index}].description`}
                    label="Condition Item"
                    name={`items[${index}].description`}
                    placeholder="Condition Item"
                    onChange={formik.handleChange}
                    value={item.description}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.touched.items &&
                        formik.touched.items[index]?.description &&
                        formik.errors.items &&
                        (formik.errors.items as any)[index]?.description,
                    )}
                    errorMessage={
                      formik.errors.items &&
                      (formik.errors.items as any)[index]?.description
                    }
                  />
                  <StyledIcon
                    icon={faTrash}
                    color="#ccc"
                    hovercolor="#f44336"
                    disabled={formik.values?.items?.length <= 1}
                    onClick={() => removeItem(index)}
                  />
                </FormGroupWithIcon>
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
                  view: MODAL_TYPES.EDIT_PROMOTION_STEPS,
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
