import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  paginate: (pageNumber: number) => void;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const PaginationButton = styled.button`
  border: 1px solid rgba(1, 70, 58, 0.5);
  background-color: transparent;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 4px;
  color: #000;

  &:hover {
    background-color: #01463a;
    color: #ffffff;
  }

  &.active {
    background-color: #01463a;
    color: #ffffff;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #e1e4e8;
    color: #000;
    opacity: 20%;
  }
`;

const PaginationText = styled.p`
  font-weight: 500;
  font-size: 14px;
  margin: 0 10px;
`;

const Icon = styled.svg`
  width: 12px;
  height: 12px;
  fill: currentColor;
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalRows,
  paginate,
}) => {
  return (
    <PaginationWrapper>
      <LeftSection>
        <PaginationText>
          {
            totalRows > 0 && (
              <span>
                {`Showing ${((currentPage - 1) * 10) + 1} - ${Math.min(currentPage * 10, totalRows)} of ${totalRows} results`}
              </span>
            )
          }
        </PaginationText>
      </LeftSection>

      {
        totalPages > 1 && (
          <RightSection>
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => paginate(1)}
            >
              <Icon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd"></path>
              </Icon>
            </PaginationButton>
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              <Icon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd"></path>
              </Icon>
            </PaginationButton>
            <PaginationText>
              {currentPage} of {totalPages}
            </PaginationText>
            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              <Icon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd"></path>
              </Icon>
            </PaginationButton>
            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() => paginate(totalPages)}
            >
              <Icon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clipRule="evenodd"></path>
              </Icon>
            </PaginationButton>
          </RightSection>
        )
      }
    </PaginationWrapper>
  );
};

export default Pagination;
