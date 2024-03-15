/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADD_PROMOTION_DETAILS_PAYLOAD,
  AppButton,
  FormContainer,
  FormGroup,
  FormWrapper,
  MODAL_TYPES,
  PROMOTION_STATUS,
  StyledDateRangePicker,
  StyledInput,
  StyledReactSelect,
  hasEmptyValue,
  useAuth,
  useCommon,
  usePromotion,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { useEffect } from 'react';
import * as Yup from 'yup';

interface FormValues {
  name: string;
  description: string;
  status: string;
  start_date: Date | null;
  end_date: Date | null;
  image_url: string;
  [key: string]: any; // Index signature to allow dynamic access
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required'),
  image_url: Yup.string()
    .required('Image URL is required')
    .url('Enter a valid URL'),
});

export function AddPromotionForm() {
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const { state: promotionState, setAddPromotionDetailsPayload } =
    usePromotion();
  const { addPromotionDetailsPayload } = promotionState;

  const resetForm = () => {
    formik.resetForm();
    formik.setFieldTouched('start_date', false);
    formik.setFieldTouched('end_date', false);
    setAddPromotionDetailsPayload(ADD_PROMOTION_DETAILS_PAYLOAD);
  };

  const onSubmit = (values: any) => {
    values.start_date = moment(values.start_date).toISOString();
    values.end_date = moment(values.end_date).toISOString();
    values.platform = activePlatform;

    setAddPromotionDetailsPayload(values);
    setSideModalState({
      ...sideModalState,
      open: true,
      view: MODAL_TYPES.ADD_PROMOTION_CLAIMS,
    });
  };

  const formik = useFormik<FormValues>({
    initialValues: ADD_PROMOTION_DETAILS_PAYLOAD,
    validationSchema,
    onSubmit,
  });

  const promotionStatus = PROMOTION_STATUS?.sort(
    (a: { label: string }, b: { label: any }) => a.label.localeCompare(b.label),
  );

  const handleStartDateChange = (date: Date | null) => {
    formik.setFieldValue('start_date', date);
    formik.setFieldValue('end_date', date);
  };

  const handleEndDateChange = (date: Date | null) => {
    formik.setFieldValue('end_date', date);
  };

  const handleStartDateOnBlur = () => {
    if (isEmpty(formik.values.start_date)) {
      formik.setFieldTouched('start_date', true, false);
      formik.setFieldError('start_date', 'Start date is required');
    } else {
      formik.setFieldTouched('start_date', false, false);
      formik.setFieldError('start_date', '');
    }
  };

  useEffect(() => {
    formik.setValues(addPromotionDetailsPayload);
  }, [addPromotionDetailsPayload]);

  return (
    <FormWrapper
      formTitle="Create Promotion"
      subtTitle="Enter Promotion Details"
    >
      <FormContainer onSubmit={formik.handleSubmit}>
        <FormGroup>
          <StyledInput
            type="text"
            id="name"
            label="Promotion Name"
            name="name"
            placeholder="Promotion Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.name && formik.errors.name)}
            errorMessage={formik.errors.name}
          />
        </FormGroup>
        <FormGroup>
          <StyledInput
            type="text"
            id="description"
            label="Promotion Description"
            name="description"
            placeholder="Promotion Description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.description && formik.errors.description,
            )}
            errorMessage={formik.errors.description}
          />
        </FormGroup>
        <FormGroup>
          <StyledReactSelect
            label="Promotion Status"
            name="status"
            options={promotionStatus}
            isMulti={false}
            placeholder="Set status"
            value={formik.values.status}
            onChange={(selectedOption) => {
              formik.setFieldValue('status', selectedOption.value, true);
            }}
            onBlur={() => formik.setFieldTouched('status')}
            error={Boolean(formik.touched.status && formik.errors.status)}
            errorMessage={formik.errors.status}
          />
        </FormGroup>
        <FormGroup>
          <StyledDateRangePicker
            startDateInput={{
              onChange: handleStartDateChange,
              placeholder: 'Start Date',
              value: formik.values.start_date,
              name: 'start_date',
              onBlur: handleStartDateOnBlur,
              error: Boolean(
                formik.touched.start_date && formik.errors.start_date,
              ),
              errorMessage: formik.errors.start_date,
            }}
            endDateInput={{
              onChange: handleEndDateChange,
              placeholder: 'End Date',
              value: formik.values.end_date,
              name: 'end_date',
              onBlur: () => formik.setFieldTouched('end_date', true, false),
              error: Boolean(formik.touched.end_date && formik.errors.end_date),
              errorMessage: formik.errors.end_date,
            }}
            label="Set Promotion Period"
            onChange={() => {}}
          />
        </FormGroup>
        <FormGroup>
          <StyledInput
            type="text"
            id="image_url"
            label="Promotion Image"
            name="image_url"
            placeholder="Promotion Image"
            onChange={formik.handleChange}
            value={formik.values.image_url}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.image_url && formik.errors.image_url)}
            errorMessage={formik.errors.image_url}
            enableHoverImage={true}
          />
        </FormGroup>
        <FormGroup>
          <span />
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
              disabled={hasEmptyValue(formik.values) || !isEmpty(formik.errors)}
            >
              Next
            </AppButton>
          </FormGroup>
        </FormGroup>
      </FormContainer>
    </FormWrapper>
  );
}
