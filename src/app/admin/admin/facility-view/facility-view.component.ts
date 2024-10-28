import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-facility-view',
  templateUrl: './facility-view.component.html',
  styleUrls: ['./facility-view.component.css']
})
export class FacilityViewComponent implements OnInit {





  updateForm!:FormGroup;  
  constructor(
    private api:AllService,
    private route:Router,
    private fb:FormBuilder,
  private swet :SweetsalertsServicesService
  ){
  }
  
  patientsCount: any[] = [];
  paginatedDoctors: any[] = [];
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


  // updatePatient() {
  //   this.api.updatePatientById(this.id, this.patientByIdData).subscribe((res: any) => {
  //     console.log('Patient updated successfully', res);
  //     this.swet.SucessToast(`Patient ${res.data.name} Update Successfully !`);
  //     window.location.reload()
  //   }, (error) => {
  //     console.error('Error updating user', error);
  //   });
  // }

  filteredleads: any[] = [];
  searchTerm: string = '';


  getPatients(){
    this.api.getgetFacilitys().subscribe((res:any)=>{
      this.patientsCount = res.data.reverse();
      this.filteredleads = [...this.patientsCount];
      this.totalPages = Math.ceil(this.patientsCount.length / this.itemsPerPage);
      this.setPage(1); 
      console.log('patient count', this.patientsCount)
    })
  }

  filterClients() {
    this.filteredleads = this.patientsCount.filter(client =>
      client.servicetype.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(this.searchTerm.toLowerCase())||
      client.note.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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

  // id:any;
  // patientByIdData:any=[];
//   patientById(data: any) {
//   this.id = data;
//   this.api.patientById(data).subscribe((res: any) => {
//     this.patientByIdData = res.data[0];
//   })
// }
// toggleVerified(data: any) {
//   var id = data.id;
//   this.dataSend = {
//     leadStatus: !data.leadStatus // Toggle between true and false
//   };

//   this.api.leadsttsusupdated(id, this.dataSend).subscribe(res => {
//     if (res) {
//       this.getPatients();
//       const accountStatus = res.data.leadStatus;
//       const doctorName = res.data.name;
//       if (accountStatus) {
//         this.swet.SucessToast(`${doctorName} Lead Action Successfully`);
//       } else {
//         this.swet.SucessToast(`${doctorName} Lead Action Sccessfully`);
//       }
//     }
//   });
// }

}
