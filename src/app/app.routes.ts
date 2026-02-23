import { Routes } from '@angular/router';
import {  LoginComponent } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
   { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  }

];
