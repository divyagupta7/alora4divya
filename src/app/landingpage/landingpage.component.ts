import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../Api/all.service';
import { Router } from '@angular/router';
import { SweetsalertsServicesService } from '../sweetsalerts-services.service';

interface PlanDetail {
id: any;
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
  planDetails: PlanDetail[] = [  ];
  selectedCardId: number | null = null;

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
      note  :['',Validators.required],
    });

    this.getPlans();
  }

  onServiceTypeChange() {
    this.showClientCards = this.leadform.get('servicetype')?.value === 'Client';
  }

  getPlans(){
    this.service.getPlans().subscribe((res:any)=>{
      console.log(res)
      this.planDetails = res.data;
    })
  }

  selectCard(cardId: number) {
    this.selectedCardId = cardId;
  }

  onSubmit(): void {
    if (this.leadform.valid) {
      // Create form data with selected card
      const formData = {
        ...this.leadform.value,
        planId: this.selectedCardId
      };

      console.log(formData);
      this.service.addlead(formData).subscribe((res: any) => {
        this.swet.SucessToast(`Generate Lead Successfully`);
        console.log('form added', res);

        this.leadform.reset();
        this.selectedCardId = null;
        this.showClientCards = false;
      });
    }
  }
}
