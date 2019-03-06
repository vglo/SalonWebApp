export interface IBillRequest {
    customerId: number;
    serviceStaffId: number;
    shopId: number;
    billHasService?: IBillHasService[];
    cgstPer?: number;
    sgstPer?: number;
    descountPer?: number;
    discountVal?: number;
    type?: number;
}

export interface IBillHasService{
    serviceId: number;
    quant: number;
}

