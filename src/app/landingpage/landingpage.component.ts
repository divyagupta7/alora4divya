import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../Api/all.service';
import { Router } from '@angular/router';
import { SweetsalertsServicesService } from '../sweetsalerts-services.service';

interface PlanDetail {
  planName: string;
  facility: string[];
  activePlan: number;
  deactivePlan: number;
  beforeExpiry: number;
  afterExpiry: number;
}

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  leadform!: FormGroup;
  showClientCards = false;
  planDetails: PlanDetail[] = [ ];
  
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
      personalCare: [false],
      companionCare: [false],
      respiteCare: [false]
    });

    this.getPlans();
  }

  onServiceTypeChange() {
    this.showClientCards = this.leadform.get('servicetype')?.value === 'Client';
  }

  getPlans(){
    this.service.getPlans().subscribe((res:any)=>{
      this.planDetails = res.data;
      console.log(res)
    })
  }

  onSubmit(): void {
    if (this.leadform.valid) {
      console.log(this.leadform.value);
      this.service.addlead(this.leadform.value).subscribe((res:any)=>{
        this.swet.SucessToast(`Generate Lead Successfully`);
        console.log('form added',res)
       });
    }
  }
}
