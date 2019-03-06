import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, initialState } from './reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NotfoundComponent } from './notfound/notfound.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { DatePipe } from '@angular/common';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {NgxPermissionsModule} from 'ngx-permissions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee);


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers , initialState: initialState}),
    StoreRouterConnectingModule.forRoot(),
    NgxPermissionsModule.forRoot()
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},DatePipe,{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
