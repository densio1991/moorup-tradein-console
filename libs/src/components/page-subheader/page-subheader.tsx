/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { useCommon } from '../../store';
import { StyledInput } from '../input';

const StyledContainer = styled.div<{ 
  overflowx?: string; 
  overflowy?: string; 
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}>`
  height: 54px;
  width: calc(100% - 40px);
  padding: 4px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  gap: 8px;
  z-index: 888;
  ${(props) => props.overflowx && `overflow-x: ${props.overflowx};`}
  ${(props) => props.overflowy && `overflow-y: ${props.overflowy};`}
  ${(props) => props.margin && `margin: ${props.margin};`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft};`}
  ${(props) => props.marginRight && `margin-right: ${props.marginRight};`}
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
  column-gap: 8px;
`;

interface PageSubHeaderProps {
  leftControls?: any;
  rightControls?: any;
  withSearch?: boolean;
  overflowx?: string;
  overflowy?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  specificString?: string;
}

export function PageSubHeader({ 
  leftControls, 
  rightControls, 
  withSearch, 
  overflowx, 
  overflowy,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  specificString,
}: PageSubHeaderProps) {
  const { state: commonState, setSearchTerm } = useCommon();
  const { searchTerm } = commonState;

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData('text');

    let modifiedText = clipboardData;

    if (specificString) {
      console.log('SHIPCODE: ', specificString);
      // Find the position of the specific string
      const index = clipboardData.indexOf(specificString);

      if (index !== -1) {
        // Keep the part of the text from the specific string onward
        modifiedText = clipboardData.slice(index);
      }
    }

    setSearchTerm(modifiedText);
  };

  return (
    <div className="card">
      <StyledContainer 
        overflowx={overflowx} 
        overflowy={overflowy}
        margin={margin}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
      >
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
            onPaste={handlePaste}
            value={searchTerm}
          />
          }
        </RightSection>
      </StyledContainer>
    </div>
  );
};
