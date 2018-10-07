import { GraphQLFieldResolver } from 'graphql';

import { calculateNotes } from './utils';

export const withdrawResolver: GraphQLFieldResolver<
  {},
  {},
  { amount: number }
> = (_, { amount }) => calculateNotes(amount);

export const resolvers: { [key: string]: any } = {
  Query: {
    withdraw: withdrawResolver,
  },
};
