

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';

@Component({
  selector: 'app-clientprofile',
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.css']
})
export class ClientprofileComponent implements OnInit {
  leadform!: FormGroup;
  userId: any;

  constructor(
    private fb: FormBuilder,
    private service: AllService,
    private route: ActivatedRoute,
    private swet: SweetsalertsServicesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id']; // Access the ID parameter
      console.log('Client ID:', this.userId);
      this.getClientProfile(this.userId); // Call a method to get the profile data
    });

    this.leadform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      servicetype: [''],
      note: [''],
      medicaidId: [''],
      contactNumber: [''],
      address: [''],
      attachDoc: [''],
      docExpiryDate: [''],
      clientNote: [''],
      dayaBeforeExpiration: [''],
      permanentPriorityNotes: [''],
      Administrator: [''],
      leadCreatedDate: [''],
      gender: [''],
      City: [''],
      State: [''],
      zipCode: [''],
      leadStatus: ['']
    });
  }


  onSubmit(): void {
    if (this.leadform.valid) {
      this.service.addlead(this.leadform.value).subscribe((res: any) => {
        this.swet.SucessToast(`Generate Lead Successfully`);
        console.log('Form added', res);
      });
    }
  }

  getClientProfile(id: string): void {
    this.service.leadupdate(id).subscribe((res: any) => {
      this.leadform.patchValue(res.data); // Assuming the response has the client data
      console.log('Client Profile:', res.data);
    });
  }

  leadeupdateapi(): void {
    this.service.putleadupdate(this.userId, this.leadform.value).subscribe((res: any) => {
      this.swet.SucessToast(`Profile Updated Successfully`);
      console.log('Updated Client Profile:', res.data);
    });
  }
}

