import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientHomeComponent } from './pages/patient-home/patient-home.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { PatientNurseAlotedComponent } from './pages/patient-nurse-aloted/patient-nurse-aloted.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { CarePlanComponent } from './pages/care-plan/care-plan.component';
import { DocumentsComponent } from './pages/documents/documents.component';


@NgModule({
  declarations: [
    PatientComponent,
    PatientHomeComponent,
    PatientDashboardComponent,
    PatientNurseAlotedComponent,
    MyProfileComponent,
    CarePlanComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PatientModule { }
