import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.css']
})
export class ViewPatientsComponent implements OnInit {
  updateForm!:FormGroup;  
  constructor(
    private api:AllService,
    private route:Router,
    private fb:FormBuilder,
  private swet :SweetsalertsServicesService
  ){
    this.updateForm = this.fb.group({
      name:[''],
      middlename:[''],
      lastname:[''],
      dateofBirth:[''],
      gender:[''],
      city:[''],
      email:[''],
    })
  }
  
  patientsCount: any[] = [];
  paginatedDoctors: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  userId:any


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


  getPatients(){
    this.api.patientsForAdmin().subscribe((res:any)=>{
      this.patientsCount = res.data;
      this.totalPages = Math.ceil(this.patientsCount.length / this.itemsPerPage);
      this.setPage(1); // Initialize with the first page
      console.log('patient count', this.patientsCount)
    })
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

// patientDelete(itemDlt: any): void {
//   this.api.deletepatient(itemDlt.id).subscribe(
//     () => {
//       window.location.reload()
//     },
//     (error) => {
//       console.error('Error deleting dispatched', error);
//     }
//   );
// }




patientDelete(itemDlt: any) {
  this.api.deletepatient(itemDlt.id).subscribe((res: any) => {
    if (res.success) {
      this.patientsCount = res.data;
      this.swet.SucessToast(`${res.data[0].name}'Deleted successfully!`);
      // Close the modal using plain JavaScript
      const modalElement = document.getElementById('deleteModal');
      if (modalElement) {
        const bootstrapModal = new (window as any).bootstrap.Modal(modalElement); // Use bootstrap from window object
        bootstrapModal.hide(); // Hide modal after success
      }

      window.location.reload(); // Reload the page to refresh the data
     
    } else {
      this.swet.SucessToast(`${res.message}`);
    }
  });
}


}
