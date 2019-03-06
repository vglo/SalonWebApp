import { MaterialImportsModule } from './../material-imports/material-imports.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { CustomerRegistrationFormComponent } from './customer-registration-form/customer-registration-form.component';
import { SearchCustomerFormComponent } from './search-customer-form/search-customer-form.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';

@NgModule({
  declarations: [CustomerRegistrationComponent, CustomerRegistrationFormComponent, SearchCustomerFormComponent, SearchCustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    MaterialImportsModule
  ],
  exports: [CustomerRegistrationFormComponent, SearchCustomerFormComponent]
})
export class CustomerModule { }
