/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { useCommon } from '../../store';
import { StyledInput } from '../input';

const StyledContainer = styled.div`
  height: 54px;
  width: calc(100% - 20px);
  padding: 4px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  overflow-x: auto;
  gap: 8px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  column-gap: 8px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

interface PageSubHeaderProps {
  leftControls?: any;
  rightControls?: any;
  withSearch?: boolean;
}

export function PageSubHeader({ leftControls, rightControls, withSearch }: PageSubHeaderProps) {
  const { state: commonState, setSearchTerm } = useCommon();
  const { searchTerm } = commonState;

  return (
    <div className="card">
      <StyledContainer>
        <LeftSection>
          {leftControls}
        </LeftSection>
        <RightSection>
          {rightControls}
          {withSearch && <StyledInput
            type="text"
            id="search"
            name="search"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          }
        </RightSection>
      </StyledContainer>
    </div>
  );
};
