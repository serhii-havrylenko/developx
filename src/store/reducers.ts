/**
 * reducers.ts
 * prepare reducers to allow create store
 */
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

/**
 * prepared reducers
 * @type {Reducer<{}>}
 */
export default combineReducers({ router: routerReducer });
