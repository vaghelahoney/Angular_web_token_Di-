import { Routes } from '@angular/router';
export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    loadComponent: () => import('./auth/login/login-componets/login-componets').then(c => c.LoginComponets) 
  },
  { 
    path: 'employee', 
    loadComponent: () => import('./componets/employee/employee/employee-list-componets').then(c => c.EmployeeListComponets) 
  },
  { 
    path: '**', 
    redirectTo: 'home' 
  }
];