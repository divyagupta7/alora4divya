import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caregiver',
  templateUrl: './caregiver.component.html',
  styleUrls: ['./caregiver.component.css']
})
export class CaregiverComponent {

  constructor( private route :Router ){

  }

  caregiver(){
    this.route.navigate(["/Admin/Addcaregiver"]);
  }


  uploadDocument(id:any){
    console.log(id);
    window.open(id)
    }
}
