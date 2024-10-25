import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { PatientHomeComponent } from './pages/patient-home/patient-home.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { PatientNurseAlotedComponent } from './pages/patient-nurse-aloted/patient-nurse-aloted.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { CarePlanComponent } from './pages/care-plan/care-plan.component';

const routes: Routes = [
  { path: '', component: PatientComponent,
    children:[
      {
        path:'',
        redirectTo:'',
        pathMatch:'full'
      },
      {
        path:'patient_home',
        component:PatientHomeComponent
      },
      {
        path:'patient_dashboard',
        component:PatientDashboardComponent
      },
      {
        path:'patient_nurse_aloted',
        component:PatientNurseAlotedComponent
      },
      {
        path:'patient_profile',
        component:MyProfileComponent  
      },
      {
        path:'patient_documents',
        component:DocumentsComponent
      },
      {
        path:'patient_care_plan',
        component:CarePlanComponent
      }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
