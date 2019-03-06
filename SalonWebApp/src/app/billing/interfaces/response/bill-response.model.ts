import { CustomerInfoResponse } from 'src/app/customer/interfaces/response/customer-registration-response.model';
import { SalonServiesResponse } from './salon-servies-response.model';
import { PaymentTypeResponse } from './payment-type-response.model';
export interface BillResponse {
    billNo: string;
    cgstPer: number;
    csgtVal: number;
    date: string;
    discountPer: number;
    discountVal: number;
    grandTotal: number;
    idBill: number;
    sgstPer: number;
    sgstVal: number;
    time: string,
    total: number;
    billhasservices: BillHasService[];
    paymenttype: PaymentTypeResponse;
    customerinfo: CustomerInfoResponse;
    staffinfo?;
    shopinfo?;
}


export interface BillHasService{
    idBillHasService:number;
    quantity:number;
    serviceId:number;
    salonservice: SalonServiesResponse;
}
