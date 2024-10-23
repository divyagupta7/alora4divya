import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private api: AllService
  ) { }

  patientsCounts:any=[];
  patientsCount:any=[];
  activeClientsCount:any

  ngOnInit(): void {
    this.getgetleadss();
    this.getPatients();
    throw new Error('Method not implemented.');
  }

  getgetleadss() {
    this.api.getleadss().subscribe((res: any) => {
      this.patientsCounts = res.data.length;
      console.log( "fg",this.patientsCounts)
    })
  }

  getPatients() {
    this.api.getleadss().subscribe((res: any) => {
      this.patientsCount = res.data.filter((item: any) => item.leadStatus);
      this.activeClientsCount = this.patientsCount.length;
      console.log('Filtered patient count', this.patientsCount);
    });
  }
}
