/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ADD_PROMOTION_DETAILS_PAYLOAD,
  AppButton,
  FormContainer,
  FormGroup,
  FormWrapper,
  ImageEditor,
  MODAL_TYPES,
  PROMOTION_STATUS,
  StyledDateRangePicker,
  StyledInput,
  StyledReactSelect,
  ToggleButton,
  createFileFromImageURL,
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
  show_banner: boolean;
  banner_url?: string;
  [key: string]: any; // Index signature to allow dynamic access
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required'),
  show_banner: Yup.boolean().required('Show Banner is required'),
});

export function EditPromotionForm({ data }: any) {
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const {
    state: promotionState,
    setAddPromotionDetailsPayload,
    setPromotionCardImage,
    setPromotionBannerImage,
  } = usePromotion();
  const { promotionCardImage, promotionBannerImage } = promotionState;

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
      view: MODAL_TYPES.EDIT_PROMOTION_CLAIMS,
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
    if (isEmpty(formik.values?.start_date)) {
      formik.setFieldTouched('start_date', true, false);
      formik.setFieldError('start_date', 'Start date is required');
    } else {
      formik.setFieldTouched('start_date', false, false);
      formik.setFieldError('start_date', '');
    }
  };

  const handleCropCardImageComplete = (image: string, fileName: string) => {
    createFileFromImageURL(image, fileName).then((file) => {
      setPromotionCardImage(file);
    });
  };

  const handleCropBannerImageComplete = (image: string, fileName: string) => {
    createFileFromImageURL(image, fileName).then((file) => {
      setPromotionBannerImage(file);
    });
  };

  console.log('formik.values: ', formik.values);

  useEffect(() => {
    const promotionDetails = {
      name: data?.name,
      description: data?.description,
      status: data?.status,
      start_date: moment(data?.start_date).toDate(),
      end_date: moment(data?.end_date).toDate(),
      image_url: data?.image_url,
      show_banner: data?.show_banner,
      banner_url: data?.banner_url,
    };

    formik.setValues(promotionDetails);
  }, [data]);

  return (
    <FormWrapper formTitle="Edit Promotion" subtTitle="Enter Promotion Details">
      <FormContainer onSubmit={formik.handleSubmit}>
        <FormGroup>
          <StyledInput
            type="text"
            id="name"
            label="Promotion Name"
            name="name"
            placeholder="Promotion Name"
            onChange={formik.handleChange}
            value={formik.values?.name}
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
            value={formik.values?.description}
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
            value={formik.values?.status}
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
              value: formik.values?.start_date,
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
              value: formik.values?.end_date,
              name: 'end_date',
              onBlur: () => formik.setFieldTouched('end_date', true, false),
              error: Boolean(formik.touched.end_date && formik.errors.end_date),
              errorMessage: formik.errors.end_date,
            }}
            label="Set Promotion Period"
            onChange={() => {}}
          />
        </FormGroup>
        <FormGroup marginBottom="20px">
          <ImageEditor
            name="image_url"
            aspectRatio={8 / 3}
            label="Card Image (Recommended Size: 320p x 120p)"
            onImageChange={handleCropCardImageComplete}
            image={formik.values.image_url}
          />
        </FormGroup>
        <FormGroup>
          <ToggleButton
            label="Show Banner"
            name="show_banner"
            isOn={formik.values.show_banner}
            onToggle={() =>
              formik.setFieldValue('show_banner', !formik.values.show_banner)
            }
          />
        </FormGroup>
        {formik.values.show_banner && (
          <FormGroup marginBottom="20px">
            <ImageEditor
              name="banner_url"
              aspectRatio={16 / 9}
              label="Banner Image (Min. Recommended Size: 1080p x 720p)"
              onImageChange={handleCropBannerImageComplete}
              image={formik.values.banner_url}
            />
          </FormGroup>
        )}
        {/* <FormGroup>
          <StyledInput
            type="text"
            id="image_url"
            label="Promotion Image (Recommended Size: 320p x 120p)"
            name="image_url"
            placeholder="Promotion Image"
            onChange={formik.handleChange}
            value={formik.values?.image_url}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.image_url && formik.errors.image_url)}
            errorMessage={formik.errors.image_url}
            enableHoverImage={false}
          />
        </FormGroup>
        <FormGroup>
          <ToggleButton
            label="Show Banner"
            name="show_banner"
            isOn={formik.values.show_banner}
            onToggle={() =>
              formik.setFieldValue('show_banner', !formik.values.show_banner)
            }
          />
        </FormGroup>
        {formik.values.show_banner && (
          <FormGroup>
            <StyledInput
              type="text"
              id="banner_url"
              label="Banner Image (Min. Recommended Size: 1080p x 720p)"
              name="banner_url"
              placeholder="Banner Image"
              onChange={formik.handleChange}
              value={formik.values.banner_url}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.banner_url && formik.errors.banner_url,
              )}
              errorMessage={formik.errors.banner_url}
              enableHoverImage={false}
            />
          </FormGroup>
        )} */}
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
              disabled={
                hasEmptyValue(formik.values) ||
                !isEmpty(formik.errors) ||
                (isEmpty(formik.values.image_url) && !promotionCardImage) ||
                (formik.values.show_banner &&
                  !promotionBannerImage &&
                  isEmpty(formik.values.banner_url))
              }
            >
              Next
            </AppButton>
          </FormGroup>
        </FormGroup>
      </FormContainer>
    </FormWrapper>
  );
}
