import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  updateForm!:FormGroup; 

  constructor(
    private api:AllService,
    private route:Router,
    private fb:FormBuilder,
    private swet :SweetsalertsServicesService
  ) { }
  addclient() {
    this.route.navigate(['/Admin/Addclient'])
  }

  
  datasss:any= []

  patientsCount: any[] = [];
  paginatedDoctors: any[] = [];
  patientsCounts: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  userId:any
  dataSend: any


  ngOnInit(): void {
    const userIdString = localStorage.getItem('id');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    console.log( 'admin id', this.userId);
    this.getPatients();
  }


  updatePatient() {
    this.api.updatePatientById(this.id, this.patientByIdData).subscribe((res: any) => {
      console.log('Patient updated successfully', res);
      this.swet.SucessToast(`Patient ${res.data.name} Update Successfully !`);
      window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);
      // Handle error
    });
  }


  getPatients() {
    this.api.getleadss().subscribe((res: any) => {
      this.patientsCount = res.data.filter((item: any) => item.leadStatus);
            this.totalPages = Math.ceil(this.patientsCount.length / this.itemsPerPage);
            this.setPage(1);
      console.log('Filtered patient count', this.patientsCount);
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDoctors = this.patientsCount.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  id:any;
  patientByIdData:any=[];
  patientById(data: any) {
  this.id = data;
  this.api.patientById(data).subscribe((res: any) => {
    this.patientByIdData = res.data[0];
  })
}
toggleVerified(data: any) {
  var id = data.id;
  this.dataSend = {
    leadStatus: !data.leadStatus // Toggle between true and false
  };

  this.api.leadsttsusupdated(id, this.dataSend).subscribe(res => {
    if (res) {
      this.getPatients();
      const accountStatus = res.data.leadStatus;
      const doctorName = res.data.name;
      if (accountStatus) {
        this.swet.SucessToast(`${doctorName} Lead approved successfully`);
      } else {
        this.swet.SucessToast(`${doctorName} Lead disapproved successfully`);
      }
    }
  });
}

}
