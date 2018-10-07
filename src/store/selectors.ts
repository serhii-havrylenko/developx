import { State } from './reducers';

export const getWithdrawAmount = (state: State) => state.cacheMachine.amount;
