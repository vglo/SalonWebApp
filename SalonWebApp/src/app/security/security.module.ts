import { MaterialImportsModule } from './../material-imports/material-imports.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RoleSelectComponent } from './role-select/role-select.component';

@NgModule({
  declarations: [RoleSelectComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    SharedModule,
    MaterialImportsModule
  ],
  exports: [RoleSelectComponent]
})
export class SecurityModule { }
