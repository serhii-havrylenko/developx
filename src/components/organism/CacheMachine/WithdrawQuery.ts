import { Query } from 'react-apollo';

interface Data {
  withdraw: number[];
}

interface Variables {
  amount?: number;
}

export class WithdrawQuery extends Query<Data, Variables> {}
