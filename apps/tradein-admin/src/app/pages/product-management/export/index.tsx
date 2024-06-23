/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppButton,
  FormGroup,
  FormWrapper,
  Loader,
  RadioGroup,
  RadioOption,
  exportToCSV,
  useAuth,
  useCommon,
  usePermission,
  useProduct,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useState } from 'react';

export function ExportFileForm() {
  const { state: commonState, setSideModalState } = useCommon();
  const { sideModalState } = commonState;

  const { state: authState } = useAuth();
  const { activePlatform } = authState;

  const {
    state: productState,
    downloadProductPricingRevisionTemplate,
    downloadProductUploadTemplate,
  } = useProduct();
  const {
    products,
    isDownloadingProductPricingRevisionTemplate,
    isDownloadingProductUploadTemplate,
  } = productState;

  const {
    hasExportProductsPermission,
    hasExportProductUploadTemplatePermission,
  } = usePermission();

  const [exportFileType, setExportFileType] = useState<string | null>(null);

  const options: RadioOption[] = [];

  if (hasExportProductsPermission && !isEmpty(products)) {
    options.push({ label: 'Products data', value: 'products' });
  }

  if (hasExportProductUploadTemplatePermission) {
    options.push(
      {
        label: 'Product upload template',
        value: 'product_upload_template',
      },
      {
        label: 'Product pricing upload template',
        value: 'product_pricing_upload_template',
      },
    );
  }

  const closeModal = () => {
    setExportFileType(null);
    setSideModalState({
      ...sideModalState,
      open: false,
      view: null,
    });
  };

  const handleChange = (value: string) => {
    setExportFileType(value);
  };

  const handleExport = () => {
    switch (exportFileType) {
      case 'products':
        // Download products data
        exportToCSV(products, activePlatform);
        break;

      case 'product_upload_template':
        // Download product upload template
        downloadProductUploadTemplate();
        break;

      case 'product_pricing_upload_template':
        // Download product pricing revision template
        downloadProductPricingRevisionTemplate();
        break;

      default:
        throw new Error('No selected file type');
    }

    closeModal();
  };

  return isDownloadingProductPricingRevisionTemplate ||
    isDownloadingProductUploadTemplate ? (
    <Loader />
  ) : (
    <FormWrapper
      formTitle="Export"
      subtTitle="Manage and export your data easily"
    >
      <FormGroup marginBottom="20px">
        <RadioGroup
          label="Select file to export"
          options={options}
          onChange={handleChange}
          defaultValue=""
        />
      </FormGroup>
      <FormGroup>
        <span />
        <FormGroup>
          <AppButton
            type="button"
            variant="outlined"
            width="fit-content"
            onClick={() => closeModal()}
          >
            Cancel
          </AppButton>
          <AppButton
            type="button"
            width="fit-content"
            onClick={() => {
              handleExport();
            }}
            disabled={isEmpty(exportFileType)}
          >
            Export
          </AppButton>
        </FormGroup>
      </FormGroup>
    </FormWrapper>
  );
}
