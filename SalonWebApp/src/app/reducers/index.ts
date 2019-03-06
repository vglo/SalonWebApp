import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  combineReducers
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {localStorageSync} from 'ngrx-store-localstorage';


import * as fromShopInfo from './shop-info.reducer';
import * as fromRouter from '@ngrx/router-store';

const STATE_KEYS = ['shopInfo'];

export const initialState: State = {
  shopInfo: fromShopInfo.initialShopInfoState
}

export interface State {
  shopInfo: fromShopInfo.ShopInfoState;
  router?: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  shopInfo: fromShopInfo.shopInfoReducer,
  router: fromRouter.routerReducer
};

export function rehydrateStore(reducer: ActionReducer<State>):
    ActionReducer<State> {
  return localStorageSync({keys: STATE_KEYS, rehydrate: true})(reducer);
}

const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function metaReducer(reducer: ActionReducer<State>):
    ActionReducer<State> {
  return function(state: any, action: any): State {
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] =  [rehydrateStore,metaReducer];


export const shopInfoState = (state: State) => state.shopInfo;

export const getShopId = createSelector(shopInfoState,fromShopInfo.shopIdState);