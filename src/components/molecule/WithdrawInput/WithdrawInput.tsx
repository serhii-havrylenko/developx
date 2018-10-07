import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import styled from 'styled-components';

import Button from '#atom/Button';

const WithdrawInputWrapper = styled.div`
  display: flex;

  & > * {
    align-self: normal;
  }

  & > *:not(:first-child) {
    margin-left: 10px;
  }
`;

export interface WithdrawInputProps {
  amountRef: React.RefObject<HTMLInputElement>;
  onWithdrawClick: () => void;
}

const WithdrawInput: React.SFC<WithdrawInputProps> = ({
  onWithdrawClick,
  amountRef,
}) => (
  <WithdrawInputWrapper>
    <TextField label="Amount" type="number" inputRef={amountRef} />
    <Button onClick={onWithdrawClick}>Withdraw</Button>
  </WithdrawInputWrapper>
);

export default WithdrawInput;
