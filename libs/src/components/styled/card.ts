import styled from 'styled-components';

export const DetailCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px #eee;

  h4:first-of-type {
    margin: 8px 0;
    line-height: 1.2;
  }

  h4 {
    margin: 16px 0 8px 0;
    line-height: 1.2;
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
