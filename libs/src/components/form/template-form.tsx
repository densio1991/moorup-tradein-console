/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalize, get } from 'lodash';
import { useState } from 'react';
import { AppButton, GenericModal, StyledInput, StyledInputCustomize } from '../';
import { formatToReadable } from '../../helpers';

export const TemplateForm = (
  {formik, template }: {formik: any, template: any}
) => {
  const [customizeFieldData, setCustomizeFieldData] = useState<any>({});
  const [customizeFieldValue, setCustomizeFieldValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCustomize = (fieldId: string, field: any, section: any) => {
    setCustomizeFieldData({
      fieldId,
      label: field.label ?? capitalize(`${formatToReadable(section.field)} ${field.order}`),
      ...field,
    });
    setCustomizeFieldValue(field.value);
    setIsModalOpen(true);
  }

  const resetConfirmModal = () => {
    setCustomizeFieldData({});
    setCustomizeFieldValue('');
    setIsModalOpen(false);
  }

  const handleConfirm = () => {
    formik.setFieldValue(customizeFieldData.fieldId, customizeFieldValue);
    resetConfirmModal();
  }

  const renderModalContentAndActions = () => {
    const fieldId = customizeFieldData.fieldId;
    
    return (
      <div className='flex flex-col gap-4'>
        <StyledInput
          type="text"
          id={fieldId}
          name={fieldId}
          label={capitalize(customizeFieldData.label)}
          value={customizeFieldValue}
          onChange={(event) => setCustomizeFieldValue(event.target.value)}
        />
        <div className="flex gap-2">
          <AppButton type="button" variant="outlined" onClick={resetConfirmModal}>Cancel</AppButton>
          <AppButton type="button" onClick={handleConfirm}>Save</AppButton>
        </div>
      </div>
    )
  }

  return (
    <>
      {template.map((section: any, idx: number) => {
        const fields: any = [];

        section?.content?.forEach((field: any, idx: number) => {
          const fieldId =
            field.label
              ? `${section.field}.${field.label}`
              : `${section.field}[${idx}]`;
          const fieldLabel = formatToReadable(field.label)

          if (field.confirmation) {
            fields.push(
              <StyledInputCustomize
                key={idx}
                type="text"
                id={fieldId}
                label={fieldLabel}
                name={fieldId}
                placeholder={fieldLabel}
                onChange={formik.handleChange}
                value={get(formik.values, fieldId, '')}
                onBlur={formik.handleBlur}
                error={Boolean(
                  get(formik.touched, fieldId) && get(formik.errors, fieldId),
                )}
                errorMessage={get(formik.errors, fieldId)}
                onCustomize={() => handleCustomize(fieldId, field, section)}
                info={field.staticValues}
              />,
            );
          } else {
            fields.push(
              <StyledInput
                key={idx}
                type="text"
                id={fieldId}
                label={fieldLabel}
                name={fieldId}
                disabled={!section.editable}
                placeholder={fieldLabel}
                onChange={formik.handleChange}
                value={get(formik.values, fieldId, '')}
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
          <div key={idx}>
            <h4 className="pb-4 capitalize">{formatToReadable(section.field)}</h4>
            {fields}
          </div>
        );
      })}
      <GenericModal
        title="Confirmation"
        subtitle={'Customize the following?'}
        content={renderModalContentAndActions()}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
};

