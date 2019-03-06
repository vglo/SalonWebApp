import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotAvailableComponent } from './not-available/not-available.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [{
      path: '',
      component: DashboardComponent
    },
    { path:'bill', loadChildren:'../billing/billing.module#BillingModule' },
    {path:'customer', loadChildren:'../customer/customer.module#CustomerModule'},
    {path:'admin', loadChildren:'../admin/admin.module#AdminModule'},
    {path: '**', component: NotAvailableComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

