import { map } from 'rxjs/operators';
import { HttpResponseTemplate } from 'src/app/shared/http-response.model';
import { HttpParamMapperServiceService } from './../../shared/services/http-param-mapper-service/http-param-mapper-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalonServiesResponse } from 'src/app/billing/interfaces/response/salon-servies-response.model';
import { Constants } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { SalonServiceRequest } from '../interfaces/requests/salon-service-request.model';

@Injectable({
  providedIn: 'root'
})
export class ShopAdminService {

  constructor(private httpClient: HttpClient, private httpParamMapper: HttpParamMapperServiceService) { }

  saveSalonService(formData: SalonServiceRequest): Observable<SalonServiesResponse> {
    let httpParams = new HttpParams();
    httpParams = this.httpParamMapper.mapToHttpParam(formData);
    return this.httpClient.post<HttpResponseTemplate<SalonServiesResponse>>(Constants.SALON_SERVICES_SAVE_SERVICE_API, httpParams).pipe(map(res => res.response));
  }

  updateSalonService(fromData: SalonServiceRequest): Observable<SalonServiesResponse>{
    let httpParams = new HttpParams();
    httpParams =  this.httpParamMapper.mapToHttpParam(fromData);
    return this.httpClient.put<HttpResponseTemplate<SalonServiesResponse>>(Constants.SALON_SERVICES_UPDATE_SERVICE_API, httpParams).pipe(map(res => res.response));
  }
}