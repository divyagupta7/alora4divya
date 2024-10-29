import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent {
  constructor(
    private route :Router
  ){
    this.caregivername=localStorage.getItem('caregiver_name')
  }
  caregivername:any;




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
    localStorage.removeItem('caregiver_token')
    localStorage.removeItem('caregiver_name')
    localStorage.removeItem('id')
    localStorage.removeItem('caregiverid')
    this.route.navigateByUrl("/", { replaceUrl: true })
  }
}
