import {Action} from '@ngrx/store';
import { ShopInfoState } from '../reducers/shop-info.reducer';


export const ADD_SHOP_INFO_ACTION='[ShopInfo] Add';
export const REMOVE_SHOP_INFO_ACTION='[ShopInfo] Remove';


export class AddShopInfoAction implements Action{
    type: string =ADD_SHOP_INFO_ACTION;
    constructor(public payload: ShopInfoState){}
}

export class RemoveShopInfoAction implements Action{
    type: string = REMOVE_SHOP_INFO_ACTION;
    constructor(public payload: ShopInfoState =null){}
}

export type allActions = AddShopInfoAction | RemoveShopInfoAction;


