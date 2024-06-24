/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppButton,
  CenterModal,
  DefaultStatus,
  FormContainer,
  FormGroup,
  FormWrapper,
  HTMLRenderer,
  LoaderContainer,
  PageContainer,
  TemplateForm,
  TemplateTypes,
  VerticalPills,
  capitalizeFirstLetters,
  compareJSON,
  extractInitialValue,
  parseTemplateValue,
  useAuth,
  usePermission,
  useTemplate,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { useEffect, useMemo } from 'react';

export function SmsTemplatesPage() {
  const { hasEditPlatformConfigsPermissions } = usePermission();
  const { state: authState } = useAuth();
  const {
    state: templateState,
    getTemplates,
    clearTemplates,
    requestTemplateChange,
    requestTemplatePreview,
    clearTemplatePreview,
    setActivePill,
  } = useTemplate();
  const { activePlatform, userDetails } = authState;
  const {
    templates = [],
    isFetchingTemplates,
    isRequestingTemplatePreview,
    templatePreview,
    isRequestingTemplateChange,
    activePill,
  } = templateState;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getTemplates(TemplateTypes.SMS, signal);
    }

    return () => {
      controller.abort();
      resetForm();

      // Clear data on unmount
      clearTemplates({});
      setActivePill(0);
    };
  }, [activePlatform]);

  const resetForm = () => {
    formik.resetForm();
  };

  const onSubmit = (values: any) => {
    const payload = {
      admin_id: userDetails?._id,
      status: DefaultStatus.PENDING,
      platform: activePlatform,
      current: templates[activePill]?._id,
      incoming: {
        platform: activePlatform,
        template_name: templates[activePill].template_name,
        template_gateway: templates[activePill].template_gateway,
        subject: templates[activePill].subject,
        template: parseTemplateValue(templates[activePill].template, values),
      },
    };

    requestTemplateChange(
      templates[activePill]._id,
      payload,
      TemplateTypes.SMS,
    );
  };

  const onPreview = (values: any) => {
    const payload = {
      ...templates[activePill],
      admin_id: userDetails?._id,
      current: templates[activePill]?._id,
      incoming: {
        template: parseTemplateValue(templates[activePill].template, values),
      },
    };

    requestTemplatePreview(payload);
  };

  const handleChangeTemplate = (index: any) => {
    setActivePill(index);
  };

  const initialValues = useMemo(() => {
    return extractInitialValue(templates[activePill]?.template);
  }, [activePill, templates]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  const labels = templates.map((template: any) => {
    return capitalizeFirstLetters(template.template_name);
  });

  const contents = templates.map((template: any) => {
    return <TemplateForm formik={formik} template={template.template} />;
  });

  return (
    <>
      <LoaderContainer
        color="#01463a"
        margin="20px"
        padding="10px"
        height="auto"
        bgColor="transparent"
        loading={
          isFetchingTemplates ||
          isRequestingTemplatePreview ||
          isRequestingTemplateChange
        }
        title="SMS Templates"
      >
        <div style={{ marginTop: '20px' }}>
          <PageContainer>
            <FormWrapper padding="0px" width="100%">
              <FormContainer onSubmit={formik.handleSubmit}>
                <VerticalPills
                  labels={labels}
                  contents={contents}
                  defaultActive={activePill}
                  onChange={handleChangeTemplate}
                />
              </FormContainer>
            </FormWrapper>
          </PageContainer>
          {hasEditPlatformConfigsPermissions && (
            <FormGroup>
              <span />
              <FormGroup>
                <AppButton
                  type="button"
                  variant="outlined"
                  width="fit-content"
                  onClick={() => onPreview(formik.values)}
                >
                  Preview
                </AppButton>
                <AppButton
                  type="button"
                  variant="fill"
                  width="fit-content"
                  onClick={() => onSubmit(formik.values)}
                  disabled={compareJSON(initialValues, formik.values)}
                >
                  Submit
                </AppButton>
              </FormGroup>
            </FormGroup>
          )}
        </div>
      </LoaderContainer>
      <CenterModal
        isOpen={!isEmpty(templatePreview)}
        onClose={() => {
          clearTemplatePreview(false);
        }}
      >
        <HTMLRenderer htmlContent={templatePreview?.htmlRender} />
      </CenterModal>
    </>
  );
}
