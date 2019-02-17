import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialImportsModule
  ],
  exports:[
    MaterialImportsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
