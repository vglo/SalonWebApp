import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { HttpParamMapperServiceService } from './services/http-param-mapper-service/http-param-mapper-service.service';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



export class HammerJsConfig extends HammerGestureConfig {
  overrides = <any>{'pinch': {enable: false}, 'rotate': {enable: false}};
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MaterialImportsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule,
    NgxPermissionsModule,
    FontAwesomeModule
  ],
  providers:[{provide: HAMMER_GESTURE_CONFIG, useClass: HammerJsConfig},HttpParamMapperServiceService]
})
export class SharedModule { }
