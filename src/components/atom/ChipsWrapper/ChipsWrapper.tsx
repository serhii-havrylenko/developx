import styled from 'styled-components';

const ChipsWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;

  & > *:not(:first-child) {
    margin: 10px;
  }
`;

export default ChipsWrapper;
