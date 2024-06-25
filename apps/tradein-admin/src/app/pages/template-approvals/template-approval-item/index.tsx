/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppButton,
  DefaultStatus,
  Grid,
  GridItem,
  HTMLRenderer,
  LoaderContainer,
  PageSubHeader,
  Typography,
  capitalizeFirstLetters,
  defaultTheme,
  useAuth,
  useCommon,
  useTemplate,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function TemplateApprovalByIdPage() {
  const { id: templateApprovalId = '' } = useParams();
  const navigate = useNavigate();
  const {
    state,
    getTemplateApprovalById,
    clearTemplateApproval,
    processTemplateApproval,
  } = useTemplate();
  const {
    templateApproval,
    isFetchingTemplateApprovalById,
    isProcessingTemplateApproval,
  } = state;
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const { state: commonState, setRedirect } = useCommon();
  const { redirectTo } = commonState;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getTemplateApprovalById(templateApprovalId, signal);
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearTemplateApproval({});
    };
  }, [activePlatform]);

  useEffect(() => {
    if (!isEmpty(redirectTo)) navigate(redirectTo);

    return () => {
      setRedirect(null);
    };
  }, [redirectTo]);

  const renderContent = (content: string) => {
    return <HTMLRenderer htmlContent={content} />;
  };

  return (
    <>
      <PageSubHeader
        leftControls={
          <Typography
            variant="body1"
            color={defaultTheme.primary.text}
            fontWeight={600}
          >
            {capitalizeFirstLetters(templateApproval?.current?.template_name)}
          </Typography>
        }
        rightControls={
          <>
            <AppButton
              type="button"
              variant="fill"
              width="100px"
              onClick={() =>
                processTemplateApproval(
                  { type: DefaultStatus.REJECTED },
                  templateApprovalId,
                )
              }
            >
              Approve
            </AppButton>
            <AppButton
              type="button"
              variant="outlined"
              width="100px"
              onClick={() =>
                processTemplateApproval(
                  { type: DefaultStatus.REJECTED },
                  templateApprovalId,
                )
              }
            >
              Reject
            </AppButton>
          </>
        }
      />
      <LoaderContainer
        margin="20px"
        padding="20px"
        loading={isFetchingTemplateApprovalById || isProcessingTemplateApproval}
      >
        <Grid columns="2" gap="20px">
          <GridItem>
            <Typography
              marginBottom="10px"
              variant="body1"
              color={defaultTheme.primary.text}
              fontWeight={600}
            >
              Current
            </Typography>
            {renderContent(templateApproval?.current?.output || '')}
          </GridItem>
          <GridItem>
            <Typography
              marginBottom="10px"
              variant="body1"
              color={defaultTheme.primary.text}
              fontWeight={600}
            >
              Incoming
            </Typography>
            {renderContent(templateApproval?.incoming?.output || '')}
          </GridItem>
        </Grid>
      </LoaderContainer>
    </>
  );
}
