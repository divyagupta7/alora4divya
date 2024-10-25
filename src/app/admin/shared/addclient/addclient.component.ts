import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {

  leadform!:FormGroup;





  constructor(private fb: FormBuilder,
    private service:AllService,
    private route:Router,
    private swet:SweetsalertsServicesService
  ) {
    
  }

  userId:any
  ngOnInit(): void {
    const userIdString = localStorage.getItem('id');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    
    console.log( 'admin id', this.userId);
       this.leadform = this.fb.group({
      name:['',Validators.required]  ,      
      email :['',Validators.required]   ,   
      servicetype :['',Validators.required],
      note  :['',Validators.required]  ,    
    });
  }

  onSubmit(): void {
    if (this.leadform.valid) {
      console.log(this.leadform.value);
      this.service.addlead(this.leadform.value).subscribe((res:any)=>{
        this.swet.SucessToast(`Generate Lead Successfully`);
        this.route.navigate(['/Admin/Leadlist'])
        console.log('form added',res)
       });
    }
  }


}
