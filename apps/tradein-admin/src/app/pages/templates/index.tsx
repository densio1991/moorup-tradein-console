/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppButton,
  FormContainer,
  FormGroup,
  FormWrapper,
  LoaderContainer,
  PageContainer,
  VerticalPills,
  compareJSON,
  TemplateForm,
  useAuth,
  usePermission,
  extractInitialValue,
  useTemplate,
  parseTemplateValue,
  formatToReadable,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { capitalize, isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

const TEST_DATA = [
  {
    "_id": "66710d4f58f992d9b098bb8f",
    "template_name": "device-assessment",
    "platform": "office-works",
    "state": "active",
    "template": [
      {
        "field": "header_section",
        "type": "text",
        "editable": true,
        "content": [
          {
            "order": 1,
            "label": "Greetings",
            "value": "asdasdasdasdasdasdasd"
          },
          {
            "order": 2,
            "label": "Message",
            "value": "Your Trade-In Application Has been Successful"
          }
        ]
      },
      {
        "field": "body_section",
        "type": "paragraph",
        "editable": true,
        "content": [
          {
            "label": "Greetings",
            "value": "Dear {first_name}",
            "confirmation": true
          },
          {
            "label": "Body",
            "value": "Thanks for applying to trade-in your device. Good news, we're pleased to offer you a ${offer_value}.00 {platform} Card for your old device. You'll save money and help save the environment by reducing e-waste.",
            "confirmation": true
          },
          {
            "label": "Order",
            "value": "Your Order Number is : {order_id}",
            "confirmation": true
          }
        ]
      },
      {
        "field": "whats_next_section",
        "type": "bullet",
        "editable": true,
        "content": [
          {
            "order": 1,
            "value": "Gift Card expires {expiry}",
            "confirmation": true
          },
          {
            "order": 2,
            "value": "{platform} gift cards can be redeemed at {platform} stores nationwide and on the {platform} website.",
            "confirmation": true
          },
          {
            "order": 3,
            "value": "Use your {platform} Gift Card at the checkout. you can use the gift card multiple times until it runs out of credit.",
            "confirmation": true
          },
          {
            "order": 4,
            "value": "{platform} gift cards cannot be redeemed for cash, returned for a refund or exchanged. Unused balances are not refundable or transferrable",
            "confirmation": true
          },
          {
            "order": 5,
            "value": "{platform} is not responsible for lost or stolen gift cards",
            "confirmation": true
          },
          {
            "order": 6,
            "value": "Remaining Gift Card balances can be checked online or in stroe. For more information contact us on {contact} or visit {platformDomain} - Technology and Appliances Store in NZ",
            "confirmation": true
          }
        ]
      },
      {
        "field": "questions_section",
        "type": "paragraph",
        "editable": true,
        "content": [
          {
            "order": 1,
            "value": "We're here to help! Visit us online at {supportUrl}/help-centre for customer support. You can also email us at {supportEmail}",
            "confirmation": true
          },
          {
            "order": 2,
            "value": "asdasdasdasdasdasdasa"
          },
          {
            "order": 3,
            "value": "asdasdasdasdasdasdasdasdsad"
          },
          {
            "order": 4,
            "value": "asdasdasdasdasdasdasd"
          }
        ]
      }
    ],
    "__v": 0
  },
  {
    "_id": "66710d4f58f992d9b098bb8f",
    "template_name": "post-assessment",
    "platform": "office-works",
    "state": "active",
    "template": [
      {
        "field": "header_section",
        "type": "text",
        "editable": true,
        "content": [
          {
            "order": 1,
            "label": "Greetings",
            "value": "Hello"
          },
          {
            "order": 2,
            "label": "Message",
            "value": "Your Trade-In Application Has been Successful"
          }
        ]
      },
      {
        "field": "body_section",
        "type": "paragraph",
        "editable": true,
        "content": [
          {
            "label": "Greetings",
            "value": "Dear {first_name}",
            "confirmation": true
          },
          {
            "label": "Body",
            "value": "Thanks for applying to trade-in your device. Good news, we're pleased to offer you a ${offer_value}.00 {platform} Card for your old device. You'll save money and help save the environment by reducing e-waste.",
            "confirmation": true
          },
          {
            "label": "Order",
            "value": "Your Order Number is : {order_id}",
            "confirmation": true
          }
        ]
      },
      {
        "field": "whats_next_section",
        "type": "bullet",
        "editable": true,
        "content": [
          {
            "order": 1,
            "value": "Gift Card expires {expiry}",
            "confirmation": true
          },
          {
            "order": 2,
            "value": "{platform} gift cards can be redeemed at {platform} stores nationwide and on the {platform} website.",
            "confirmation": true
          },
          {
            "order": 3,
            "value": "Use your {platform} Gift Card at the checkout. you can use the gift card multiple times until it runs out of credit.",
            "confirmation": true
          },
          {
            "order": 4,
            "value": "{platform} gift cards cannot be redeemed for cash, returned for a refund or exchanged. Unused balances are not refundable or transferrable",
            "confirmation": true
          },
          {
            "order": 5,
            "value": "{platform} is not responsible for lost or stolen gift cards",
            "confirmation": true
          },
          {
            "order": 6,
            "value": "Remaining Gift Card balances can be checked online or in stroe. For more information contact us on {contact} or visit {platformDomain} - Technology and Appliances Store in NZ",
            "confirmation": true
          }
        ]
      },
      {
        "field": "questions_section",
        "type": "paragraph",
        "editable": true,
        "content": [
          {
            "order": 1,
            "value": "We're here to help! Visit us online at {supportUrl}/help-centre for customer support. You can also email us at {supportEmail}"
          },
          {
            "order": 2,
            "value": "asdasdasdasdasdasdasa"
          },
          {
            "order": 3,
            "value": "asdasdasdasdasdasdasdasdsad"
          }
        ]
      }
    ],
    "__v": 0
  }
]

export function TemplatesPage() {
  const { hasEditPlatformConfigsPermissions } = usePermission();
  const {
    state: authState,
  } = useAuth();
  const {
    state: templateState,
    getTemplates,
    clearTemplates,
    requestTemplateChange,
  } = useTemplate();
  const { activePlatform } = authState;
  const { templates = [], isFetchingTemplates } = templateState;
  const [activePill, setActivePill] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getTemplates(activePlatform, signal);
    }

    return () => {
      controller.abort();
      resetForm();

      // Clear data on unmount
      clearTemplates({});
    };
  }, [activePlatform]);

  const resetForm = () => {
    formik.resetForm();
  };

  const onSubmit = (values: any) => {
    const payload = {
      ...templates[activePill],
      template: parseTemplateValue(templates[activePill].template, values),
    }

    console.log(payload);
    // updatePlatformConfig(platformId, values);
    requestTemplateChange(templates[activePill]._id, payload);
  };

  const handleChangeTemplate = (index: any) => {
    setActivePill(index);
  }

  const initialValues = useMemo(() => {
    return extractInitialValue(templates[activePill]?.template)
  }, [activePill, templates]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  const labels = templates.map((template: any) => {
    return formatToReadable(template.template_name);
  });

  const contents = templates.map((template: any) => {
    return <TemplateForm formik={formik} template={template.template} />;
  });

  return (
    <LoaderContainer
      color="#01463a"
      margin="20px"
      padding="10px"
      height="auto"
      bgColor="transparent"
      loading={isFetchingTemplates}
      title="Email Templates"
    >
      <div style={{ marginTop: '20px' }}>
        <PageContainer>
          <FormWrapper padding="0px" width="100%">
            <FormContainer onSubmit={formik.handleSubmit}>
              <VerticalPills labels={labels} contents={contents} onChange={handleChangeTemplate} />
            </FormContainer>
          </FormWrapper>
        </PageContainer>
        {hasEditPlatformConfigsPermissions && (
          <div className='flex justify-end gap-4'>
            <AppButton
              type="button"
              variant="fill"
              width="fit-content"
              onClick={() => console.log("preview")}
              disabled={compareJSON(initialValues, formik.values)}
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
          </div>
        )}
      </div>
    </LoaderContainer>
  );
}
