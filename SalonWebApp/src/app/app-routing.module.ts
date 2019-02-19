import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotfoundComponent} from './notfound/notfound.component'


const routes: Routes = [
  {
    path:'',
    children:[
      {path:'', loadChildren:'./home/home.module#HomeModule'}
    ]
  },
  {
    path:'**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

