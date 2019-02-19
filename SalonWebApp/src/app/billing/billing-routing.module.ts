import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBillComponent } from './create-bill/create-bill.component';

const routes: Routes = [
{
  path:'create-bill',
  component: CreateBillComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
