import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LeadsListComponent} from './leads/leads-list/leads-list.component';
import {LeadsComponent} from './leads/leads.component';


const routes: Routes = [
  {path: 'leads-list', component: LeadsListComponent},
  {path: 'leads-new', component: LeadsComponent},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
