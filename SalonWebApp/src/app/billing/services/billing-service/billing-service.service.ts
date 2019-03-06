import { Constants } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { HttpParamMapperServiceService } from './../../../shared/services/http-param-mapper-service/http-param-mapper-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BillingModule } from './../../billing.module';
import { Injectable } from '@angular/core';
import { HttpResponseTemplate } from 'src/app/shared/http-response.model';
import { map } from 'rxjs/operators';
import { PaymentTypeResponse } from '../../interfaces/response/payment-type-response.model';
import { SalonServiesResponse } from '../../interfaces/response/salon-servies-response.model';
import { BillResponse } from '../../interfaces/response/bill-response.model';
import { shopIdState } from 'src/app/reducers/shop-info.reducer';
import { BillEmailRequest } from '../../interfaces/requests/bill-email-request.model';

@Injectable({
  providedIn: 'root'
})
export class BillingServiceService {

  constructor(private httpClient: HttpClient, private httpMapperService: HttpParamMapperServiceService) { }


  /**
   * Save New bill.
   *
   * @param {*} billForm
   * @returns {Observable<BillResponse>}
   * @memberof BillingServiceService
   */
  saveBill(billForm): Observable<BillResponse> {
    let httpParams = new HttpParams();
    httpParams = this.httpMapperService.mapToHttpParam(billForm);
    return this.httpClient.post<HttpResponseTemplate<BillResponse>>(Constants.SAVE_BILL_API, httpParams).pipe(map(res => res.response));
  }

  getAllBills(shopId: number): Observable<BillResponse[]> {
    const httpParams = new HttpParams({ fromObject: { shopId: shopId.toString() } });
    return this.httpClient.get<HttpResponseTemplate<BillResponse[]>>(Constants.GET_ALL_BILLS_BY_SHOP_ID, { params: httpParams }).pipe(map(res => res.response));
  }

  getAllBillsByDateRange(startDate: string, endDate: string, shopId: number): Observable<BillResponse[]> {
    const httpParams = new HttpParams({
      fromObject: {
        startDate: startDate,
        endDate: endDate,
        shopId: shopId.toString()
      }
    });
    return this.httpClient.get<HttpResponseTemplate<BillResponse[]>>(Constants.GET_ALL_BILLS_BY_DATE_RANGE, { params: httpParams }).
      pipe(map(res => res.response));
  }

  getBillById(billId: number, shopId: number): Observable<BillResponse> {
    const httpParams = new HttpParams({
      fromObject: {
        billId: billId.toString(),
        shopId: shopId.toString()
      }
    });
    return this.httpClient.get<HttpResponseTemplate<BillResponse>>(Constants.GET_BILL_BY_ID, { params: httpParams })
      .pipe(map(res => res.response));
  }




  /**
   * Fetch the payment types.
   *
   * @memberof BillingServiceService
   */
  getPaymentTypes(shopId: number): Observable<PaymentTypeResponse[]> {
    const httpParams = new HttpParams({ fromObject: { shopId: shopId.toString() } });
    return this.httpClient.get<HttpResponseTemplate<PaymentTypeResponse[]>>(Constants.PAYMENT_TYPE_FETCH_API, { params: httpParams }).pipe(map(res => res.response));
  }

  getSalonServices(shopId: number): Observable<SalonServiesResponse[]> {
    const httpParams = new HttpParams({ fromObject: { shopId: shopId.toString() } });
    return this.httpClient.get<HttpResponseTemplate<SalonServiesResponse[]>>(Constants.SALON_SERVICES_FETCH_API, { params: httpParams })
      .pipe(map(res => { return res.response; }));
  }

  /**
   * Send email service.
   *
   * @param {BillEmailRequest} billForm
   * @returns {Observable<string>}
   * @memberof BillingServiceService
   */
  sendBillEmail(billForm: BillEmailRequest): Observable<string> {
    let httpParams = new HttpParams();
    httpParams = this.httpMapperService.mapToHttpParam(billForm);
    return this.httpClient.post<HttpResponseTemplate<string>>(Constants.COMMUNICATION_SEND_EMAIL_API, httpParams).pipe(map(res => {
      if(res === null){
        return 'Email Sent';
      }
      return res.response
    }));
  }


}
