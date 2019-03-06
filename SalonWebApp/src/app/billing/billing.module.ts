import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { BillFormComponent } from './bill-form/bill-form.component';
import { CustomerModule } from '../customer/customer.module';
import { BillSummaryComponent } from './bill-summary/bill-summary.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { BillSearchComponent } from './bill-search/bill-search.component';
import { BillSearchFormComponent } from './bill-search-form/bill-search-form.component';
import { ViewBillDialogComponent } from './view-bill-dialog/view-bill-dialog.component';

@NgModule({
  declarations: [CreateBillComponent, BillFormComponent, BillSummaryComponent, ViewBillComponent, BillSearchComponent, BillSearchFormComponent, ViewBillDialogComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    SharedModule,
    MaterialImportsModule,
    CustomerModule
  ],
  exports: [ViewBillComponent, BillSearchFormComponent],
  entryComponents:[ViewBillDialogComponent]
})
export class BillingModule { }
