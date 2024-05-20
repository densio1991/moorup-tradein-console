import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useProduct } from '../../store';
import { AppButton } from '../button';
import { Dropzone } from '../dropzone';

interface UploadInvoiceModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1111;
`;

const ModalContent = styled.div`
  z-index: 98;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px 50px;
  border-radius: 4px;
  width: 100%;
  max-width: 500px;
`;

const ModalTitle = styled.h5`
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const ModalBody = styled.div``;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const DropzoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  min-height: 116px;
  background: #fafafa;
`;

const DropzoneSelectedFile = styled.div`
  color: #101213;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
`;

const DropzoneSelectedSize = styled.div`
  color: #101213;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
`;

const DefaultMessage = styled.div`
  text-align: center;
  font-weight: 700;
  margin-bottom: 3px;
  padding: 10px;
`;

const UploadInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const UploadInfoText = styled.div`
  text-align: center;
  font-size: 14px;
  padding-top: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0;
`;

const ColumnContainer = styled.div`
  flex: 0 0 auto;
  width: 100%;
  max-width: 100%;
`;

export function UploadFileModal({ isOpen, closeModal }: UploadInvoiceModalProps) {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const { uploadProductsExcelFile } = useProduct();

  const processCSVFile = (file: File) => {
    const allowedFileTypes = ['.xls', 'xlsx'];
    const fileExtension = file.name.toLowerCase();
    const fileSizeValue = (file.size / 1024).toFixed(2);

    if (!allowedFileTypes.some(type => fileExtension.endsWith(type))) {
      return;
    }

    setFileToUpload(file)
    setSelectedFileName(file.name);
    setFileSize(fileSizeValue);
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedFileName(null);
      setFileSize(null);
    }
  }, [isOpen]);

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent>
        <ModalBody>
          <ModalTitle>
            Select file for import products
          </ModalTitle>
          <RowContainer>
            <ColumnContainer>
              <Dropzone
                content={(
                  <DropzoneContainer>
                    {selectedFileName ? (
                      <>
                        <DropzoneSelectedFile>{selectedFileName}</DropzoneSelectedFile>
                        <DropzoneSelectedSize>
                          {fileSize} KB
                        </DropzoneSelectedSize>
                      </>
                    ) : (
                      <DefaultMessage>
                        Choose an excel file or drag it here.
                      </DefaultMessage>
                    )}
                  </DropzoneContainer>
                )}
                processFile={processCSVFile}
              />
            </ColumnContainer>
          </RowContainer>
          <UploadInfoContainer>
            <UploadInfoText>
              The uploaded file must be (.xls or .xlsx)
            </UploadInfoText>
          </UploadInfoContainer>
          <ModalFooter>
            <AppButton
              type="button"
              variant='outlined'
              onClick={() =>closeModal()}
            >
              Cancel
            </AppButton>
            <AppButton
              type="button"
              variant='fill'
              onClick={() => {
                uploadProductsExcelFile(fileToUpload)
                closeModal()
              }}
            >
              Submit
            </AppButton>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}
