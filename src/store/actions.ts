import { action } from 'typesafe-actions';

import { WITHDRAW_AMOUNT } from './constants';

export const withdrawAmount = (amount: number) =>
  action(WITHDRAW_AMOUNT, { amount });
