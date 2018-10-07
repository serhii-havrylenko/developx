import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import WithdrawResults from '#molecule/WithdrawResults';
import { State } from '#store/reducers';
import { getWithdrawAmount } from '#store/selectors';
import { WithdrawQuery } from './WithdrawQuery';

const withdrawGqlQuery = gql`
  query withdrawQuery($amount: Int) {
    withdraw(amount: $amount)
  }
`;

export interface CacheMachineProps {
  amount?: number;
}

export const CacheMachine: React.SFC<CacheMachineProps> = ({ amount }) => (
  <WithdrawQuery query={withdrawGqlQuery} variables={{ amount }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <span>Processing...</span>;
      }
      if (error) {
        return (
          <Typography variant="headline">
            Error: ${error.graphQLErrors[0].message}
          </Typography>
        );
      }
      if (!amount || !data) {
        return (
          <Typography variant="headline">
            No data to show, feel free to withdraw some money
          </Typography>
        );
      }

      return <WithdrawResults results={data.withdraw} />;
    }}
  </WithdrawQuery>
);

const ConnectedCacheMachine = connect((state: State) => ({
  amount: getWithdrawAmount(state),
}))(CacheMachine);

const Wrapper = styled.div`
  margin: 20px;
`;

export default () => (
  <Wrapper>
    <ConnectedCacheMachine />
  </Wrapper>
);
