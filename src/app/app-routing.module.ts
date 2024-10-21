import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AddleadComponent } from './addlead/addlead.component';

const routes: Routes = [


  {
    path:'',
    component:LandingpageComponent
      },
      {
        path:'landing',
        component:LandingpageComponent
          },
  {
    path:'mainLogin',
    component:LoginPageComponent
  },
  {
    path:'Addlead',
    component:AddleadComponent
  },
  
  { path: 'superAdmin', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule) },
  { path: 'Admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'nurse', loadChildren: () => import('./nurse/nurse.module').then(m => m.NurseModule) }, 
  { path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
