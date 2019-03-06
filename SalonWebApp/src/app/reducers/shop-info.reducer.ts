import { tassign } from 'tassign';
import * as ShopInfoActions from "../actions/shop-info.action";
import { createSelector } from '@ngrx/store';

export interface ShopInfoState {
    shopId: number;
    shopName?: string;
}


export const initialShopInfoState: ShopInfoState = {
    shopId: 1,
    shopName: 'Habib Salon'
}

export function shopInfoReducer(state: ShopInfoState = initialShopInfoState, action: ShopInfoActions.allActions): ShopInfoState {
    switch (action.type) {
        case ShopInfoActions.ADD_SHOP_INFO_ACTION:
            return tassign(state, action.payload);
        case ShopInfoActions.REMOVE_SHOP_INFO_ACTION:
            return tassign(state,initialShopInfoState);
    }
    return state;
}

export const shopIdState = (state: ShopInfoState) => state.shopId;
export const shopInfoState = (state: ShopInfoState) => state;
