/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownOrderItemStatus,
  FormGroup,
  OrderItems,
  StyledInput,
  StyledReactSelect,
} from '@tradein-admin/libs';

import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

const ModalBody = styled.div`
  padding: 16px;
  height: 100%;
`;

const ModalTitle = styled.h2`
  font-style: bold;
  margin-bottom: 16px;
`;

const ModalButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  padding: 4px 8px;
  font-weight: bold;
  border: 1px solid #01463a;
  border-radius: 4px;
  background: #f5f5f4;
  width: 49%;
`;

const ModalSubmitButton = styled.button`
  padding: 4px 8px;
  font-weight: bold;
  border-radius: 4px;
  color: #fff;
  background: #01463a;
  width: 49%;
`;

const DEFAULT_VALUES = {
  _id: '',
  status: '',
  revised_offer: 0,
  reason: '',
};

interface FormValues {
  _id: string;
  status: string;
  revised_offer: number;
  reason: string;
}

type FormProps = {
  setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateStatus: (newValue: any, orderItem: OrderItems) => void;
  orderItem: OrderItems;
};

export const EditForm = ({
  setStatusModal,
  updateStatus,
  orderItem,
}: FormProps) => {
  const statusDropdown = Object.values(DropdownOrderItemStatus).map((item) => {
    return {
      label: item.replace('-', ' ').toLocaleUpperCase(),
      value: item,
    };
  });

  const onSubmit = () => {
    const { status, revised_offer, reason } = formik.values;
    const errors: any = {};

    if (status === DropdownOrderItemStatus.FOR_REVISION) {
      if (!revised_offer || revised_offer <= 0) {
        errors['revised_offer'] = 'Required field';
      }
      if (isEmpty(reason)) {
        errors['reason'] = 'Required field';
      }
      formik.setErrors(errors);
    }
    if (isEmpty(errors)) {
      updateStatus(formik.values, orderItem);
      setStatusModal(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      ...DEFAULT_VALUES,
      _id: orderItem?._id,
      status: orderItem?.status,
    },
    onSubmit,
  });

  return (
    <ModalBody>
      <ModalTitle>Update Order Item</ModalTitle>
      <FormGroup>
        <StyledReactSelect
          label="Status"
          isMulti={false}
          options={statusDropdown}
          name="status"
          placeholder="Select status"
          value={formik.values.status}
          onChange={(selected) => {
            formik.setFieldValue('status', selected.value, true);
          }}
        />
      </FormGroup>
      {formik.values.status === DropdownOrderItemStatus.FOR_REVISION && (
        <>
          <FormGroup>
            <StyledInput
              type="number"
              id="revised_offer"
              label="Revision"
              name="revised_offer"
              placeholder="Revision Offer"
              onChange={formik.handleChange}
              value={formik.values.revised_offer}
              error={!!formik.errors.revised_offer}
              errorMessage={formik.errors.revised_offer}
            />
          </FormGroup>
          <FormGroup>
            <StyledInput
              type="text"
              id="reason"
              label="Reasons"
              name="reason"
              placeholder="Comma-separated reasons"
              onChange={formik.handleChange}
              value={formik.values.reason}
              error={!!formik.errors.reason}
              errorMessage={formik.errors.reason}
            />
          </FormGroup>
        </>
      )}
      <ModalButtonDiv>
        <ModalButton onClick={() => setStatusModal(false)}>Cancel</ModalButton>
        <ModalSubmitButton onClick={() => onSubmit()}>Submit</ModalSubmitButton>
      </ModalButtonDiv>
    </ModalBody>
  );
};
