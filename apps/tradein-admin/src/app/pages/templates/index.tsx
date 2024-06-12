/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useMemo, useState } from 'react';
import mjml from 'mjml-browser';

import {
  EmailEditor,
  EmailEditorProvider,
  IEmailTemplate,
  Stack,
} from 'easy-email-editor';
import 'easy-email-editor/lib/style.css';

import {
  AdvancedType,
  BasicType,
  BlockManager,
  JsonToMjml,
} from 'easy-email-core';
import {
  ExtensionProps,
  SimpleLayout,
  StandardLayout,
} from 'easy-email-extensions';
import { FormApi } from 'final-form';
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import '@arco-themes/react-easy-email-theme/css/arco.css';
import { useWindowSize } from 'react-use';
import { toast } from 'react-toastify';

const fontList = [
  'Arial',
  'Tahoma',
  'Verdana',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Lato',
  'Montserrat',
].map((item) => ({ value: item, label: item }));

const categories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: '0px 0px 0px 0px' } },
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
    ],
  },
  {
    label: 'Layout',
    active: true,
    displayType: 'column',
    blocks: [
      {
        title: '2 columns',
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%'],
        ],
      },
      {
        title: '3 columns',
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%'],
        ],
      },
      {
        title: '4 columns',
        payload: [[['25%', '25%', '25%', '25%']]],
      },
    ],
  },
];

const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content: BlockManager.getBlockByType(BasicType.PAGE)!.create({}),
};

export const TemplateEditorPage = () => {
  const [template, setTemplate] = useState<IEmailTemplate['content']>();

  const { width } = useWindowSize();

  const smallScene = width < 1400;

  // const onImportMjml = async () => {
  //   try {
  //     const [filename, data] = await importTemplate();
  //     setDownloadName(filename);
  //     setTemplate(data);
  //   } catch (error) {
  //     message.error('Invalid mjml file');
  //   }
  // };

  // const onExportMjml = (values: IEmailTemplate) => {
  //   exportTemplate(
  //     downloadFileName,
  //     JsonToMjml({
  //       data: values.content,
  //       mode: 'production',
  //       context: values.content,
  //     }),
  //   );
  // };

  const onSubmit = useCallback(
    async (
      values: IEmailTemplate,
      form: FormApi<IEmailTemplate, Partial<IEmailTemplate>>,
    ) => {
      console.log('values', values);

      // form.restart(newValues); replace new values form backend
      toast.success('Saved success!');
    },
    [],
  );

  return (
    <div>
      <EmailEditorProvider
        dashed={false}
        data={initialValues}
        height={'calc(100vh - 85px)'}
        // onUploadImage={services.common.uploadByQiniu}

        autoComplete
        fontList={fontList}
        onSubmit={onSubmit}
      >
        {({ values }, { submit }) => {
          return (
            <>
              {/* <PageHeader
                title="Edit"
                extra={
                  <Stack alignment="center">
                    <Button onClick={() => onCopyHtml(values)}>
                      Copy Html
                    </Button>
                    <Button onClick={() => onExportMjml(values)}>
                      Export Template
                    </Button>
                    <Button onClick={onImportMjml}>import Template</Button>
                    <Button type="primary" onClick={() => submit()}>
                      Save
                    </Button>
                  </Stack>
                }
              /> */}

              <StandardLayout
                compact={!smallScene}
                categories={categories}
                showSourceCode={true}
              >
                <EmailEditor />
              </StandardLayout>
            </>
          );
        }}
      </EmailEditorProvider>
    </div>
  );
}
