import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { BillSummaryComponent } from './bill-summary/bill-summary.component';
import { BillSearchComponent } from './bill-search/bill-search.component';
import { ViewBillComponent } from './view-bill/view-bill.component';

const routes: Routes = [
{
  path:'create-bill',
  component: CreateBillComponent
},
{
  path:'bill-summary',
  component: BillSummaryComponent
},
{
  path:'bill-summary/:id',
  component: BillSummaryComponent
},
{
  path: 'search-bill',
  component: BillSearchComponent
},
{
  path: 'view-bill/:id',
  component: ViewBillComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
