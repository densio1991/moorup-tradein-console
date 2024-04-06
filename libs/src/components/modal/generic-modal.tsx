import styled from 'styled-components';

interface ModalProps {
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1003;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  color: #01463A;
  font-size: 20px;
`;

const ModalSubTitle = styled.h6`
  margin-top: 4px;
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: normal;
`;

const ModalFooter = styled.div`
  display: flex;
  margin-top: 20px;
`;

export function GenericModal({ title, subtitle, content, footer, isOpen, onClose }: ModalProps): JSX.Element {
  return (
    <div>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <ModalTitle>{title}</ModalTitle>
            <ModalSubTitle>{subtitle}</ModalSubTitle>
            {content}
            {
              footer && (
                <ModalFooter>
                  {footer}
                </ModalFooter>
              )
            }
          </ModalContent>
        </ModalWrapper>
      )}
    </div>
  );
}
