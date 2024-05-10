/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppButton,
  FormContainer,
  FormGroup,
  FormWrapper,
  MODAL_TYPES,
  ROLES,
  StyledInput,
  StyledReactSelect,
  capitalizeFirstLetter,
  hasEmptyValue,
  useAuth,
  useCommon,
  usePermission,
  useUser,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  platforms: string[];
  [key: string]: any; // Index signature to allow dynamic access
}

const DEFAULT_VALUES = {
  email: '',
  role: '',
  first_name: '',
  last_name: '',
  platforms: [],
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  role: Yup.string().required('Role is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  platforms: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select at least one platform')
    .required('Platforms are required'),
});

export function EditUserForm({ data }: any) {
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;

  const { state: authState } = useAuth();
  const { userDetails } = authState;

  const { updateUser, setUpdateUserDetailsPayload } = useUser();

  const { hasEditUserPermissionsPermission } = usePermission();

  const resetForm = () => {
    formik.resetForm();
    formik.setFieldTouched('platforms', false);
  };

  const onSubmit = (values: any) => {
    if (hasEditUserPermissionsPermission) {
      setUpdateUserDetailsPayload(values);
      setSideModalState({
        ...sideModalState,
        view: MODAL_TYPES.EDIT_USER_PERMISSIONS,
        open: true,
      });
    } else {
      updateUser(data?._id, userDetails?._id, values);
      setSideModalState({ ...sideModalState, view: null, open: false });
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: DEFAULT_VALUES,
    validationSchema,
    onSubmit,
  });

  const platforms = userDetails?.platforms
    ?.map((item: any) => ({
      value: item,
      label: capitalizeFirstLetter(item),
    }))
    .sort((a: { label: string }, b: { label: any }) =>
      a.label.localeCompare(b.label),
    );

  const roles = ROLES?.sort((a: { label: string }, b: { label: any }) =>
    a.label.localeCompare(b.label),
  );

  useEffect(() => {
    const userData = {
      email: data?.email,
      role: data?.role,
      first_name: data?.first_name,
      last_name: data?.last_name,
      platforms: data?.platforms,
    };

    formik.setValues(userData);
  }, [data]);

  return (
    <FormWrapper formTitle="Edit User" subtTitle="Enter User Details">
      <FormContainer onSubmit={formik.handleSubmit}>
        <FormGroup>
          <StyledInput
            type="text"
            id="email"
            label="Email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.email && formik.errors.email)}
            errorMessage={formik.errors.email}
          />
        </FormGroup>
        <FormGroup>
          <StyledInput
            type="text"
            id="first_name"
            label="First Name"
            name="first_name"
            placeholder="First Name"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.first_name && formik.errors.first_name,
            )}
            errorMessage={formik.errors.first_name}
          />
          <StyledInput
            type="text"
            id="last_name"
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.last_name && formik.errors.last_name)}
            errorMessage={formik.errors.last_name}
          />
        </FormGroup>
        <FormGroup>
          <StyledReactSelect
            label="Role"
            name="role"
            options={roles}
            isMulti={false}
            placeholder="Select role"
            value={formik.values.role}
            onChange={(selectedOption) => {
              formik.setFieldValue('role', selectedOption.value, true);
            }}
            onBlur={() => formik.setFieldTouched('role')}
            error={Boolean(formik.touched.role && formik.errors.role)}
            errorMessage={formik.errors.role}
          />
        </FormGroup>
        <FormGroup>
          <StyledReactSelect
            label="Platforms"
            name="platforms"
            options={platforms}
            isMulti
            placeholder="Select platform"
            value={formik.values.platforms}
            onChange={(selectedOption) => {
              const platformValues = selectedOption.map(
                (option: any) => option.value,
              );
              formik.setFieldValue('platforms', platformValues, true);
            }}
            onBlur={() => formik.setFieldTouched('platforms')}
            error={Boolean(formik.touched.platforms && formik.errors.platforms)}
            errorMessage={formik.errors.platforms}
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
              disabled={hasEmptyValue(formik.values)}
            >
              {hasEditUserPermissionsPermission ? 'Next' : 'Save Changes'}
            </AppButton>
          </FormGroup>
        </FormGroup>
      </FormContainer>
    </FormWrapper>
  );
}
