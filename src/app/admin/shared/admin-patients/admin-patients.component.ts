import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetsalertsServicesService } from 'src/app/sweetsalerts-services.service';
 
@Component({
  selector: 'app-admin-patients',
  templateUrl: './admin-patients.component.html',
  styleUrls: ['./admin-patients.component.css']
})
export class AdminPatientsComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private service :AllService,
    private route:Router,
    private swet :SweetsalertsServicesService
  ) {}

  userId:any
  ngOnInit(): void {
    // const userIdString = localStorage.getItem('id');
    // this.userId = localStorage.getItem('id');
    // Number(this.userId)
    

  const userIdString = localStorage.getItem('id');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    console.log("type",typeof this.userId)

    console.log( 'admin id', this.userId);
    this.myForm = this.fb.group({
      name: [''],
      middlename: [''],
      lastname: [''],
      dateofBirth: [''],
      gender: [''],
      ethnicity: [''],
      addressOne: [''],
      addressTwo: [''],
      city: [''],
      state: [''],
      zip: [''],
      instruction: [''],
      MRNnumber: [''],
      email: [''],
      homePhone: [''],
      mobilePhone: [''],
      otherPhone: [''],
      contactName: [''],
      phoneOne: [''],
      phoneTwo: [''],
      emergencyEmail: [''],
      language: [''],
      image: [''],
      comments: [''],
      password: [''],
      Covid19Status:[''],
      doctorId:[this.userId]
    });
  }

  url: any;
  fileType!: string;
  imgs:any;
  qimgs:any
  imagesBox = '../../../../../../assets/img/product/product1.jpg'

  Onupload(event: any) {
    if (event.target.files.length > 0) {
      this.imgs = event.target.files[0];
    }
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.imagesBox = event.target.result;
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }


  onSubmit() {
    console.log("After Doctor data", this.myForm.value);
    if (this.myForm.invalid) {
      return;
    } else {
      try {
        console.log("Doctor data", this.myForm.value);
        
        const formData: any = new FormData();
        formData.append('image', this.imgs);
        
        const arr = [
         'name',
      'middlename',
      'lastname',
      'dateofBirth',
      'gender',
      'ethnicity',
      'addressOne',
      'addressTwo',
      'city',
      'state',
      'zip',
      'instruction',
      'MRNnumber',
      'email',
      'homePhone',
      'mobilePhone',
      'otherPhone',
      'contactName',
      'phoneOne',
      'phoneTwo',
      'emergencyEmail',
      'language',
      'comments',
      'password',
      'doctorId',
      'Covid19Status'
  
        ];
  
        for (const key of arr) {
          formData.append(key, this.myForm.get(key)?.value);
        }
  
        console.log("post api fire", this.myForm);
        console.log("formdata api fire", formData.getAll('image'));
        console.log("formdata api fire", formData.getAll('doctorId'));
  
        // Call the postDoctors method without headers
        this.service.addpatientsForSuperAdmin(formData).subscribe((res: any) => {
          console.log(res);
          const patientName = res.data.name;  // Get the doctor's name from the response
          this.swet.SucessToast(`Patient ${patientName} created successfully`);
          this.route.navigate(['Admin/view_patients']);
        },
        (err) => {
          console.log(err);
        });
        
      } catch (err) {
        console.log(err);
      }
    }
  }




}
