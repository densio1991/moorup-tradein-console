/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppButton,
  FormContainer,
  FormGroup,
  FormWrapper,
  LoaderContainer,
  PageContainer,
  StyledInput,
  ToggleButton,
  VerticalPills,
  compareJSON,
  TemplateForm,
  useAuth,
  usePermission,
} from '@tradein-admin/libs';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

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
  }
]

export function TemplatesPage() {
  const { hasEditPlatformConfigsPermissions } = usePermission();
  const {
    state: authState,
    getPlatformConfig,
    clearPlatformConfig,
    updatePlatformConfig,
  } = useAuth();
  const { activePlatform, platformConfig, isFetchingPlatformConfig } =
    authState;

  const [enableUpfront, setEnableUpfront] = useState<boolean>(
    platformConfig?.enable_upfront,
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getPlatformConfig(activePlatform, signal);
    }

    return () => {
      controller.abort();
      resetForm();

      // Clear data on unmount
      clearPlatformConfig({});
    };
  }, [activePlatform]);

  const resetForm = () => {
    formik.resetForm();
  };

  const onSubmit = (values: any) => {
    const platformId = values._id;
    delete values._id;

    updatePlatformConfig(platformId, values);
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit,
  });

  useEffect(() => {
    if (!isEmpty(platformConfig)) {
      formik.setValues(platformConfig);
    }
  }, [platformConfig]);

  const labels = TEST_DATA.map((template) => {
    return template.template_name
  });

  // const labels = [
  //   'Business Operation Hours',
  //   'Contact Details',
  //   'Credit Type Configuration',
  // ];

  const contents = TEST_DATA.map((template) => {
    return <TemplateForm formik={formik} template={template.template} />;
  });

  return (
    <LoaderContainer
      color="#01463a"
      margin="20px"
      padding="10px"
      height="auto"
      bgColor="transparent"
      loading={isFetchingPlatformConfig}
      title="Configurations"
    >
      <div style={{ marginTop: '20px' }}>
        <PageContainer>
          <FormWrapper padding="0px" width="100%">
            <FormContainer onSubmit={formik.handleSubmit}>
              <VerticalPills labels={labels} contents={contents} />
            </FormContainer>
          </FormWrapper>
        </PageContainer>
        {hasEditPlatformConfigsPermissions && (
          <FormGroup>
            <AppButton
              type="button"
              variant="fill"
              width="fit-content"
              onClick={() => console.log("preview")}
              disabled={compareJSON(platformConfig, formik.values)}
            >
              Preview
            </AppButton>
            <AppButton
              type="button"
              variant="fill"
              width="fit-content"
              onClick={() => onSubmit(formik.values)}
              disabled={compareJSON(platformConfig, formik.values)}
            >
              Submit
            </AppButton>
          </FormGroup>
        )}
      </div>
    </LoaderContainer>
  );
}
