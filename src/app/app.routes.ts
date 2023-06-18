import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes), // use this in production
  },  
  // {
  //   path: '',
  //   loadComponent: () => import('./login/login.page').then( m => m.LoginPage) // for testing only
  // },

];
