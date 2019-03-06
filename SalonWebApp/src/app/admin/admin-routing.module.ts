import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceManagementComponent } from './service-management/service-management.component';

const routes: Routes = [
  {
    path: 'service-management',
    component: ServiceManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
