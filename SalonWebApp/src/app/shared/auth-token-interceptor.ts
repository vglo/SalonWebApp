import { State } from './../reducers/index';
import { Constants } from './constants';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError, tap} from 'rxjs/operators';
import { SnackBarMessage } from './snackbar-message';

@Injectable({providedIn:'root'})
export class AuthTokenInterceptor implements HttpInterceptor {
  token: string;

  intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
    if (req.url.toString().includes(Constants.API_BASE_URL.toString())) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
        'Access-Control-Allow-Origin': '*'
      });
      req = req.clone({headers: headers});
    }
    return next.handle(req).pipe(tap(success => success, err => {
      return throwError(err);
    }));
  }

  constructor(
      private store: Store<State>, private http: HttpClient,
      private snackbar: SnackBarMessage) {}
}
