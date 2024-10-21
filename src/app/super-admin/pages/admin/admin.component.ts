import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  updateForm!: FormGroup;

  constructor(private api: AllService, private fb: FormBuilder,
    private swet: SweetsalertsServicesService

  ) {

    this.updateForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      mobileNumber: [''],
      fullAddress: [''],
      image: [''],
      license: [''],

    })

  }

  doctorsCount: any[] = [];
  paginatedDoctors: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  dataSend: any

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.api.doctorsForSuperAdmin().subscribe((res: any) => {
      this.doctorsCount = res.data;
      // console.log("response",res.data[0].name)
      // this.swet.SucessToast(res.message);
      this.totalPages = Math.ceil(this.doctorsCount.length / this.itemsPerPage);
      this.setPage(1); // Initialize with the first page
    });
  }

  // deleteDoctors(id: any) {
  //   this.api.deletedoctorsForSuperAdmin(id).subscribe((res: any) => {
  //     this.doctorsCount = res.data;
  //     window.location.reload()
  //     this.swet.SucessToast(`You won't be able to revert this!"`);
  //     this.totalPages = Math.ceil(this.doctorsCount.length / this.itemsPerPage);
  //     this.setPage(1); // Initialize with the first page
  //   });
  // }

  deleteDoctors(id: any) {
    this.api.deletedoctorsForSuperAdmin(id).subscribe((res: any) => {
      if (res.success) {
        this.doctorsCount = res.data;
        this.swet.SucessToast(`${res.message}'Deleted successfully!`);
        this.totalPages = Math.ceil(this.doctorsCount.length / this.itemsPerPage);
        this.setPage(1);
  
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
  

  id: any;
  adminByIdData: any = [];
  adminById(data: any) {
    this.id = data;
    this.api.adminsById(data).subscribe((res: any) => {
      this.adminByIdData = res.data;
    })
  }

  downloadImage(imageUrl: string) {
    // Fetch the image as a Blob
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'license-image.jpg'; // Set the file name here
        document.body.appendChild(a);
        a.click();

        // Clean up: remove the anchor element and revoke the Blob URL
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Download failed', error));
  }


  adminDelete(itemDlt: any): void {
    this.api.deletedoctorsForSuperAdmin(itemDlt.id).subscribe(
      () => {
       
        window.location.reload()
        this.swet.delete(`You won't be able to revert this!"`);
      },
      (error) => {
        console.error('Error deleting dispatched', error);
      }
    );
  }




  updateNurse() {
    this.api.adminupdate(this.id, this.adminByIdData).subscribe((res: any) => {
      console.log('Nurse updated successfully', res);
    
      this.swet.SucessToast(`${res.data.name}'Admin Update Successfully!`);

      window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);
      // Handle error
    });
  }



  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDoctors = this.doctorsCount.slice(startIndex, endIndex);
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

  toggleVerified(data: any) {
    var id = data.id;
    this.dataSend = {
      account: !data.account // Toggle between true and false
    };
    this.api.ststusdoctorsForSuperAdmin(id, this.dataSend).subscribe(res => {
      if (res) {
        this.getDoctors(); 
      
        this.swet.SucessToast(`Agency approved successfully`);
        const accountStatus = res.data.account;  
        const doctorName = res.data.name;
        if (accountStatus) {
          this.swet.SucessToast(`${doctorName}'s agency approved successfully`);
        } else {
          this.swet.SucessToast(`${doctorName}'s agency disapproved successfully`);
        }
      }
    });
  }

}
