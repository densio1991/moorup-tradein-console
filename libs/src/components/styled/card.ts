import styled from 'styled-components';

export const DetailCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 4px;
  box-sizing: border-box;

  h4:first-child {
    margin: 8px 0;
  }

  h4 {
    margin: 16px 0 8px 0;
  }
`;

export const DataLine = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  box-sizing: content-box;
  gap: 16px;
  padding: 6px 0;
  border-top: 1px solid #eee;
  font-size: 14px;
  
  dl {
    width: fit-content;
    margin: 0;
    font-weight: 600;
  }
`
