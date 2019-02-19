import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialImportsModule } from '../material-imports/material-imports.module';
import { MediaMatcher } from '@angular/cdk/layout';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [HomeComponent, SideNavComponent, DashboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialImportsModule
  ],
  exports: [HomeComponent],
  providers:[MediaMatcher]
})
export class HomeModule { }
