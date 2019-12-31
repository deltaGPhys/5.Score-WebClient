import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { GymListComponent } from './gym-list/gym-list.component'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'gyms', component: GymListComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
