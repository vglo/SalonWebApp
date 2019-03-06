import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpParamMapperServiceService {

  createParamMap(object) {
    const params = this.internalMapper(object);
    return new HttpParams({fromObject: params});
  }

  mapToHttpParam(object): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(object).forEach(key => {
      let value = object[key];
      if (object[key] instanceof Object) {
        value = this.internalMapper(value);
        httpParams = httpParams.append(key, value);
      } else {
        httpParams = httpParams.append(key, value);
      }
    });
    return httpParams;
  }

  private internalMapper(object: Object) {
    const temp = {};
    Object.keys(object).forEach(key => {
      let value = object[key];
      if (object[key] instanceof Object) {
        value = this.internalMapper(value);
      }
      temp[key] = value;
    });
    return temp;
  }
}

