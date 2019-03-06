import { map } from 'rxjs/operators';
import { Constants } from 'src/app/shared/constants';
import { HttpParamMapperServiceService } from './../../../shared/services/http-param-mapper-service/http-param-mapper-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerRegistrationRequest } from '../../interfaces/requests/customer-registration-request.model';
import { Observable, from } from 'rxjs';
import { CustomerInfoResponse } from '../../interfaces/response/customer-registration-response.model';
import { HttpResponseTemplate } from 'src/app/shared/http-response.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient, private httpParamMapper: HttpParamMapperServiceService) { }

  saveCustomer(registrationForm: CustomerRegistrationRequest): Observable<CustomerInfoResponse> {
    const httpParams = this.httpParamMapper.mapToHttpParam(registrationForm);
    return this.httpClient.post<HttpResponseTemplate<CustomerInfoResponse>>(Constants.CUSTOMER_REGISTRATION_API, httpParams)
      .pipe(map(res => res.response));
  }

  getAllCustomers(shopId: number): Observable<CustomerInfoResponse[]> {
    const httpParams = new HttpParams({ fromObject: { shopId: shopId.toString() } });
    return this.httpClient.get<HttpResponseTemplate<CustomerInfoResponse[]>>(Constants.ALL_CUSTOMERS_SHOP_ID_API, { params: httpParams })
      .pipe(map(res => res.response));
  }
}
