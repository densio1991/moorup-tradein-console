import { get } from 'lodash';
import { AppButton, GenericModal, StyledInput, StyledInputCustomize } from '../components';
import { useState } from 'react';

export const TemplateForm = ({formik, template }) => {
  const [customizeFieldData, setCustomizeFieldData] = useState<any>({});
  const [customizeFieldValue, setCustomizeFieldValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCustomize = (fieldId: string, field: any) => {
    setCustomizeFieldData({
      fieldId,
      ...field,
    });
    setCustomizeFieldValue(field.value);
    setIsModalOpen(true);
  }

  const handleConfirm = () => {
    formik.setFieldValue(customizeFieldData.fieldId, customizeFieldValue);
    setCustomizeFieldData({});
    setCustomizeFieldValue("");
    setIsModalOpen(false);
  }

  const renderModalContentAndActions = () => {
    const fieldId = customizeFieldData.fieldId;
    
    return (
      <div className='flex flex-col gap-2'>
        <StyledInput
          type="text"
          id={fieldId}
          name={fieldId}
          label={customizeFieldData.label}
          value={customizeFieldValue}
          onChange={(event) => setCustomizeFieldValue(event.target.value)}
          // error={Boolean(
          //   get(formik.touched, fieldId) && get(formik.errors, fieldId),
          // )}
          // errorMessage={get(formik.errors, fieldId)}
        />
        <AppButton type="button" onClick={handleConfirm}>Save</AppButton>
      </div>
    )
  }

  return (
    <>
      {template.map((section: any) => {
        const fields: any = [];

        section?.content?.forEach((field: any, idx: number) => {
          const fieldId =
            section.type === 'bullet'
              ? `${section.field}.[${idx}]`
              : `${section.field}.${field.label}`;

          if (field.confirmation) {
            fields.push(
              <StyledInputCustomize
                key={idx}
                type="text"
                id={fieldId}
                label={field.label}
                name={fieldId}
                placeholder={field.label}
                onChange={formik.handleChange}
                value={get(formik.values, fieldId)}
                onBlur={formik.handleBlur}
                error={Boolean(
                  get(formik.touched, fieldId) && get(formik.errors, fieldId),
                )}
                errorMessage={get(formik.errors, fieldId)}
                onCustomize={() => handleCustomize(fieldId, field)}
              />,
            );
          } else {
            fields.push(
              <StyledInput
                key={idx}
                type="text"
                id={fieldId}
                label={field.label}
                name={fieldId}
                disabled={!section.editable}
                placeholder={field.label}
                onChange={formik.handleChange}
                value={get(formik.values, fieldId)}
                onBlur={formik.handleBlur}
                error={Boolean(
                  get(formik.touched, fieldId) && get(formik.errors, fieldId),
                )}
                errorMessage={get(formik.errors, fieldId)}
              />,
            );
          }
        });

        return (
          <div>
            <h3 className="pb-4">{section.field}</h3>
            {fields}
          </div>
        );
      })}
      <GenericModal
        title="Confirmation"
        subtitle={"Customize the following?"}
        content={renderModalContentAndActions()}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
};
