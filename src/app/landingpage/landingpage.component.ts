import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../Api/all.service';
import { Router } from '@angular/router';
import { SweetsalertsServicesService } from '../sweetsalerts-services.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  leadform!: FormGroup;

  constructor(private fb: FormBuilder,
    private service:AllService,
    private route:Router,
    private swet:SweetsalertsServicesService
  ) {}

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
        this.swet.SucessToast(`Login successfully`);
        console.log('form added',res)
        this.route.navigate(["/Admin/view_nurses"]);
       });
    }
  }



}
