import { MaterialImportsModule } from './../material-imports/material-imports.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { SharedModule } from '../shared/shared.module';
import { ServiceRegistrationComponent } from './service-registration/service-registration.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { UpdateSalonServiceDialogComponent } from './update-salon-service-dialog/update-salon-service-dialog.component';

@NgModule({
  declarations: [ServiceManagementComponent, ServiceRegistrationComponent, ServiceListComponent, UpdateSalonServiceDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialImportsModule
  ],
  exports: [UpdateSalonServiceDialogComponent],
  entryComponents:[UpdateSalonServiceDialogComponent]
})
export class AdminModule { }
