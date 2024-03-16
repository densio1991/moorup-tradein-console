import {
  FormGroup,
  OrderItemStatus,
  OrderItems,
  StyledInput,
  StyledReactSelect,
} from '@tradein-admin/libs';

import styled from 'styled-components';
import { useFormik } from 'formik';

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
  padding: 16px;
  font-weight: bold:
  border: 1px solid #01463A;
  border-radius: 4px;
  background: #f5f5f4;
  width: 49%;
`;

const ModalSubmitButton = styled.button`
  padding: 16px;
  font-weight: bold:
  border: 2px solid #000;
  border-radius: 4px;
  color: #fff;
  background: #01463A;
  width: 49%;
`;

const DEFAULT_VALUES = {
  status: '',
  revision: '',
  comma: '',
};

interface FormValues {
  status: string;
  revision: string;
  comma: string;
}

type FormProps = {
  setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateStatus: (newValue: OrderItems, status: string) => void;
  orderItems: OrderItems;
};

export const EditForm = ({
  setStatusModal,
  updateStatus,
  orderItems,
}: FormProps) => {
  const statusDropdown = Object.values(OrderItemStatus).map((item) => {
    return {
      label: item.replace('-', ' ').toLocaleUpperCase(),
      value: item,
    };
  });

  const onSubmit = () => {
    updateStatus(orderItems, formik.values.status);
    setStatusModal(false);
  };

  const formik = useFormik<FormValues>({
    initialValues: DEFAULT_VALUES,
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
      {formik.values.status === OrderItemStatus.FOR_REVISION && (
        <>
          <FormGroup>
            <StyledInput
              type="text"
              id="revision"
              label="Revision"
              name="name"
              placeholder="Revision Offer"
              onChange={formik.handleChange}
              value={formik.values.revision}
            />
          </FormGroup>
          <FormGroup>
            <StyledInput
              type="text"
              id="comma"
              label="Reasons"
              name="comma"
              placeholder="Comma-separated reasons"
              onChange={formik.handleChange}
              value={formik.values.comma}
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
