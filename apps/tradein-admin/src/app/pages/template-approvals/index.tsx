/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  DEFAULT_COLUMN,
  DefaultStatus,
  PageSubHeader,
  TEMPLATE_APPROVALS_COLUMNS,
  Table,
  templateApprovalsParsingConfig,
  useAuth,
  useCommon,
  usePermission,
  useTemplate,
} from '@tradein-admin/libs';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

export function TemplateApprovalPage() {
  const { state, getTemplateApprovals, clearTemplateApprovals } = useTemplate();
  const { templateApprovals, isFetchingTemplateApprovals } = state;
  const { state: authState } = useAuth();
  const { activePlatform } = authState;
  const { setSearchTerm } = useCommon();
  const { hasViewPlatformConfigsPermissions } = usePermission();

  const headers = [...DEFAULT_COLUMN, ...TEMPLATE_APPROVALS_COLUMNS];

  const addViewUrlToTemplateApprovals = (items: any) => {
    return items.map((item: any) => ({
      ...item,
      ...(hasViewPlatformConfigsPermissions && {
        viewURL: `/dashboard/templates/approvals/${item._id}`,
      }),
    }));
  };

  const templateApprovalsWithViewUrl = addViewUrlToTemplateApprovals(
    templateApprovals || [],
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!isEmpty(activePlatform)) {
      getTemplateApprovals(
        {
          platform: activePlatform,
          status: DefaultStatus.PENDING,
        },
        signal,
      );
    }

    return () => {
      controller.abort();

      // Clear data on unmount
      clearTemplateApprovals({});
      setSearchTerm('');
    };
  }, [activePlatform]);

  return (
    <>
      <PageSubHeader withSearch />
      <Table
        label="Approvals"
        isLoading={isFetchingTemplateApprovals}
        headers={headers}
        rows={templateApprovalsWithViewUrl || []}
        parsingConfig={templateApprovalsParsingConfig}
      />
    </>
  );
}
