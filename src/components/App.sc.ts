import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    margin: 0;
  }
`;

export default (app: React.ComponentType): React.ComponentType => styled(app)`
  background-color: #eee;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
