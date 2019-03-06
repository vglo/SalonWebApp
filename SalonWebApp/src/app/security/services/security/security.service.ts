import { map } from 'rxjs/operators';
import { Constants } from 'src/app/shared/constants';
import { HttpResponseTemplate } from 'src/app/shared/http-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleResponse } from '../../interfaces/response/role-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }


  getAllRoles(): Observable<RoleResponse[]>{
    return this.httpClient.get<HttpResponseTemplate<RoleResponse[]>>(Constants.SECURITY_API_BASE).pipe(map(res => res.response));
  }
}
