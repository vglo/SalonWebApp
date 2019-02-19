import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

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
    ReactiveFormsModule
  ],
  providers:[{provide: HAMMER_GESTURE_CONFIG, useClass: HammerJsConfig}]
})
export class SharedModule { }
