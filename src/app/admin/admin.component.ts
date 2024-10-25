import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from '../Api/all.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  patientsCount:any;
  filteredleads:any
  constructor(
    private route :Router,
    private ser:AllService
  ){
    this.superadminname=localStorage.getItem('superadmin_name')
  }

  superadminname:any;

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
    }
  }

  toggleSidebar2() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
    }
  }



  logouts() {
    localStorage.removeItem('Superadmin_token')
    localStorage.removeItem('id')
    localStorage.removeItem('superadmin_name')
    this.route.navigateByUrl("/", { replaceUrl: true })
  }




  newPatientsCount: number = 0; 
latestPatientId: any = null;  // Variable to store the ID or timestamp of the latest patient
latestPatients: any[] = [];  
  isNotificationDropdownVisible: boolean = false; 

ngOnInit() {
  this.getPatients();
//   setInterval(() => {
//     this.getPatients();
//   }, 5000);
}

getPatients() {
  this.ser.getleadss().subscribe((res: any) => {
    if (res && res.data && res.data.length > 0) {
      const latestLead = res.data.reverse(); 
      const datadss = latestLead[0]
      console.log('leads datas',datadss)
      console.log('Latest lead ID:', datadss.id);
      if (this.latestPatientId && datadss.id !== this.latestPatientId) {
        this.newPatientsCount += 1; 
        console.log('New patients count updated:', this.newPatientsCount);
        this.latestPatients.unshift(datadss); 

      }
      this.latestPatientId = datadss.id; 
    } else {
      console.error('Data is undefined or empty');
    }
  });
}

toggleNotificationDropdown() {
  this.isNotificationDropdownVisible = !this.isNotificationDropdownVisible;

  // If the dropdown is opened, clear the new patient count
  if (this.isNotificationDropdownVisible) {
    this.newPatientsCount = 0;
  }
}


closeNotificationDropdown() {
  this.isNotificationDropdownVisible = false; // Hide the dropdown
  // Optionally, you can also reset the count or handle other logic here
}

}


  
  



