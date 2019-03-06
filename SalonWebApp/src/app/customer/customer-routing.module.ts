import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCustomerComponent } from './search-customer/search-customer.component';

const routes: Routes = [
  { path: 'register-customer', component: CustomerRegistrationComponent },
  {path: 'search-customer', component: SearchCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
