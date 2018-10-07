import { gql } from 'apollo-server-express';

export const scheme = gql`
  type Query {
    withdraw(amount: Int): [Int]!
  }
`;
