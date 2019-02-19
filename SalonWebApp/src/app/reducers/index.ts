import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {localStorageSync} from 'ngrx-store-localstorage';


const STATE_KEYS = [];

export const initialState: State = {

}

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};

export function rehydrateStore(reducer: ActionReducer<State>):
    ActionReducer<State> {
  return localStorageSync({keys: STATE_KEYS, rehydrate: true})(reducer);
}


export function metaReducer(reducer: ActionReducer<State>):
    ActionReducer<State> {
  return function(state: any, action: any): State {
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] =  [rehydrateStore,metaReducer];
