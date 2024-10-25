import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcaregiver',
  templateUrl: './addcaregiver.component.html',
  styleUrls: ['./addcaregiver.component.css']
})
export class AddcaregiverComponent  implements OnInit {
  caregiverForm!:FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.caregiverForm = this.fb.group({
      caregiverName: ['', Validators.required],
      certification: [''],
      certificationDoc: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      serviceType: [''],
      electronicSignature: [''],
      certificationExpiryDate: [],
      caregiverNote: [''],
      daysBeforeExpiration: [''],
      password: ['', Validators.required]
    });
  }
}
