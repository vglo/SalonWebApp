import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { BillFormComponent } from './bill-form/bill-form.component';

@NgModule({
  declarations: [CreateBillComponent, BillFormComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    SharedModule,
    MaterialImportsModule
  ]
})
export class BillingModule { }
